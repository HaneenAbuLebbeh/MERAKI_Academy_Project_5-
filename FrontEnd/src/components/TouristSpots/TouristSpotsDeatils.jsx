import React, {useState,useEffect, useSyncExternalStore}from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { TextField, Button, Typography, Rating, Box, Paper,Grid, Card, CardContent } from "@mui/material"
import { TbTemperatureCelsius } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { WiDaySunny  } from 'react-icons/wi'; 
import { FaShoppingCart } from 'react-icons/fa'
import HotelIcon from '@mui/icons-material/Hotel'
import MdLocationOnIcon from '@mui/icons-material/LocationOn'; 
import SendSocketMessages from '../Socket/SendSocketMessages';
const TouristSpotsDeatils = () => {
  const isLoggedIn=useSelector((initialState)=> initialState.login.isLoggedIn)
  const userId=useSelector((initialState)=> initialState.login.userId)

  
console.log(userId)
const placeName='Amman'
const {spotname}=useParams()
const [error, setError] = useState({});
const [name, setName] = useState("")
const [comment, setComment] = useState("")
const [rating, setRating] = useState("")

const [spotInfo, setspotInfo] = useState("")
const [message, setMessage] = useState("")
const [spotId, setSpotId] = useState("")
const [weather, setWeather] = useState("")



  const getSpotByName=async()=>{
    try {
      const result = await axios.get(`http://localhost:5000/touristSpot/name/${spotname}`);
      console.log(result.data)

if (result?.data?.success){
  setspotInfo(result?.data?.result)
  setSpotId(result?.data?.result[0].spot_id)
 setFirstName(result?.data?.result[0].firstname)


}}catch (error) {
  if (error.response) {
    return setMessage(error.response?.data.message);
  }
  setMessage("Error happened while Get Data, please try again");
}}
console.log(name)
const [firstName, setFirstName] = useState(name)
useEffect(() => {
  getSpotByName();
}, []);

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}


const handleSubmit=()=>{
  console.log("clicked")
  if (isLoggedIn){
    const newError = {};
    if  (!comment) newError.lastName = "comment is required.";

    if (Object.keys(newError).length) {
      setError(newError);
      return;
    }
    setError({});
const body={
  user_id:userId ,
  spot_id:spotId ,
  comment,
  rating
}
axios.post("http://localhost:5000/review", body)
.then((result) => {
  if (result.status === 200) {
    setSuccessMessage("Your Comment added successful!");
    console.log("comment sent")
    
  }
})
.catch((err) => {
  console.log(err);
  setError({ api: "Comment failed. Please try again." });
});

  } else{
    return console.log("Please login to add comment")
  }
}

console.log(spotInfo[0])

spotInfo[0]?.spot_name
const getWeather = async (city) => {
  const apiKey = 'f6de574895244be8b1db01f15b083a07';
  const url = `https://api.weatherbit.io/v2.0/current?city=Siena &key=${apiKey}`;

  try {
    const response = await fetch(url); 
    const data = await response.json();
    setWeather(data)
    console.log(data); 
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};
useEffect(()=>{
getWeather()
},[])

if (!weather) {
  return <p>Loading weather data...</p>; 
}


const weatherData = weather.data && weather.data[0];


 /* console.log(weather.data[0].weather.description) */
 console.log(weatherData.weather.description)



 


  return (
    <>
    <SendSocketMessages/>
    <iframe 
      width="1440" 
      height="450" 
      src={spotInfo[0]?.virtual_tour_url}
      allowFullScreen
    ></iframe> 
    <Grid container spacing={2}>
      
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Weather</Typography>
              {weatherData ? (
                <>
                  <Typography variant="body1">{weatherData.weather.description}</Typography>
                  <Typography variant="body1">{weatherData.app_temp}°C <TbTemperatureCelsius /></Typography>
                </>
              ) : (
                <Typography variant="body1">Loading...</Typography>
              )}
            </CardContent>
            
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <WiDaySunny size={30} color="#FF9800" />
            </Box>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Site Visits</Typography>
              <Typography variant="body1">Explore the various attractions and points of interest around {spotInfo[0]?.country_spot}.</Typography>
            </CardContent>
            
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <MdLocationOnIcon size={30} color="#4CAF50" />
            </Box>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>E-Commerce</Typography>
              <Button variant="contained" href="#" target="_blank">Shop Now</Button>
            </CardContent>
           
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <FaShoppingCart size={30} color="#2196F3" />
            </Box>
          </Card>
        </Grid>

       
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Book a Stay</Typography>
              <Button variant="contained" href={`https://www.booking.com/searchresults.html?ss=${spotInfo[0]?.country_spot}`} target="_blank">Find Hotels</Button>
            </CardContent>
            
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <HotelIcon  size={30} color="#9C27B0" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    <br />
    <Typography variant="h4">{spotInfo[0]?.country_spot}</Typography>
    <br />
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="body1">{spotInfo[0]?.description}</Typography>
          </Paper>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <img src={spotInfo[0]?.images[0]} alt={spotInfo[0]?.alt_text} style={{ width: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
      <br />

   <h1>Photogallery</h1>
      <ImageList sx={{ width: '100%', height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '15px' }} rowHeight={200} gap={8}>
        {spotInfo[0]&& spotInfo[0].images.map((image, index) => (
          <ImageListItem key={image.id} sx={{ width: 'calc(33.333% - 10px)', height: 'auto' }}>
            <img
              {...srcset(image, 250, 200, 1, 1)}
              alt={image.alt_text}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
               
              }}
              title={image.alt_text}
               position="top"
              actionIcon={
                <IconButton sx={{ color: 'white' }} aria-label={`star ${image.alt_text}`}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>   
      <br/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
          
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" component="h1" align="center" gutterBottom>
                Add Comment
              </Typography>
              <TextField
                label="Comment"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box>
                <Typography variant="subtitle1">Rating</Typography>
                <Rating
                  name="user-rating"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  max={5}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                Save
              </Button>
            </Paper>
          </Box>

         
          <Box sx={{ flex: 1 }}>
            {spotInfo[0] && spotInfo[0].reviews.map((review, index) => (
              <Paper key={index} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h6" component="div">
                  {review.first_name}
                </Typography>
                <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
                  {review.comment}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Rating name={`rating-${index}`} value={review.rating} readOnly />
                  <Typography variant="body2" color="textSecondary">
                    {review.rating} / 5
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>


    </>
  );
};
   




export default TouristSpotsDeatils 
