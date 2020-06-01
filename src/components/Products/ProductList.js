import React from "react";
import Product from "./Product"
export default function ProductList({products}) {
  // console.log(Props)
  return <section className="section">
    <h2 className="section-title">product list</h2>
    <div className="products-center">
      {
        products&&
        products.map((product)=>{
          return <Product  key={product.id}{...product}/>
        })
      }
    </div>
  </section>
}
