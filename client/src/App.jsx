import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product, setProduct] = useState({
    name:"Nilesh by himself",
    price:1000,
    productBy:"facebook"
  })

  const makePayment = token => {
    const body = {
      token,
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more {import.meta.env.REACT_APP_KEY}
      </p>
      <StripeCheckout 
      stripeKey='pk_test_51QQS8kGvPiJHqRNuRdUOXT4dgoMuc1oKFM8Wq2LyHwN9r8UIUFzEQWlSvXLyoIhlK7j4WkshcSIIYjC0tAe6hUpX001ONGe02w'
      token=''
      name={product.name}
      amount={product.price} // cents
      panelLabel="paisa de" // prepended to the amount in the bottom pay button
      currency="USD"
      />
    </>
  )
}

export default App
