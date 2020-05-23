import React,{useState,useEffect} from 'react'
import axios from 'axios'
import url from '../utils/URL'
import featuredProducts,{flattenProducts} from '../utils/helpers'
export const ProductContext=React.createContext()


function ProductProvider({children}) {
  const [loading, setLoading] = useState()
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/products`)
    .then(response=>{
     
      const products=flattenProducts(response.data)
      const featured=featuredProducts(products)
      setFeatured(featured)
      setProducts(products)
    })
    .catch(error=>console.log("some error occured"))
    setLoading(false)
    
  }, [])


  return (
    <ProductContext.Provider value={{loading,products,featured}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider

