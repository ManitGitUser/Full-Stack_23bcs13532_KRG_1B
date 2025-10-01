import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function ProductCard({ name, price, description, inStock }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>{description}</p>
      {inStock ? (
        <button>Buy Now</button>
      ) : (
        <p style={{ color: "red" }}>Out of Stock</p>
      )}
    </div>
  )
}
function App() {
  return (
    <>
      <ProductCard 
        name="Iphone 17 Pro Max" 
        price="2.5 Lakh" 
        description="Latest model with no changes" 
        inStock={true} 
      />
      <ProductCard 
        name="Razer Blade" 
        price="5 lakh"
        description="Beast Laptop" 
        inStock={true} 
      />
      <ProductCard 
        name="Boat Headphones" 
        price="1.5k" 
        description="Noise cancelling hai isme" 
        inStock={false} 
      />
    </>
  )
}
export default App