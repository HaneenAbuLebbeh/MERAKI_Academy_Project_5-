import {React,useState,useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { Container, Row, Col } from "react-bootstrap";
import "./style.css"

const categories = () => {
  const isLoggedIn=useSelector((initialState)=> initialState.login.isLoggedIn)
  const [message, setMessage] = useState("")
  const [error, setError] = useState({});
  const [category, setCategory] = useState();
  const LoadingSpinner = () => {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> 1
  
      </div>
    );
  };
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
      <div className="container">
        {message && <p className="error-message">{message}</p>} 
  
        {category === null ? (
          <LoadingSpinner /> 
        ) : (
          <Row>
            {category?.map((elem) => (
              <Col key={elem.id} xs={12} md={4} lg={3}>
                <div className="mb-2 image-container">
                  <div className="card" style={{ width: "20rem", height: "22rem", backgroundColor: "#BEBEC0" }}>
                    <img
                      src={elem.image_url}
                      className="card-img-top"
                      style={{ width: "20rem", height: "16rem" }}
                      alt={elem.category_name} // Add alt text for accessibility
                    />
                    <div className="card-body ">
                      <Link className="mx-auto" to={`/TouristSpots/${elem.id}`} style={{ textDecoration: "none", color: "white", fontWeight: "bold", alignSelf: "center" }}>
                        <p className="card-name" style={{ color: "#F0F0F2", textAlign: "center" }}>{elem.category_name}</p>
                      </Link>
                      <p className="card-text" style={{ color: "#F0F0F2", textAlign: "center" }}>{elem.description}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  };

export default categories