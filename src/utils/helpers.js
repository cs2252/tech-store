//visited
export function flattenProducts(data){
  return data.map(item=>{
    let image= item.image[0]&& item.image[0].url ||null
    return {
      ...item,
      image
    }
  })
}

// helper functions
export const featuredProducts=data=>{
  return data.filter(item=>{
    return item.featured===true
  })
}

//paginate
export const paginate=products=>{
  //our code goes here
  // console.log(products)
  const itemsPerPage=4
  const numberOfPages=Math.ceil(products.length/itemsPerPage)
  const newProducts=Array.from({length:numberOfPages},(_,index)=>{
    let start=index*itemsPerPage
    return products.slice(start,start+itemsPerPage)
  })

  return newProducts
}