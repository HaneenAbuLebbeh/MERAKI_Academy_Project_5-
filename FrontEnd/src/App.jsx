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
import OrderConfirmtion from './components/Orders/OrderConfirmtion'
import CheckOutpage from './components/CheckoutPage/CheckOutpage'
import UserOrders from './components/Orders/userorders'
import Market from './components/Market/Market'

import SocketMessages from './components/Socket/SocketMessages'
import SendSocketMessages from './components/Socket/SendSocketMessages'
import ReceiveSocketMessages from './components/Socket/ReciveSocketMessages'

import CartPage from './components/Cart/CartPage'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';
import Favourite from './components/Favourite/Favourite'

import AccountSettings from './components/Account/Account'




function App() {


  return (
    <>

    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    style={{ top: '50px' }}
    />

    <Navbar/>
    <SocketMessages>
    <Routes>
    <Route path="/Navbar" element={<Navbar/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/adminPanel" element={<AdminPanel/>} />
    <Route path="/TouristSpots" element={<TouristSpots/>} />
    <Route path="/TouristSpots-Detailes" element={<TouristSpotsDeatils/>} />

    <Route path="/Products/:touristSpotsid" element={<Products/>} />
    <Route path="/products/details/:productId" element={<ProductDetailes/>} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckOutpage/>} />
    <Route path="/order/:id" element={<OrderConfirmtion/>} />
    <Route path="/my-PreviousOrders" element={<UserOrders/>} />
    <Route path="/Market" element={<Market/>} />

    <Route path="/SocketMessages" element={<SocketMessages/>} />
    <Route path="/send-socket-message" element={<SendSocketMessages/>} />
    <Route path="/recive-socket-message" element={<ReceiveSocketMessages/>} />
    

    <Route path="/Favourite" element={<Favourite />} />
    <Route path="/Account" element={<AccountSettings />} />

    </Routes>
    </SocketMessages>
    </>
  )
}

export default App
