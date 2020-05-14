import React,{useState,useEffect} from 'react'
import axios from 'axios'
import url from '../utils/URL'
export const ProductContext=React.createContext()


function ProductProvider({children}) {
  const [loading, setLoading] = useState()
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    axios.get(`${url}/products`)
    .then(response=>{
       setProducts(response.data)
    })
    .catch(error=>console.log("some error occured"))
    
  }, [])


  return (
    <ProductContext.Provider value={{loading,products,featured}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider

