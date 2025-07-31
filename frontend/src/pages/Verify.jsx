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

  const verifyPayment = async () => {
    try {
      if (!token) {
        // If user is not logged in, redirect to login
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verify`,
        { success, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct header
          },
        }
      );

      setLoading(false);

      if (response.data.success && success === "true") {
        setCartItems({});
        toast.success("✅ Payment Successful!");
        navigate("/orders");
      } else {
        toast.error("❌ Payment Failed or Canceled");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("⚠️ An error occurred while verifying payment");
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading && <h2>⏳ Verifying Payment...</h2>}
    </div>
  );
};

export default Verify;
