// cart context

import React,{useState,useEffect, useReducer} from 'react'
import localCart from '../utils/localCart'
import reducer from './reducer'
import {INCREASEITEM,DECREASEITEM,REMOVEITEM,ADDTOCART,CLEARCART} from './actions'
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
// console.log(children)
  const [cart, dispatch] = useReducer(reducer,getCartFromLocalStoreage())
  
  
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
   //no of items in cart
   localStorage.setItem("cart",JSON.stringify(cart))
   const newCartItems=cart.reduce((total,cartItem)=>{
     return total+cartItem.amount
   },0)
   setCartItems(newCartItems)

   //cart total amount
   let newCartTotal=cart.reduce((total,cartItem)=>{
     return total+=(parseFloat(cartItem.amount)*parseFloat(cartItem.price))
   },0)

   newCartTotal=newCartTotal.toFixed(2)
   setTotal(newCartTotal)
  }, [cart])

  //remove item 
  const removeItem=id=>{ 
    dispatch({type:REMOVEITEM,payload:id})
  }
  //increase item
  const increaseAmout=id=>{
    dispatch({type:"INCREASEITEM",payload:id})
  }
  //decrease item
  const decreaseAmout=(id,amount)=>{
    if(amount===1)
      dispatch({type:REMOVEITEM,payload:id})
    else
      dispatch({type:DECREASEITEM,payload:id})
  }
  //add to cart item
  const addToCart=product=>{
    const item=cart.find(item=>item.id===product.id)
    if(item)
    {
      dispatch({type:INCREASEITEM,payload:product.id})
    }
    else
    {
      dispatch({type:ADDTOCART,payload:product})
    }
  }
  //clear item
  const clearCart=id=>{
    dispatch({type:CLEARCART})
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