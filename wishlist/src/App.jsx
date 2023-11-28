import './App.css'
import Products from './components/product'
import { WishlistProvider } from './context/Wishlist'

function App() {

  return (
    <>
    <WishlistProvider>
     <Products></Products>
    </WishlistProvider>
    </>
  )
}

export default App
