import React,{useState,useEffect} from 'react'
import axios from 'axios'
import url from '../utils/URL'
import {featuredProducts,flattenProducts,paginate} from '../utils/helpers'
export const ProductContext=React.createContext()


function ProductProvider({children}) {
  const [loading, setLoading] = useState()
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  //extra state values
  const [sorted, setSorted] = useState([])
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState({
    search:"",
    category:"all",
    shipping:false,
    price:"all"
  })

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/products`)
    .then(response=>{
      const products=flattenProducts(response.data)
      const featured=featuredProducts(products)
      const paginatedProducts=paginate(products)
      setSorted(paginatedProducts)
      setFeatured(featured)
      setProducts(products)
    })
    .catch(error=>console.log(error))
    setLoading(false)
    
  }, [])
  const changePage=index=>{
    setPage(index)
  }
  const updateFilters=e=>{
    console.log(e)
  }

  return (
    <ProductContext.Provider value={{
      loading,
      products,
      featured,
      sorted,
      page,
      filters,
      changePage,
      updateFilters
      }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider

