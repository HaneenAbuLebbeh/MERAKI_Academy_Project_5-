import React, {useState,useEffect, useSyncExternalStore}from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { TextField, Button, Typography, Rating, Box, Paper,Grid, Card, CardContent,Avatar } from "@mui/material"
import { TbTemperatureCelsius } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { WiDaySunny  } from 'react-icons/wi'; 
import { FaShoppingCart } from 'react-icons/fa'
import HotelIcon from '@mui/icons-material/Hotel'
import MdLocationOnIcon from '@mui/icons-material/LocationOn'; 
import SendSocketMessages from '../Socket/SendSocketMessages';
import { FaChartLine, FaStore, FaBed } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const TouristSpotsDeatils = () => {
  const navigate = useNavigate();
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
const [image, setimage] = useState("")
  const getSpotByName=async()=>{
    try {
      const result = await axios.get(`http://localhost:5000/touristSpot/name/${spotname}`);
      console.log(result.data)
if (result?.data?.success){
  setspotInfo(result?.data?.result)
  setSpotId(result?.data?.result[0].id)
 setFirstName(result?.data?.result[0].firstname)
 
 console.log(spotId)
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
}, [[spotId]]);
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}



useEffect(() => {
    
  const fetchUserData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/users/userinfo/${userId}`);
      setimage(response.data.result[0].image); 
      console.log(response)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
if (userId){
fetchUserData();
}
  
}, [userId]);






const handleSubmit=async()=>{
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
try {
  const result = await axios.post("http://localhost:5000/review", body);
  if (result.status === 200) {
    setSuccessMessage("Your Comment added successfully!");
    console.log("comment sent");

    await getSpotByName(); 
    setComment(""); 
    setRating(0); 
  }
} catch (err) {
  console.log(body);
  console.log(err);
  setError({ api: "Comment failed. Please try again." });
}
} else {
console.log("Please login to add comment");
}
};



console.log(spotInfo[0])
spotInfo[0]?.spot_name
const getWeather = async (city) => {
  const apiKey = '1582a3807f8941f587d949d7c830d0db';
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
console.log("spotId",spotId)



  return (
    <>
    <SendSocketMessages/>
    <iframe 
      width="1440" 
      height="450" 
      src={spotInfo[0]?.virtual_tour_url}
      allowFullScreen
    ></iframe> 
<Grid container spacing={3} sx={{ padding: '20px', paddingTop:"8px" }}>
  {[
    {
      title: 'Weather',
      description: 'Stay updated with live weather conditions.',
      content: weatherData
        ? `${weatherData.weather.description}, ${weatherData.app_temp}°C`
        : 'Loading weather data...',
      icon: <WiDaySunny size={50} color="#FF9800" />,
      gradient: 'linear-gradient(135deg, #FFF5E5, #FFD9B2)',
      color: '#FF9800',
    },
    {
      title: 'Site Visits',
      description: 'Monitor visitors count for this location.',
      content: `${spotInfo[0]?.views || 0} visitors this year.`,
      icon: <FaChartLine size={50} color="#4CAF50" />,
      gradient: 'linear-gradient(135deg, #F0FFF4, #C7EED9)',
      color: '#4CAF50',
    },
    {
      title: 'Souvenir Shop',
      description: 'Browse and shop for local souvenirs.',
      content: (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#2196F3',
            color: '#fff',
            '&:hover': { backgroundColor: '#1976D2' },
          }}
          onClick={() => navigate(`/products/${spotId}`)}
        >
          Shop Now
        </Button>
      ),
      icon: <FaStore size={50} color="#2196F3" />,
      gradient: 'linear-gradient(135deg, #E3F4FF, #C0E1FF)',
      color: '#2196F3',
    },
    {
      title: 'Book a Stay',
      description: 'Search and book your perfect stay.',
      content: (
        <Button
          variant="contained"
          href={`https://www.booking.com/searchresults.html?ss=${spotInfo[0]?.country_spot}`}
          target="_blank"
          sx={{
            backgroundColor: '#9C27B0',
            color: '#fff',
            '&:hover': { backgroundColor: '#7B1FA2' },
          }}
        >
          Find Hotels
        </Button>
      ),
      icon: <FaBed size={50} color="#9C27B0" />,
      gradient: 'linear-gradient(135deg, #F7E6FF, #E1C6FF)',
      color: '#9C27B0',
    },
  ].map(({ title, description, content, icon, gradient, color }, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          background: gradient,
          color: color,
          borderRadius: '16px',
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '10px', fontSize: '14px' }}>
            {description}
          </Typography>
          <Typography variant="body1" fontWeight="400" sx={{ fontSize: '16px' }}>
            {content}
          </Typography>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.3)' },
          }}
        >
          {icon}
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>
    <br />



  <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', marginBottom: 2 }}>
  {spotInfo[0]?.country_spot}-{spotInfo[0]?.spot_name}
</Typography>
  
<Grid container spacing={3} sx={{ justifyContent: 'center', px: 2, alignItems: 'stretch' }}>
 
  <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
    <Paper sx={{ padding: 3, borderRadius: '8px', boxShadow: 3, width: '100%', display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
        {spotInfo[0]?.description}
      </Typography>
    </Paper>
  </Grid>
  
  <Grid item xs={12} md={6}>
    <img 
      src={spotInfo[0]?.images[0]} 
      alt={spotInfo[0]?.alt_text} 
      style={{ width: '100%', height: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', objectFit: 'cover' }} 
    />
  </Grid>
</Grid>


<Box
  sx={{
    margin: '0 auto',
    padding: '0 20px',
    maxWidth: '100%',
  }}
>
  <Typography
    variant="h4"
    component="h3" 
    sx={{
      textAlign: 'center', 
      fontWeight: 'bold', 
      color: '#333', 
      marginTop: '40px', 
      marginBottom: '10px', 
    }}
  >
    Photogallery
  </Typography>
  
  <ImageList
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      justifyContent: 'space-between',
    }}
    rowHeight={200}
  >
    {spotInfo[0] && spotInfo[0].images.map((image, index) => (
      <ImageListItem key={image.id} sx={{ flex: '1 1 calc(33.333% - 15px)', maxWidth: 'calc(33.333% - 15px)' }}>
        <img
          {...srcset(image, 250, 200, 1, 1)}
          alt={image.alt_text}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
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
  <br />
</Box>



      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4, px: 2 }}>
          
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
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, backgroundColor: '#FF9401' }}>
                Save
              </Button>
            </Paper>
          </Box>
         
          <Box sx={{ flex: 1 }}>
            {spotInfo[0] && spotInfo[0].reviews.map((review, index) => (
             <Paper key={index} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2, position: 'relative' }}>
             
             <Avatar
               alt="Profile Picture"
               src={review.image || "https://via.placeholder.com/120"} 
               sx={{
                 position: 'absolute',
                 top: 10, 
                 right: 10, 
                 width: 40,  
                 height: 40, 
                 border: "2px solid #D1B28E", 
               }}
             />
            
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