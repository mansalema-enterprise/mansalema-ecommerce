import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || "/fallback-image.jpg"); // Fallback image
    }
    setLoading(false);
  }, [productId, products]);

  const handleAddToCart = (id) => {
    addToCart(id);

    toast.success(
      <div>
        ✅ Item added to cart!
        <div>
          <button
            className="toast-cart-button"
            onClick={() => navigate("/cart")}
          >
            🛒 View Cart
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 4000,
      }
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return productData ? (
    <div className="product-container">
      <div className="product-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="thumbnail-container">
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="thumbnail"
                alt={`Thumbnail ${index}`}
              />
            ))}
          </div>
          <div className="main-img-container">
            <img src={image} alt="Main product" className="main-image" />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-name">{productData.name}</h1>
          <hr className="product-divider" />
          <p className="product-price">
            {currency}
            {productData.price}
          </p>
          <p className="product-description">{productData.description}</p>
          <hr className="product-divider" />

          <button
            onClick={() => handleAddToCart(productData._id)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <RelatedProduct category={productData.category} />
    </div>
  ) : (
    <div>No product matches</div>
  );
};

export default ProductDetails;
