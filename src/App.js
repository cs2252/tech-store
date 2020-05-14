import React from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
//import pages
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

//component
import Header from './components/Header'
export default function App() {
  return <Router>
    <Header/>
   <Switch>
    <Route exact path="/"><Home/></Route>
    <Route path="/About"><About/></Route>
    <Route path="/Cart"><Cart/></Route>
    <Route path="/Checkout"><Checkout/></Route>
    <Route path="/Login"><Login/></Route>
    <Route exact path="/Products"><Products/></Route>
    <Route 
      path="/products/:id"
      children={<ProductDetails/>}
    >
    </Route>
    <Route path="*"><Error/></Route>
   </Switch>  
  </Router>
}
