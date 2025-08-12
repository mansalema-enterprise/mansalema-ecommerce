// src/pages/Verify.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sanity check
    if (!orderId) {
      toast.error("Missing orderId in URL");
      setLoading(false);
      navigate("/cart");
      return;
    }

    // If user not logged in, send them to login but preserve return location
    if (!token) {
      const returnTo = `/verify?success=${encodeURIComponent(success || "")}&orderId=${encodeURIComponent(orderId)}`;
      navigate(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }

    // token exists -> verify with backend
    const verifyPayment = async () => {
      try {
        const resp = await axios.post(
          `${backendUrl}/api/order/verify`,
          { success, orderId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLoading(false);

        if (resp?.data?.success && success === "true") {
          // clear cart (adjust if your cart shape is an array)
          setCartItems({});
          toast.success("✅ Payment successful!");
          navigate("/orders");
        } else {
          toast.error("❌ Payment cancelled or failed");
          navigate("/cart");
        }
      } catch (err) {
        console.error("verifyPayment error:", err?.response || err);
        toast.error("⚠️ Error verifying payment. Please contact support.");
        setLoading(false);
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [token, success, orderId, navigate, setCartItems]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading ? <h2>⏳ Verifying payment...</h2> : null}
    </div>
  );
};

export default Verify;
