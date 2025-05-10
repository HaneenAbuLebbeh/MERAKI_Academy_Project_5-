import React, { useContext ,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Container, Card, CardContent, TextField, Button, Typography } from '@mui/material'
import {Grid} from'@mui/material'
 import loginImage from "../../assets/login.pic.jpeg" 
 import { GoogleLogin } from '@react-oauth/google';
 import { GoogleOAuthProvider } from '@react-oauth/google';/****/
 import {setLogin,setUserId} from "../../../Redux/reducers/login"
 import "./style.css"
 import { AiOutlineLogin } from "react-icons/ai";
//hello there 
 // Log in with email and password
const Login = ({ isOpen, onClose }) => {
    const isLoggedIn=useSelector((initialState)=> initialState.login.isLoggedIn)
const navgite=useNavigate()
const dispatch= useDispatch()
const [password , setpassword]= useState("")
const [email , setemail]= useState("")
const [error, setError] = useState({});
const [successMessage, setSuccessMessage] = useState("")

const loginButton=()=>{
  console.log("Login button clicked")
  const newError = {};

  if (!email) newError.email = "Email is required.";
  if (!password) newError.password = "Password is required.";

  
  if (Object.keys(newError).length) {
    setError(newError);
    return;
  }

  setError({});

setpassword(password)
setemail(email)

const body={
  email:email , 
  password: password
}
axios.post("http://localhost:5000/users/login", body ,).then((result)=>{
  console.log(result)
  dispatch(setLogin(result.data.token))
  dispatch(setUserId(result.data.userId))
  setSuccessMessage("Login successful! Redirecting to Homepage...");
  /* setTimeout(() => navgite("/"), 2000); 
  navgite(res.data.isAdmin ? "/Admin/dashbored" : "/"); */
  console.log(result.data.isAdmin)
  if (result.data.isAdmin){
    setTimeout(() => navgite("/Admin/dashbored"), 2000)
  } else {
    setTimeout(() => navgite("/"), 2000); 
  }

}).catch((err)=>{
  console.log(err)
  setError({ api: "Login failed. Please try again." });
})}


// log in with Google
const handleGoogleLogin = (credentialResponse) => {
  const token = credentialResponse.credential;
  axios.post("http://localhost:5000/users/google-login", { idToken: token })
    .then((res) => {
      dispatch(setLogin(res.data.token));
      dispatch(setUserId(res.data.userId));
      navgite(res.data.isAdmin ? "/Admin/dashbored" : "/");
    })
    .catch((err) => {
      setError({ api: "Google login failed. Please try again." });
    });
};


  return (
    <GoogleOAuthProvider clientId="39413300053-q0n8cd5pp9acdci0dtbdacvqfj4qn1sp.apps.googleusercontent.com"> 
    <Container component="main" maxWidth="md" className="login-container">
      <Card className="login-card"> 
        <Grid container>
          <Grid item xs={12} sm={6} className="image-section">
            <img src={loginImage} alt="Car" className="login-image" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                style={{ fontFamily: 'Roboto', fontWeight: '500', marginBottom: '20px' }}
              >
                Login To Your Account  <AiOutlineLogin />
              </Typography>
  
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                error={!!error.email}
                helperText={error.email}
                style={{ marginBottom: '15px' }}  />
              
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                error={!!error.password}
                helperText={error.password}
                style={{ marginBottom: '20px' }}  
              />
              
              <Button
                variant="contained"
                style={{ backgroundColor: '#FF9401', marginBottom: '20px' }}  
                fullWidth
                onClick={loginButton}
              >
                Login
              </Button>
  
              {successMessage && (
                <Typography variant="body2" color="green" style={{ marginTop: '10px', marginBottom: '20px' }}>
                  {successMessage}
                </Typography>
              )}
  
              <h5 style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: '80', marginBottom: '10px' }}>
                Don't have an account?
              </h5>
  
              <Button
                style={{
                  color: '#FF9401',
                  fontWeight: 'bolder' ,
                  display: 'block',
                  margin: '0 auto',
                  marginBottom: '20px', 
                }}
                onClick={() => navgite("/Register")}
              >
                Join us from here
              </Button>
  
              <GoogleLogin 
                onSuccess={handleGoogleLogin} 
                onError={() => setError({ api: "Google login failed. Please try again." })} 
              />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  </GoogleOAuthProvider>
  
  )
}

export default Login