import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext"; 
import { Link } from "react-router-dom";

const HomeCollection = () => {
  const { filteredProducts, currency } = useContext(ShopContext);

  return (
    <div>
      <div className="product-container">
        <div className="list-header">
          <h1>Our Collection</h1>
          <hr className="divider" />
        </div>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 19).map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image[0]} alt={product.name} />
                  </Link>
                </div>
                <h3>{product.name}</h3>
                <p>
                  {currency}
                  {product.price}
                </p>
              </div>
            ))
          ) : (
            <p>No products match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCollection;
