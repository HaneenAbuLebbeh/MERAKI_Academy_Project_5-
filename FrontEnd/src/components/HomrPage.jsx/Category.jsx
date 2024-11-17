import {React,useState,useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { Container, Row, Col } from "react-bootstrap";

const categories = () => {
  const isLoggedIn=useSelector((initialState)=> initialState.login.isLoggedIn)
  const [message, setMessage] = useState("")
  const [error, setError] = useState({});
  const [category, setCategory] = useState();

  const fetchCategories=async()=>{
    try {
      const result = await axios.get(`http://localhost:5000/category`);
      console.log(result.data.result)

if (result?.data?.success){
setCategory(result?.data.result)
console.log(category);


}}catch (error) {
  if (error.response) {
    return setMessage(error.response?.data.message);
  }
  setMessage("Error happened while Get Data, please try again");
}}

  useEffect(() => {
    fetchCategories();
  }, []);
  
  return (



    <div className="container" >
      
    <Row>
    
      
      {category?.map((elem) => (
        <Col key={elem.id} xs={12} md={4} lg={3}>
         <div className="mb-2">
          <div className="card" style={{ width: "18rem", height: "20rem", backgroundColor:"#7FB2F0" }}>
            <img
              src={elem.image_url}
              className="card-img-top"
              style={{ width: "18rem", height: "10rem" }}
            />
            <div className="card-body ">
              <Link className="mx-auto" 
                to={`/TouristSpots/${elem.id}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  alignSelf:"center"
                }}
              >
                <p className='card-name' style={{color:"#F0F0F2", textAlign:"center"}}>{elem.category_name}</p>
              </Link>
              <p className="card-text" style={{color:"#F0F0F2", textAlign:"center"}}>{elem.description}</p>
            </div>
          </div>
          </div>
        </Col>
      ))}
      
    </Row>
    
  </div>
  )
}

export default categories