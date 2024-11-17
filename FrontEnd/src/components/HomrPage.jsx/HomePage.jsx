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
    </div>
    </>
  )
}

export default HomePage