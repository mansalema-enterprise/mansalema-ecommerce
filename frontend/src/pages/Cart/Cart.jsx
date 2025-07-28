import React, { useContext, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import CartTotal from "../../components/CartTotal/CartTotal";
import './Cart.css'
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout')
  }
  useEffect(() => {
    if (!products.length) return;

    // Convert cartItems object into an array of cart products
    const tempData = Object.entries(cartItems)
      .filter(([itemId, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({
        _id: itemId,
        quantity,
      }));

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div>
      <div className="cart-content-container">
        {cartData.length > 0 ? (
          cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null; // Ensure productData exists before rendering

            return (
              <div key={item._id} className="cart-items">
                <div className="cart-item-info">
                  <img src={productData.image[0]} alt="" className="product-cart-image" />
                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData.name}</p>
                    <p className="cart-product-price">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>

                <input
                  type="number"
                  className="quantity-input"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (newQuantity > 0) {
                      updateQuantity(item._id, newQuantity);
                    }
                  }}
                />
                <MdDelete className="delete-icon" onClick={() => updateQuantity(item._id, 0)} />
              </div>
            );
          })
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button className="checkout-button" onClick={handleCheckout}>Proceed To Checkout</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Cart;