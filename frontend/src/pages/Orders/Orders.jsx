import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { backendUrl } from "../../App";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className="orders-container">
      <div className="order-title">
        <h1>My Orders</h1>
      </div>

      {orderData.map((order, index) => (
        <div key={index} className="order-card">
          <h2 className="invoice-number">
            {order.invoiceNumber || order._id?.slice(-6)}
          </h2>
          <p className="order-date">
            Date: {new Date(order.date).toLocaleString()}
          </p>
          <p className="order-payment">Payment Method: {order.paymentMethod}</p>
          <p className="order-status">Status: {order.status}</p>

          {order.items.map((item, i) => (
            <div key={i} className="order-item-container">
              <div className="order-item-details">
                <img
                  src={item.image?.[0] || "/default-image.png"}
                  alt={item.name}
                  className="order-item-image"
                />
                <div>
                  <p className="order-item-name">{item.name}</p>
                  <p>
                    {currency}
                    {item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <p className="order-total">
            <b>Total:</b> {currency}
            {order.amount}
          </p>

          {order.address && (
            <p className="order-address">
              <b>Shipping Address:</b> {order.address.street},{" "}
              {order.address.city}, {order.address.postalCode}
            </p>
          )}

          <div className="order-actions">
            <b onClick={loadOrderData} className="track-order-btn">
              Track Order
            </b>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
