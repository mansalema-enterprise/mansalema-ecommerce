import React from "react";
import salemaTagme from "../../assets/salema-tagme.jpg";
import "./Hero.css";
import { useNavigate } from "react-router";

const Hero = () => {

  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/category/Salema"); // Route for the Salema category
  };
  return (
    <div>
      <div className="hero">
        <div className="hero-top">
          <div className="hero-left">
            <h2>Purple 3D Printed</h2>
            <h1>Salema Tag Me Keyholder</h1>
            <button className="shop-now" onClick={handleShopNow}>Shop Now</button>
          </div>
          <div className="hero-right">
            <img src={salemaTagme} alt="Key Holder" />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Hero;
