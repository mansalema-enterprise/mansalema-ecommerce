import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const navigate = useNavigate();

  const { token, setCartItems } = useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
  try {
    if (!token) return;

    const response = await axios.post(
      backendUrl + '/api/order/verify',
      { success, orderId },
      { headers: { token } } // You can remove this if your verify route doesn't use auth
    );

    if (response.data.success) {
      setCartItems({});
      navigate('/orders');
      toast.success('Payment Successful');
    } else {
      navigate('/cart');
      toast.error('Payment Failed');
    }
  } catch (error) {
    console.log(error);
    toast.error('An error occurred');
  }
};


  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};


export default Verify
