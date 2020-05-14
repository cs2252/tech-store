import React,{useContext} from "react";
import {ProductContext} from '../context/products'
export default function Products() {
  const {loading,products,featured}=useContext(ProductContext)
return <h1>hello from products page:
 {
  loading===true?"loading":products.map((product,index)=><li key={index}>{product.id}</li>)
 }
</h1>;
}
