import {React,useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Welcome from "./Welcome"
import Category from "./Category"
const HomePage = () => {
  return (
    <>
    <div>
        <Welcome/>
    </div> 
      <Category/>
      </>
)}




export default HomePage