import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    email: "",
    password: "",
  });
  const userId=useSelector((initialState)=> initialState.login.userId)
  const [error, setError] = useState(null); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      

      const response = await axios.put(`http://localhost:5000/users/update/${userId}`, formData);
      if (response.status === 200) {
        alert("Account updated successfully!");
        navigate("/profile"); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating account");
    }
  };

 
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/users/userinfo/${userId}`);
        setFormData(response.data.result[0]); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
console.log(formData)
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Account Information
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={formData.lastname}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          margin="normal"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AccountSettings;
