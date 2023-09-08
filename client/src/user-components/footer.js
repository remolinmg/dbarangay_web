import React from 'react';
import { FaTwitter,
  FaFacebook,
  FaInstagramSquare,
  FaHome,
  FaEnvelope
} from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const emailLinkStyle = {
    color: '#0060AD',
    textDecoration: 'none',
  };
 
  return (
   
  
      <footer
              class="text-center text-lg-start text-white container-fluid col-sm-12"
              style={{backgroundColor: "#fffff"}}
              >
   
        <div class="container p-4 pb-0">
     
          <section class="text-dark">
        
            <div class="row">
            
              <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">
                  Barangay Harapin Ang Bukas
                </h6>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit quam id dolor malesuada, am ipsum dolor sit amet, consectetur adipiscit hendrerit ligula bibendum.
                </p>
              </div>
        
    
              <hr class="w-100 clearfix d-md-none" />
    
             
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
                <p class="mb-1">
                  <Link to="/announcement">
                  <a >Announcement</a>
                  </Link>
                </p>
               
                <p class="mb-1 ">
                <Link to="/business">
                  <a >Businesses</a>
                  </Link>
                </p>
                <p class="mb-1">
                <Link to="/evacuation">
                  <a >Evacuation</a>
                  </Link>
                </p>
                <p class="mb-1">
                <Link to="/livelihood">
                  <a >Livelihood</a>
                  </Link>
                </p>
                <p class="mb-3">
                <Link to="/service">
                  <a >Services</a>
                  </Link>
                </p>
              </div>
              
    
              <hr class="w-100 clearfix d-md-none" />
    
        
              <hr class="w-100 clearfix d-md-none" />
    
          
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><i class="mr-3"><FaHome /></i> 204 Daang Bakal Street, Harapin Ang Bukas, Mandaluyong City</p>
                <p><i class="mr-3"><FaEnvelope /></i>  <a href="mailto:harapinangbukas@gmail.com" style={emailLinkStyle}>
          harapinangbukas@gmail.com
        </a></p>
                
              </div>
            
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Follow us</h6>
    
                <a
                   class="btn btn-primary btn-floating m-1"
                   style={{backgroundColor: "#3b5998"}}
                   href="https://www.facebook.com/harapinangbukas"
                   target="_blank"
                   role="button"
                   ><i><FaFacebook /></i
                  ></a>
              </div>
            </div>
        
          </section>
        
        </div>
    
    
      
       
       
      </footer>
      
 
   
  );
};

export default Footer;