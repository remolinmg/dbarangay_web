import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Map1 from "../user-components/assets/img/MAP.png";
import Map2 from "../user-components/assets/img/MAP2.png";
import Stats from "./stats"
import Community from "./community"
import BrgyOfficials from "./brgy-officials"
import MissionVision from "./mission-vision"
import Footer from "./footer"
import ScrollToTopButton from "./scrolltotop"
import bhall from './assets/img/Rooftop.jpg'
import court from './assets/img/MagalonaCourt.jpg'
import playground from './assets/img/BarangayPlayground.png'
import Faq from "./faq"
import logo from '../user-components/assets/img/MANDALUYONG-Logo.png';
import brgy from '../user-components/assets/img/brgy.png';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';
import { FaUserCircle } from "react-icons/fa";
import '../user-components/assets/css/user-style.css';
import { BiChevronDown } from 'react-icons/bi';

const Landpage = () => {

  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [HomesubmenuVisible, setHomeSubmenuVisible] = useState(false);
  const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [navbarColored, setNavbarColored] = useState(false);
  const [click, setClick] = useState(false)
  
  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    setScrollPosition(currentPosition);
    setNavbarVisible(currentPosition < 200);
    setNavbarColored(currentPosition >= 200);
  };

  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSubmenu = () => {
    setSubmenuVisible(submenuVisible === false ? true : false);
  };

  // const toggleHomeSubmenu = () => {
  //   setHomeSubmenuVisible(!HomesubmenuVisible);
  // };

  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let announceRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!announceRef.current.contains(e.target)) {
        setSubmenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  let profileRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setProfileSubmenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });


  const handleMenuClick = () => {
    setClick(!click);
  };


  const closeMenu = () => setClick(false)
  let boxClassSubMenu = ["sub__menus"];
  if (submenuVisible) {
    boxClassSubMenu.push('sub__menus__Active');
  } else {
    boxClassSubMenu.push('');
  }

  const navigate = useNavigate();
  const handleSignOut = () => {
    document.cookie = 'access_token=; ';
    localStorage.removeItem('jwtToken');
    window.localStorage.clear();
    navigate('/login')
  };

   // DATA FETCHING
   const [data, setData] = useState([]);
   useEffect(() => {
     fetchData(); // Fetch initial data when the component mounts
   }, []);
  
   const fetchData = async () => {
     try {
       const token = Cookies.get('access_token');
       if (token) { 
       const decoded =jwtDecode(token);
         const _id = decoded.id;
         const response = await axios.get(`https://dbarangay.onrender.com/get/userprofile/${_id}`);
         setData(response.data);
       }
     } catch (error) {
       console.error(error);
     }
   };
  const homeRef = useRef(null);
  const containerStyle = {
    backgroundColor: '#0060AD',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px'

  };

  const textSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: '40px',
  };

  const imageSectionStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  };

  const aboutTextStyle = {
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'left',
  };

  const bigTextStyle = {
    fontSize: '24px',
    textAlign: 'left',
  };

  const carouselItemStyle = {
    width: '50rem',
    height: '50rem'
  }

  const logoStyle = {
    width: '130px',
    height: '130px',
    marginLeft: '20px',
    marginRight: '20px'
  }


  return (
    <>
       
      <div className={`App ${navbarVisible ? "transparent" : ""} ${navbarColored ? "colored" : ""} container-fluid`}>
        <div className="hero">
          <nav className="navbar-content">
            <div className="menu-icon" onClick={handleMenuClick}>
              <div className={click ? "bar1 bar" : "bar"}></div>
              <div className={click ? "bar2 bar" : "bar"}></div>
              <div className={click ? "bar3 bar" : "bar"}></div>
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>

              <li className="link">
                <Link to="/homepage"> <span>BARANGAY HARAPIN ANG BUKAS</span> </Link>
              </li>
              <li className="link"> <NavLink className="link" to="/homepage" activeClassName="active"> Home  </NavLink> </li>
              <li onClick={toggleSubmenu} className="link" ref={announceRef}>
                Announcement <BiChevronDown />
                {submenuVisible && (
                  <ul className="submenu">
                    <li className="link"><NavLink className="link" to="/Announcement" activeClassName="active" style={{ fontSize: '18px' }}> General  </NavLink></li>
                    <li className="link"> <NavLink className="link" to="/business" activeClassName="active" style={{ fontSize: '18px' }}> Businesses </NavLink></li>
                    <li className="link"> <NavLink className="link" to="/Livelihood" activeClassName="active" style={{ fontSize: '18px' }}> Livelihood </NavLink></li>
                  </ul>
                )}
              </li>

              <li className="link"> <NavLink className="link" to="/Service" activeClassName="active"> Services</NavLink> </li>
              <li className="link"> <NavLink className="link" to="/Evacuation" activeClassName="active"> Evacuation</NavLink> </li>

              {/* ---------------------------------------------  PROFILE SUBMENU ---------------------------------- */}
              <li onClick={toggleProfileSubmenu} className="link" ref={profileRef}>
                <FaUserCircle className="user-icon" />
                {ProfilesubmenuVisible && (
                  <ul className="Profilesubmenu">
                    <li className="profile-info">
                      <FaUserCircle className="profile-icon" />
                    </li>
                  
                    <li>
                      <NavLink className="link" to="/Login" activeClassName="active">
                        <a href="#" className="button">Login</a>
                      </NavLink>
                    </li>
                  </ul>
                )}

              </li>
            </ul>
          </nav>
        </div>
      </div>
    

      <div ref={homeRef} className="section1 text-center" id='home'>
        <div id="homelogo">
          <img src={brgy} style={logoStyle}/>
          <img src={logo} style={logoStyle}/>
        </div>
        <div id="titlecontainer">
          <h1 id="title" className="text-white">Welcome to Barangay Harapin ang Bukas</h1>
        </div>
        <div id="quotecontainer">
          <blockquote id="quote"><i>Know everything about the barangay and the services available</i></blockquote>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-evenly container-fluid" style={containerStyle}>
        <div id="carouselExampleControls" class="carousel slide w-100" data-bs-ride="carousel">
          <div class="carousel-inner p-5">
            <div class="carousel-item active w-100">
              <div className="d-flex flex-row justify-content-evenly align-self-center">
                <div className="d-flex flex-column align-self-center justify-content-center">
                  <h1 class="carousel-title" >MAP</h1>
                  <p class="carousel-desc">If you are wondering about the location of the barangay.</p>
                </div>
                <div class="map1">
                  <img src={Map1} class="d-block w-100" alt="..." style={{ height: "200px", width: "200px" }} />
                </div>
              </div>
            </div>
            <div class="carousel-item align-self-center">
              <div className="d-flex flex-row justify-content-evenly align-self-center">
                <div className="d-flex flex-column align-self-center justify-content-center">
                  <h1 class="carousel-title">MAP</h1>
                  <p class="carousel-desc">If you are wondering about the location of the barangay.</p>
                </div>
                <div class="map2">
                  <img src={Map2} class="d-block w-100" alt="..." style={{ height: "200px", width: "200px" }} />
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-info" className="d-flex flex-row justify-content-evenly">
                <Stats />
              </div>
            </div>
            <div class="carousel-item">
              <div class="carousel-info"  className="d-flex flex-row justify-content-evenly">
                <Community />
              </div>
            </div>

          </div>
          <button class="carousel-control-prev justify-content-start" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next justify-content-end" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <BrgyOfficials />
      <MissionVision />
      <ScrollToTopButton />
      <Faq />
    </>

  );
};

export default Landpage;