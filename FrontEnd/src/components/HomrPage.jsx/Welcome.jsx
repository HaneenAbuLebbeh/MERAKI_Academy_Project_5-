import React from 'react'

function Welcome() {
  return (
    <>
   <video autoPlay muted loop className="header-background" style={{ width: "60rem", height: "20rem", alignItems:"center"}}>
          <source src="./src/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </>
  )
}

export default Welcome
