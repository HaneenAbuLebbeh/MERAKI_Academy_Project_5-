import React, { useContext ,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom'
import axios from "axios"
import { setLogin,setUserId } from '../../Redux/reducers/login';
import { Container, Card, CardContent, TextField, Button, Typography } from '@mui/material'
import {Grid} from'@mui/material'
 import loginImage from "../assets/login.pic.jpeg" 
 import { GoogleLogin } from '@react-oauth/google';
 import { GoogleOAuthProvider } from '@react-oauth/google';/****/

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
  setTimeout(() => navgite("/"), 2000); 
  

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
      navigate(res.data.isAdmin ? "/adminPanel" : "/");
    })
    .catch((err) => {
      setError({ api: "Google login failed. Please try again." });
    });
};


  return (
  <GoogleOAuthProvider clientId="480182998123-4qcfjj4047u2nbrf00d5mbtv8m5k5bsv.apps.googleusercontent.com"> 

    <Container component="main" maxWidth="md" className="login-container">
    <Card className="login-card"> 
      <Grid container>
        <Grid item xs={12} sm={6} className="image-section">
          <img src={loginImage} alt="Car" className="login-image" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              Login to Your Account
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
                />
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
                />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={loginButton}
              
            >
              Login
            </Button>
            {successMessage && (
                  <Typography variant="body2" color="green" style={{ marginTop: '10px' }}>
                    {successMessage}
                  </Typography>
                )}
            <p>Dont have an account?</p>
      <Button onClick={()=>{
        navgite("/Register")
      }}>Create account</Button>

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