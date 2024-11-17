import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate=useNavigate()
  return (
    <div>
        <h3 onClick={()=>{navigate("/TouristSpots-Detailes")}}>Tourst detailes page</h3>
        <h3 onClick={()=>{navigate("/send-socket-message")}}>send messages</h3>
        <h3 onClick={()=>{navigate("/recive-socket-message")}}>send messages</h3>
    </div>
  )
}

export default HomePage