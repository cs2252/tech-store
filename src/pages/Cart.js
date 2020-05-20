import React from "react";
import {CartContext} from '../context/cart'
import EmptyCart from '../components/Cart/EmptyCart'
import CartItem from '../components/Cart/CartItem'
import {Link} from 'react-router-dom'

export default function Cart() {
  let user=false
  const {cart,total}=React.useContext(CartContext)
  if(cart.length===0)
    return <EmptyCart/>
  else
  {
    if(!cart)
      return <h1>cart is undefined</h1>
    return (
      <section className="cart-items section">
        <h2>Your Cart</h2>
        {
          cart.map(item=>{
            return <CartItem key={item.id}{...item} />
          })
        }
        <h2>total : ${total}</h2>
        {
          user
          ?<Link to="/Checkout" className="btn btn-primary btn-block">checkout</Link>
          :<Link to="/Login" className="btn btn-primary btn-block">Login</Link>
        }
      </section>
    )
  }
}
