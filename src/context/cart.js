// cart context
import React,{useState,useEffect} from 'react'
import localCart from '../utils/localCart'
const CartContext=React.createContext()


 function CartProvider({children}){

  const [cart, setCart] = useState(localCart)
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
   //cart items
  //  console.log("use effect called")
   let newCartItems=cart.reduce((total,cartItem)=>{
     return total+=cartItem.amount
   },0)
   console.log(newCartItems)
   setCartItems(newCartItems)
   //cart total
   let newCartTotal=cart.reduce((total,cartItem)=>{
     return total+=(parseFloat(cartItem.amount)*parseFloat(cartItem.price))
   },0)
   console.log(newCartTotal)
   newCartTotal=newCartTotal.toFixed(2)
   setTotal(newCartTotal)
  }, [cart])
  //remove item 
  const removeItem=id=>{
    // console.log("removed item called")
    setCart(cart.filter(item=>item.id!==id)) 
  }
  //remove item
  const increaseAmout=id=>{}
  //decrease item
  const decreaseAmout=id=>{}
  //add to cart item
  const addToCart=id=>{}
  //clear item
  const clearCart=id=>{}
  

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