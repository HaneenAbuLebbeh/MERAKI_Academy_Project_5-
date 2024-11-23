import React ,{useState,useEffect}from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
/* import Link from '@mui/joy/Link'; */
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios'
import Grid from '@mui/joy/Grid'
import { useDispatch, useSelector } from "react-redux";
/* import { useTheme } from '@mui/material/styles' */
import { useParams,Link } from 'react-router-dom'



const TouristSpots = () => {
 /*  const theme = useTheme() */
 const { categoryId } = useParams()
 console.log(categoryId)
const [categoryList, setCategoryList] = useState("")
const [weather, setWeather] = useState({})
const [temp, setTemp] = useState([])
/* const categoryId=11 */
const userId=useSelector((initialState)=> initialState.login.userId)
const getSpotsByCategoryId=async()=>{
  try {
    const result = await axios.get(`http://localhost:5000/touristSpot/${categoryId}`);
    console.log(result.data)

if (result?.data?.success){
setCategoryList(result?.data?.result)
console.log(result.data.result)


}}catch (error) {
  console.log(error)
if (error.response) {
  return setMessage(error.response?.data.message);
}
setMessage("Error happened while Get Data, please try again");
}}

const getWeather = async (city) => {
  const apiKey = 'f6de574895244be8b1db01f15b083a07';
  const url = `https://api.weatherbit.io/v2.0/current?city=${city} &key=${apiKey}`;

  try {
    const response = await fetch(url); 
    const data = await response.json();
    setWeather((prevData)=>({
...prevData , [city]:data
    }))
  
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};


useEffect(() => {
  getSpotsByCategoryId();
}, []);


console.log(categoryList)
useEffect(() => {
  categoryList&&categoryList.forEach((spot) => {
    if (spot.spot_name && !weather[spot.spot_name]) {
      getWeather(spot.spot_name); 
    }
  });
}, [categoryList, weather]);
console.log(weather)

const addToFavourite=(spotId)=>{
const body={
  spot_id: spotId ,
  user_id:userId
}
axios.post("http://localhost:5000/favourite/add", body ).then((result)=>{
  console.log("spot added successfully")
}).catch((err)=>{
  console.log(err)
})


}

console.log(userId)













  return (
    <>
      <Grid container spacing={2}>
      {categoryList &&
        categoryList.map((elem, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card variant="outlined" sx={{ width: '100%' }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={elem.image_url} 
                    alt={elem.spot_name || 'Tourist spot'}
                  />
                </AspectRatio>
                <IconButton
                onClick={()=>{addToFavourite(elem.id)}}
                  aria-label="Like minimal photography"
                  size="md"
                  variant="solid"
                  color="danger"
                  sx={{
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    right: '1rem',
                    bottom: 0,
                    transform: 'translateY(50%)',
                  }}
                >
                  <Favorite />
                </IconButton>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">
                  <Link to={`TouristSpots-Detailes/${elem.spot_name}`} overlay underline="none">
                    {elem.spot_name} 
                  </Link>
                </Typography>
                <Typography level="body-sm">
                {elem.country_spot}
                </Typography>
              </CardContent>
              <CardOverflow variant="soft">
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography level="body-xs">{elem.views } views</Typography>
                  <Divider orientation="vertical" />
                  
                  <Typography level="body-xs">
                    {weather[elem.spot_name] ? (
                     
                      `Weather: ${weather[elem.spot_name]?.data[0]?.app_temp}°C`
                    ) : (
                      'Loading weather...'
                    )}
                  </Typography>
                </CardContent> 
              </CardOverflow>
            </Card>
          </Grid>
        ))}
    </Grid>  
    
    
    
    </>
  )
}
 
export default TouristSpots 