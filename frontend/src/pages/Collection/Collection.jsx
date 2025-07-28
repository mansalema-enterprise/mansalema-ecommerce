import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useParams, Link } from 'react-router-dom'
import panic_button from '../../assets/panic-button.jpg'

const Collection = () => {
  const { products, searchTerm } = useContext(ShopContext)
  const { category } = useParams()

  const filteredProduct = products.filter(
    (product) =>
      category &&
      product.category.toLowerCase() === category.toLowerCase() &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const bannerImages = {
    Accessories: panic_button,
    // Add other categories as needed
  }

  return (
    <div>
      {/* Banner Section */}
      {/* <div className="banner">
        {bannerImages[category] ? (
          <img src={bannerImages[category]} alt="banner-img" />
        ) : (
          <p>No image matches in the category</p>
        )}
      </div> */}
      {/* Product Grid */}
      <div className="product-grid">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image[0]} alt={product.name} />
                </Link>
              </div>
              <h3>{product.name}</h3>
              <p>R{product.price}</p>
            </div>
          ))
        ) : (
          <p>No product found in this category</p>
        )}
      </div>
    </div>
  )
}

export default Collection
