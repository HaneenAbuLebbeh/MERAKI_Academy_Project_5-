import {React, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import "./style.css"
// import {Input} from '@mui/joy/Input';
import Box from "@mui/material/Box";
import axios from 'axios';

const Welcome = ()=> {
  const [searchInput, setSearchInput] = useState("");
  const [spotId, setSpotId]=useState()
  const navigate = useNavigate();
  const handleSearch = async () => {
 

  
    try {
      const result =  await axios.get(`http://localhost:5000/touristspot/name/${searchInput}`); 
     
   
    
      if (result?.data?.success) {

        console.log("Search results:", result.data.result);
        setSearchInput(result.data.result);
        setSpotId(result.data.result.category_id)
        console.log(spotId);
        
        navigate(`/TouristSpots/${spotId}/TouristSpots-Detailes/${searchInput}`)
       
      } else {
        console.error("Search error:", data.message);
        setSearchInput("Search not Found")
      }
    } catch (error) {
      console.error("Search failed:", error);
      
    }
  };
  
  return (
    <>
    {/* Search box*/}
    <div className="header-content">
          <h1>Where do you want to travel?<br/>
          <span className='text'>
            Start Your Virtual Tour</span></h1>
          <div className="search-bar">
              <input id="searchInput" placeholder="Search for a place..." onChange={(e)=>{setSearchInput(e.target.value)}}/>
              <button id="searchButton" onClick={() => handleSearch()}>Search</button>
          </div>
    </div>

    
  

        
  <Carousel className='carousel' fade   style={{ width: '100%',marginBottom:"2px",}} >
      <Carousel.Item  interval={5000}>
      <video autoPlay muted loop className="header-background"  style={{ width: "100vw", height: "65vh", margin: "0 auto" }}>
          <source src="./src/assets/vid4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Carousel.Caption>
        <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {/* <Input placeholder="Search in here…" variant="solid"  style={{backgroundColor: "transparent"}}/> */}
    </Box>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <video autoPlay muted loop className="header-background" style={{ width: "100vw", height: "65vh", margin: "0 auto" }}>
          <source src="./src/assets/vid3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Carousel.Caption>
        <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {/* <Input placeholder="Search in here…" variant="soft"  style={{backgroundColor: "transparent"}}/> */}
    </Box>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <video autoPlay muted loop className="header-background" style={{ width: "100vw", height: "65vh", margin: "0 auto" }}>
          <source src="./src/assets/v2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Carousel.Caption>
        <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      {/* <Input placeholder="Search in here…" variant="plain"  style={{backgroundColor: "transparent"}}/> */}
    </Box>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      <video autoPlay muted loop className="header-background" style={{ width: "100vw", height: "65vh", margin: "0 auto" }}>
          <source src="./src/assets/vid6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Carousel.Caption>
        <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      
    </Box>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    {/* <div>{searchInput}</div> */}
    
    </>
  )
}
export default Welcome