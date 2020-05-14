import React from "react";
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg'
export default function Header() {
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
          </div>
          <div>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Cart">Cart</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}
