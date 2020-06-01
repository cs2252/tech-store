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
import PrivateRoute from './components/PrivateRoute'

//component
import Header from './components/Header'
import Alert from './components/Alert'
import ScrollButton from './components/ScrollButton'


export default function App() {
  return <Router>
    <Header/>
    <Alert />
    <ScrollButton/>
   <Switch>
    <Route exact path="/"><Home/></Route>
    <Route path="/About"><About/></Route>
    <Route path="/Cart"><Cart/></Route>
    <PrivateRoute 
      path="/Checkout"
      >
        <Checkout/>
    </PrivateRoute> 
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
