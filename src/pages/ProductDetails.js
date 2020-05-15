import React from "react";
import {useParams, useHistory} from 'react-router-dom'
import {ProductContext} from '../context/products'
import Loading from '../components/Loading'
export default function ProductDetails() {
  const {id}=useParams()
  const {products}=React.useContext(ProductContext);
  const product=products.find(item=>item.id===parseInt(id))
  const history=useHistory()
  if( !product || product.length===0)
  {
    return <Loading/>
  }
  else
  {
    const {image:{url:imageUrl},title,price,description}=product
    return (
      <section className="single-product">
        <img src={imageUrl} alt={title}
        className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button className="btn btn-primary btn-block"
            onClick={()=>{
            //add to cart
            history.push('/Cart')
            }}
            >
          add to Cart</button>

        </article>

      </section>
    )
  }
  
}
