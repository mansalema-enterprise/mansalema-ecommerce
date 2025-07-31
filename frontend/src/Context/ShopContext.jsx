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

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // Add to Cart
  const addToCart = async (itemId) => {
    if (!itemId) {
      toast.error("Add item to cart to continue");
      return;
    }

    const updatedCart = { ...cartItems };

    if (!updatedCart[itemId]) {
      updatedCart[itemId] = 1;
    } else {
      updatedCart[itemId] += 1;
    }

    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get Cart Count
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };

    if (quantity > 0) {
      updatedCart[itemId] = quantity;
    } else {
      delete updatedCart[itemId];
    }

    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get cart for logged-in user
  const getUserCart = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // Fetch all products
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

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clear cart
  const clearCart = async () => {
    setCartItems({});
    if (token) {
      try {
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        await axios.post(
          backendUrl + "/api/cart/clear",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to clear cart on backend.");
      }
    }
  };

  // Load products on mount
  useEffect(() => {
    getProductData();
  }, []);

  // Load cart if token exists
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(); // ✅ run only after token is available
    }
  }, [token]);

  // Context value
  const value = {
    products,
    filteredProducts, // ✅ Expose filtered list
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
