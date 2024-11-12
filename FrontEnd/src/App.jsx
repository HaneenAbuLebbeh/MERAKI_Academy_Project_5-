import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/navbar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import AdminPanel from "./components/AdminPanel/AdminPanel"

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

    </Routes>
    </>
  )
}

export default App
