import React from "react";
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg'
import CartLink from '../components/Cart/CartLink'
import {UserContext} from '../context/user'
import LoginLink from '../components/LoginLink'
export default function Header() {

  const {user}=React.useContext(UserContext)

  return (
    <header className="header">
      <img src={logo} alt="tech-store logo" className="logo"/>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            <li>
              <Link to="/About">About</Link>
            </li> 
            <li>
              <Link to="/Products">Products</Link>
            </li>
            {
              user.token&&
              <li>
                <Link to="/Checkout">Checkout</Link>
             </li>
            }
          </div>
          <div>
            <LoginLink/>
            <CartLink/>
          </div>
        </ul>
      </nav>
    </header>
  )
}
