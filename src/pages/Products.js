import React,{useContext} from "react";
import {ProductContext} from '../context/products'
import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'
import Fiters from '../components/Products/Filters'
import PageProduct from '../components/Products/PageProduct'
import Filters from "../components/Products/Filters";
export default function Products() {
  const {loading}=useContext(ProductContext)
  // console.log(products)
  if(loading)
  {
    return <Loading />
  }
  else
  {
    return (
    <>
      <Filters/>
      <PageProduct/> 
    </>
    )
  }
}
