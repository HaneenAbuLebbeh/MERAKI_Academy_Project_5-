import './App.css'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/navbar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
 

function App() {


  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/Navbar" element={<Navbar/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/Login" element={<Login/>}/>

    </Routes>
    </>
  )
}

export default App
