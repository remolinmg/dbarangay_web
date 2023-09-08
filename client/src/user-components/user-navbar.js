import './assets/css/user-style.css';
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from '../user-components/assets/img/MANDALUYONG-Logo.png';
import Bot from './faqbot.js';
import { Link, NavLink, Route } from 'react-router-dom';
import ScrollToTopButton from "./scrolltotop";


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

  const toggleHomeSubmenu = () => {
    setHomeSubmenuVisible(!HomesubmenuVisible);
  };

  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


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


  return (
    <>
      <div className={`App ${navbarVisible ? "transparent" : ""} ${navbarColored ? "colored" : ""} container-fluid`}>
        {/* <ScrollToTopButton /> */}
        <div className="hero">
          <nav className="navbar-content">
            <div className="menu-icon" onClick={handleMenuClick}>
              <div className={click ? "bar1 bar" : "bar"}></div>
              <div className={click ? "bar2 bar" : "bar"}></div>
              <div className={click ? "bar3 bar" : "bar"}></div>
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>

              <li className="link">
                <img
                  src={logo}
                  alt="logo"
                  object-fit="cover"
                  width="40px"
                  height="40px"
                />
                <Link to="/./"> <span>BARANGAY HARAPIN ANG BUKAS</span> </Link>
              </li>
              <li onClick={toggleHomeSubmenu} className="link">
                Home
                {HomesubmenuVisible && (
                  <ul className="Homesubmenu">
                    <li className="link"> <NavLink className="link" to="/./" activeClassName="active"> Home </NavLink> </li>
                    <a className="link" href='#officials' onClick={closeMenu}>Officials</a>
                    <a className="link" href='#missionVision' onClick={closeMenu}>Mission Vision</a>
                    <a className="link" href='#feedback' onClick={closeMenu}>Feedback</a>
                  </ul>
                )}
              </li>
              <li onClick={toggleSubmenu} className="link">
                Announcement
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
              <li onClick={toggleProfileSubmenu} className="link">
                <FaUserCircle className="user-icon" />
                {ProfilesubmenuVisible && (
                  <ul className="Profilesubmenu">
                    <li className="profile-info">
                      <FaUserCircle className="profile-icon" />
                    </li>
                    <li>
                      <h5>CLARISE ANNELY</h5>
                    </li>
                    <li>
                      <h6>Summary of Request</h6>
                    </li>
                    <li>
                      <div className="request-summary">
                        <div className="column">
                          <p>Date</p>
                          <p>May 10, 2023</p>
                          <p>May 2, 2023</p>
                          <p>April 26, 2023</p>
                        </div>
                        <div className="column">
                          <p>Document</p>
                          <p>Barangay Clearance</p>
                          <p>Barangay Permit</p>
                          <p>Barangay ID</p>
                        </div>
                        <div className="column">
                          <p>Status</p>
                          <p className="sample-status">Requested</p>
                          <p className="sample-status-denied">Denied</p>
                          <p className="sample-status-claimed">Claimed</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <NavLink className="link" to="/UserProfile" activeClassName="active">
                        <a href="#" className="button">Settings</a>
                      </NavLink>
                    </li>
                    <li>
                      <a href="#" className="button">Sign Out</a>
                    </li>
                  </ul>
                )}

              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <Bot /> */}
    </>
  )
}

export default UserNav;
