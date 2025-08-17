import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "R";
  const delivery_fee = 100;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const updateSearchTerm = (term) => setSearchTerm(term);

  // ✅ Add to Cart
  const addToCart = async (itemId, note = "") => {
    if (!itemId) {
      toast.error("Add item to cart to continue");
      return;
    }

    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      if (!updatedCart[itemId]) {
        updatedCart[itemId] = { quantity: 1, note };
      } else {
        updatedCart[itemId].quantity += 1;
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, note },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Get Cart Count
  const getCartCount = () =>
    Object.values(cartItems).reduce((total, item) => total + (item.quantity || 0), 0);

  // ✅ Update Quantity
  const updateQuantity = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity > 0) {
      updatedCart[itemId] = {
        ...updatedCart[itemId],
        quantity,
      };
    } else {
      delete updatedCart[itemId];
    }
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity, note: updatedCart[itemId]?.note || "" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Get User Cart and normalize
  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const normalizedCart = {};
        for (const [itemId, value] of Object.entries(response.data.cartData)) {
          if (typeof value === "number") {
            normalizedCart[itemId] = { quantity: value, note: "" };
          } else {
            normalizedCart[itemId] = value;
          }
        }
        setCartItems(normalizedCart);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Get total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, item]) => {
      const product = products.find((p) => p._id === itemId);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  // ✅ Fetch all products
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Clear Cart
  const clearCart = async () => {
    setCartItems({});
    if (!token) return;
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      await axios.post(
        backendUrl + "/api/cart/clear",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart on backend.");
    }
  };

  // ✅ Load products on mount
  useEffect(() => {
    getProductData();
  }, []);

  // ✅ Load cart when token changes
  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  const value = {
    products,
    filteredProducts,
    delivery_fee,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
    setCartItems,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
