import './assets/css/user-style.css';
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from '../user-components/assets/img/MANDALUYONG-Logo.png';
import brgy from '../user-components/assets/img/brgy.png';
import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import ScrollToTopButton from "./scrolltotop";
import { BiChevronDown } from 'react-icons/bi';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';

function UserNav() {
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
  
  return (
    <>
     {Array.isArray(data) ? (
                            data.map((item, index) => (
                                <div key={index}>
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
                <Link to="/"> <span>BARANGAY HARAPIN ANG BUKAS</span> </Link>
              </li>
              <li className="link"> <NavLink className="link" to="/" activeClassName="active"> Home  </NavLink> </li>
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
                      <h5>{item.firstName} {item.middleName} {item.lastName}</h5>
                    </li>
                    <li>
                      <NavLink className="link" to="/UserProfile" activeClassName="active">
                        <a href="#" className="button">Settings</a>
                      </NavLink>
                    </li>
                    <li>
                      <a href="/login" className="button" onClick={handleSignOut}>Sign Out</a>
                    </li>
                  </ul>
                )}

              </li>
            </ul>
          </nav>
        </div>
      </div>
      </div>
                            ))
                        ) : (
                            <p>No data to display.</p>
                        )}
    </>
  )
}

export default UserNav;
