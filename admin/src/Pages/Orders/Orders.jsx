import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "./Orders.css";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/delete`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order deleted");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error deleting order");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="order-title">All Orders</h3>
      <div className="order-container">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-details">
              <div className="user-order-details">
                <p className="order-customer">
                  <span>Customer: </span>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="order-invoice">
                  <span></span> {order.invoiceNumber || order._id}
                </p>
                <p>
                  <span>Tel: </span>
                  {order.address.phone}
                </p>
                <div className="order-address">
                  <span>Shipping Address:</span>
                  {order.address.street} {order.address.suburb},{" "}
                  {order.address.city}, {order.address.province}{" "}
                  {order.address.zipcode}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <p>
                      <span>Product:</span> {item.name}
                    </p>
                    <p>
                      <span>Qty:</span> {item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="payment-method">
                <p>
                  <span>Items:</span> {order.items.length}
                </p>
                <p>
                  <span>Method of Payment:</span> {order.paymentMethod}
                </p>
                <p>
                  <span>Payment:</span> {order.payment ? "Done" : "Pending"}
                </p>
                <p>
                  <span>Date:</span> {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <h2 className="order-amount">
                {currency} {order.amount}
              </h2>

              <div className="order-controls">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="order-status"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing Order">Packing Order</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button
                  className="delete-icon-btn"
                  onClick={() => deleteOrder(order._id)}
                  title="Delete Order"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
