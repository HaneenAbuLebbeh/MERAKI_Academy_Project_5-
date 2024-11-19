import {React,useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'

import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Welcome from "./Welcome"
import Category from "./Category"
const HomePage = () => {
  return (<>
    <div>
        <Welcome/>
    </div>
    <div>
      <Category/>

import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate=useNavigate()
  return (
    <div>
        <h3 onClick={()=>{navigate("/TouristSpots-Detailes")}}>Tourst detailes page</h3>
        <h3 onClick={()=>{navigate("/send-socket-message")}}>send messages</h3>
        <h3 onClick={()=>{navigate("/recive-socket-message")}}>send messages</h3>

    </div>
    </>
  )
}

export default HomePage