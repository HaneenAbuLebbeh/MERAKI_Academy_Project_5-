import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from "./components/Register/Register"
import HomePage from './components/HomrPage.jsx/HomePage'
import AdminPanel from "./components/AdminPanel/AdminPanel"
import TouristSpots from './components/TouristSpots/TouristSpots'
import TouristSpotsDeatils from './components/TouristSpots/TouristSpotsDeatils'
import Cart from './components/Cart/cart'
import Products from './components/Products/Products'
import ProductDetailes from './components/ProductsDetailes/ProductDetailes'
import Orders from './components/Orders/Orders'
import OrderConfirmtion from './components/Orders/OrderConfirmtion'
import CheckOutpage from './components/CheckoutPage/CheckOutpage'
function App() {


  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/Navbar" element={<Navbar/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/adminPanel" element={<AdminPanel/>} />
    <Route path="/TouristSpots" element={<TouristSpots/>} />
    <Route path="/TouristSpots-Detailes" element={<TouristSpotsDeatils/>} />
    <Route path="/Cart" element={<Cart/>} />
    <Route path="/Products/:category_id" element={<Products/>} />
    <Route path="/Products/Detailes/:product_id" element={<ProductDetailes/>} />
    <Route path="/my-orders" element={<Orders/>} />
    <Route path="/Orders/:id" element={<OrderConfirmtion/>} />
    <Route path="/checkout" element={<CheckOutpage/>} />

    </Routes>
    </>
  )
}

export default App
