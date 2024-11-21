import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./style.css"
function Footer() {

    
  return (
    <div>
         {/* <!-- Footer --> */}
<footer class="text-center text-lg-start bg-body-tertiary text-muted" >
  {/* <!-- Section: Social media --> */}
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    {/* <!-- Left --> */}
    <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    {/* <!-- Left -->

    <!-- Right --> */}
    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
    
    </div>
    {/* <!-- Right --> */}
  </section>
  {/* <!-- Section: Social media -->

  <!-- Section: Links  --> */}
  <section class="">
    <div class="container text-center text-md-start mt-5">
      {/* <!-- Grid row --> */}
      <div class="row mt-3">
        {/* <!-- Grid column --> */}
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">
          {/* <!-- Content --> */}
          <div className='logo-container' style={{display:'flex',flexDirection:"row", justifyContent:"flex-start",}}>
            <img  src='./src/assets/Logo4.png' style={{width:"20rem", height:"15rem", margin:"0px 0px "}}/>
            
          {/* <p>
            
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p> */}
          </div>
        </div>
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
       
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* <!-- Links --> */}
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Home Page</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Cart</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Market</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Top Spots</a>
          </p>
          
        </div>
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/* <!-- Links --> */}
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p>
            <i class="fas fa-envelope me-3"></i>
            SpotSeekers@gmail.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
          
        </div>
        {/* <!-- Grid column --> */}
      </div>
      {/* <!-- Grid row --> */}
    </div>
  </section>
  {/* <!-- Section: Links  --> */}

  {/* <!-- Copyright --> */}
  <div class="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2024 Copyright
   
  </div>
  {/* <!-- Copyright --> */}
</footer>
</div>
  )
}

export default Footer