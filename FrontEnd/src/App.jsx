import './App.css'
import Navbar from './Components/Navbar'
import { Auth0Provider } from '@auth0/auth0-react';
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <Auth0Provider
    domain="dev-l28mylgsmr8adojm.us.auth0.com"
    clientId="q8JriB3CXgVV7rbGqT9m07LNVAsLMcya"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <Navbar />
      <Outlet />
      <Footer/>
      </Auth0Provider>
  )
}

export default App
