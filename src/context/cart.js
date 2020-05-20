// cart context
import React,{useState,useEffect} from 'react'
import localCart from '../utils/localCart'

const getCartFromLocalStoreage=()=>{
  const localCart=localStorage.getItem("cart")
  if(localCart)
  {
    return JSON.parse(localCart)
  }
  else
    return []
}




const CartContext=React.createContext()

function CartProvider({children}){
// console.log(Props)
  const [cart, setCart] = useState(getCartFromLocalStoreage())
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
   //cart items
   localStorage.setItem("cart",JSON.stringify(cart))
   const newCartItems=cart.reduce((total,cartItem)=>{
     return total+cartItem.amount
   },0)
   setCartItems(newCartItems)
   //cart total
   let newCartTotal=cart.reduce((total,cartItem)=>{
     return total+=(parseFloat(cartItem.amount)*parseFloat(cartItem.price))
   },0)

   newCartTotal=newCartTotal.toFixed(2)
   setTotal(newCartTotal)
  }, [cart])

  //remove item 
  const removeItem=id=>{
    setCart(cart.filter(item=>item.id!==id)) 
  }
  //remove item
  const increaseAmout=id=>{
    const newCart=cart.map(item=>{
      if(id===item.id)
      {
        return {...item,amount:item.amount+1}
      }
      else 
        return {...item}
    })
    setCart(newCart)
  }
  //decrease item
  const decreaseAmout=id=>{
    const newCart=cart.map(item=>{
      if(id===item.id)
      {
        return {...item,amount:item.amount-1}
      }
      else 
        return {...item}
    })
    setCart(newCart)
  }
  //add to cart item
  const addToCart=product=>{
    const {id,title,price,amout,image}=product
    const item=cart.find(item=>item.id===id)
    if(item)
    {
      increaseAmout(id)
    }
    else
    {
      const newItem={id,image,price,title,amount:1}
      const newCart=[...cart,newItem]
      setCart(newCart)
    }
  }
  //clear item
  const clearCart=id=>{
    setCart([])
  }
  

  return <CartContext.Provider value={{
            cart,
            total,
            cartItems,
            removeItem,
            increaseAmout,
            decreaseAmout,
            addToCart,
            clearCart
            }}>
    {children}
  </CartContext.Provider>
}
export {CartContext,CartProvider}