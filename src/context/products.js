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

  React.useEffect(()=>{
    let newProducts=[...products].sort((a,b)=>a.price-b.price)
    //logic 
    const {search,category,shipping,price}=filters
    if(category!=="all"){
      newProducts=newProducts.filter(item=>item.category===category)
    }
    if(shipping!==false){
      newProducts=newProducts.filter(item=>item.fee_shipping===true)
    }
    if(search!==''){
      newProducts=newProducts.filter(item=>{
      let title=item.title.toLowerCase().trim()
      return title.startsWith(search)?item:null
      })
    }
    if(price!=="all"){
      newProducts=newProducts.filter(item=>{
        if(price===0)
          return item.price<300
        else if(price===300)
          return item.price>300&& item.price<650
        else  return item.price>650
      })
    }

    setPage(0)
    setSorted(paginate(newProducts))
  },[filters,products])
  const changePage=index=>{
    setPage(index)
  }
  const updateFilters=e=>{
   const type=e.target.type
   const filter=e.target.name
   const value=e.target.value
   let filterValue
   if(type==="checkbox"){
     filterValue=e.target.checked
   }else if(type==="radio"){
     value==="all"?(filterValue=value):(filterValue=parseInt(value))
   }else{
     filterValue=value
   }
   setFilters({...filters,[filter]:filterValue})
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

