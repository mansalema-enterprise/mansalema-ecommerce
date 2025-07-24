import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import CartTotal from "../../components/CartTotal/CartTotal";
import { assets } from "../../assets/assets"; // Make sure payfast_logo is added here
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import "./Checkout.css";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("payfast");

  const {
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    token,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    province: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      Object.entries(cartItems).forEach(([productId, quantity]) => {
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (!product) return;

          const itemInfo = structuredClone(product);
          itemInfo.quantity = quantity;
          orderItems.push(itemInfo);
        }
      });

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const response = await axios.post(
        backendUrl + "/api/order/payfast",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- THIS IS THE KEY CHANGE
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        const { payment_url } = response.data;
        if (payment_url) {
          window.location.href = payment_url; // Redirect to Payfast
        } else {
          navigate("/orders");
        }
      } else {
        toast.error(response.data.message || "Payment failed.");
      }
    } catch (error) {
      toast.error("Something went wrong during checkout.");
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={onSubmitHandler}>
        {/* Left side: Payment and shipping form */}
        <div className="form-left">
          <fieldset className="payment-method">
            <legend>Payment Option</legend>
            <div className="payment-options">
              <div
                onClick={() => setMethod("payfast")}
                className={`payment-option ${
                  method === "payfast" ? "selected" : ""
                }`}
              >
                <img
                  src={assets.payfast_logo}
                  alt="Payfast"
                  className="payment-logo"
                />
              </div>
            </div>
          </fieldset>

          <div className="form-title">
            <h2>Shipping Address</h2>
          </div>

          <div className="form-row">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              className="form-input"
              placeholder="First Name"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              className="form-input"
              placeholder="Last Name"
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-input"
              placeholder="Email Address"
              onChange={onChangeHandler}
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              className="form-input"
              placeholder="Phone Number"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              className="form-input"
              placeholder="Street Address"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="city"
              value={formData.city}
              className="form-input"
              placeholder="City"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="province"
              value={formData.province}
              className="form-input"
              placeholder="Province"
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              className="form-input"
              placeholder="Zipcode"
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* Right side: Summary and Submit */}
        <div className="form-right">
          <CartTotal />
          <div className="form-submit">
            <button type="submit" className="submit-button">
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
