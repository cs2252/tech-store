import React from "react";
import {useParams, useHistory} from 'react-router-dom'
import {ProductContext} from '../context/products'
import Loading from '../components/Loading'
import {CartContext} from '../context/cart'
export default function ProductDetails() {
  const {id}=useParams()
  const {products}=React.useContext(ProductContext);
  const {addToCart} =React.useContext(CartContext)
  const product=products.find(item=>item.id===parseInt(id))
  const history=useHistory()
  if( !product || product.length===0)
  {
    return <Loading/>
  }
  else
  {
    // console.log(product)
    const {image,title,price,description}=product
    return (
      <section className="single-product">
        <img src={image} alt={title}
        className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button className="btn btn-primary btn-block"
            onClick={()=>{
            addToCart(product);
            history.push('/Cart')
            }}
            >
          add to Cart</button>

        </article>

      </section>
    )
  }
  
}
