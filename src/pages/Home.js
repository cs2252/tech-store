import React from "react";
import Hero from '../components/Hero'
import {Link} from 'react-router-dom'
export default function Home() {
  return <div>
    <Hero>
      <Link to="/Products" className="btn btn-primary btn-hero">
        our Products
      </Link>
    </Hero>
  </div>
}
 