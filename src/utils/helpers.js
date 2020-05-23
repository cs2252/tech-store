import url from './URL'
export function flattenProducts(data){
  return data.map(item=>{
    //claudinary
    // let image=item.image.url
    //local setup no deployment
    // console.log(url,item.image)
    let image= `${item.image[0].url}`
    return {
      ...item,
      image
    }
  })
}

// helper functions
const featuredProducts=data=>{
  return data.filter(item=>{
    return item.featured===true
  })
}
export default featuredProducts