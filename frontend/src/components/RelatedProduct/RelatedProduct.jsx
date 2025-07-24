import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const RelatedProduct = ({category}) => {

    const {products} = useContext(ShopContext)

    const [relatedProduct, setRelatedProduct] = useState([])

    const related = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
    )

    useEffect(() => {
        setRelatedProduct(related.slice(0, 4))
    },[])
  return (
    <div>
      <div className="product-container">
                <div className="list-header">
                    <h1>Related Products</h1>
                    <hr className='divider' />
                </div>
                <div className="product-grid">
                    {relatedProduct.length > 0 ? (
                        relatedProduct.map((product) => (
                            <div className='product-card' key={product._id}>
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
    </div>
  )
}

export default RelatedProduct
