import React from "react";
import Product from "./Product"
export default function ProductList(Props) {
  // console.log(Props)
  return <section className="section">
    <h2 className="section-title">{Props.title}</h2>
    <div className="products-center">

      {
        Props.products.map((product)=>{
          return <Product  key={product.id}{...product}/>
        })
      }
    </div>
  </section>
}
