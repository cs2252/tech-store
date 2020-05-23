import React,{useState} from "react";
import {CartContext} from '../context/cart'
import {UserContext} from '../context/user'
import {useHistory} from 'react-router-dom'
 import EmptyCart from '../components/Cart/EmptyCart'
//react-spripe-elemement
import {CardElement,StripeProvider,Elements,injectStripe}
from 'react-stripe-elements'
import submitOder from '../strapi/submitOrder'
 function Checkout(Props) {
  const {cart,total,clearCart}=React.useContext(CartContext)
  const {user,showAlert,hideAlert,alert}=React.useContext(UserContext)
  const history=useHistory()
  //state values

  const [name, setName] = useState("")
  const [error, setError] = useState('')
  const isEmpty=!name || alert.show
  async function handleSubmit(e){
    showAlert("submitting order... please wait")
    e.preventDefault()
    const response=await Props.stripe
      .createToken()
      .catch(error=>console.log(error))

    const {token}=response
    if(token)
    {
      setError("")
      const {id}=token
      let order=await submitOder({
        name:name,
        total:total,
        items:cart,
        stripeTokenId:id,
        userToken:user.token
      })
      if(order)
      {
        showAlert("your order is successful")
        clearCart()
        history.push("/")
        return;
      }
      else{
        showAlert("there was an error with your order!! Please try again","danger")
      }
    }
    else{
      hideAlert()
      setError(response.error.message)
    }
    
 }
  if(cart.length<1) return <EmptyCart/>
  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3 > order total: <span>${total}</span></h3>

        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e=>{
              setName(e.target.value)
            }}
          />
        </div>
        {/*end of single input */}

        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit Card</label>
          <p className="stripe-info">
            Test using this credit card:<span>4242 4242 4242 4242</span>
            <br/>
            enter any 5 digits for the zip code
            <br/>
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}

        {/* stripe elements */}
          <CardElement className="card-element"></CardElement>
        {/* end of stripe elements */}
        {/* stripe errors */}
          {error && <p className="form-empty">{error}</p>}
          {/*  empty value*/}
          {isEmpty
          ?<p className="form-empty">please fill out name field</p>
          :<button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            submit
          </button>
          }
      </form>
    </section>
  )
}

const CardForm=injectStripe(Checkout)

const StripeWrapper=()=>{
  return <StripeProvider apiKey="pk_test_8Fn1y8E76wMDuJqPSXU3rtfg00wPaQroE8">
    <Elements>
      <CardForm>
         
      </CardForm>
    </Elements>
  </StripeProvider>
}
export default StripeWrapper
