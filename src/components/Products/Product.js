import React from "react";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import defaultimg from '../../assets/mainBcg.jpeg'
export default function Product({id,image,title,price}) {
  image=image||defaultimg
  title=title||"default title"
  price=price||0
return (
<article className="product">
    <div className="img-container">
      <img src={image/*imageUrl */} alt={title} />
      <Link to={`products/${id}`} className="btn btn-primary product-link">
        details
      </Link>
    </div>
    <div className="product-footer">
      <p className="product-title">{title}</p>
      <p className="product-price">${price}</p>
    </div>
  </article> 
)
}
Product.propTypes={
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}
