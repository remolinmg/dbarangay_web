import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
import {
  BsPersonFill,
  BsMegaphoneFill,
  BsTelephoneFill,
  BsTerminal,
  BsFillFileEarmarkFill,
  BsFillPersonBadgeFill,
  BsFillFileEarmarkArrowDownFill,
  BsFillPeopleFill,
  BsEnvelopePaper,
  BsBuildingFillUp,
  BsMailbox
} from "react-icons/bs";
import {
  RiFolderWarningFill,
} from "react-icons/ri";

import 'bootstrap/dist/css/bootstrap.css';
import { FaUserCircle } from "react-icons/fa";


function BpromotionAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [inputValues, setInputValues] = useState({
    BusinessName: "",
    TypeOfBusiness: "",
    BusinessHours: "",
    Address: "",
    ContactNumber: "",
    GALLERY: "",
  });

  // SUBMIT FUNCTION
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', inputValues);
    setInputValues({
      BusinessName: "",
      TypeOfBusiness: "",
      BusinessHours: "",
      Address: "",
      ContactNumber: "",
      GALLERY: "",


    });
    setIsSubmitted(true);
    setShowForm(false);
  };

  //   DISCARD FUNCTION
  const handleDiscard = () => {
    setInputValues({
      BusinessName: "",
      TypeOfBusiness: "",
      BusinessHours: "",
      Address: "",
      ContactNumber: "",
      GALLERY: "",

    });
    setShowForm(false);
  };


  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);



  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const profileRef = useRef(null);
  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };

  return (
    <>
      <div className="topbarsection">
        <div className="topnavbar d-flex justify-content-between align-items-center">
          <div className="topnavleft">
            <button className="collapse-button" onClick={handleSidebarCollapse}>
              <BiMenu />
            </button>
          </div>
          <div className="topnavmid">
            <h3>Barangay Harapin Ang Bukas</h3>
          </div>
          <div className="topnavright">
            <div ref={profileRef}>
              <FaUserCircle className="adminicon" onClick={toggleProfileSubmenu} />
              {ProfilesubmenuVisible && (
                <div className="Profilesubmenuadmin">
                  <div className="admininfo">
                    <div className="rightprofile">
                      <FaUserCircle className="adminprofile" />
                    </div>
                    <div className="leftprofile">
                      <h5>CLARISE ANNELY</h5>
                      <h5>clariseannely@gmail.com</h5>
                    </div>
                  </div>
                  <div className="lowerprofile">
                    <div className="button-profile1">
                      <NavLink to="/admin-profile" activeClassName="active">
                        <div href="#" className="profilebuttons">
                          <BiCog className="profileicons" /> Settings
                        </div>
                      </NavLink>
                    </div>
                    <hr />
                    <div className="button-profile1">

                      <NavLink to="/admin" activeClassName="active">
                        <div href="#" className="profilebuttons">
                          <BiLogOut className="profileicons" /> Log out
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <div className={`containersidebar ${isSidebarCollapsed ? 'collapsed' : ''} d-none d-md-block`}>
        <div className="newsidebar">
          <div className="text-center">
            <Link className="navbar-brand" to="/dashboard">
              <img className="tblImage w-50 h-100" src={logo} alt="" />
            </Link>
            <h6>Barangay Harapin Ang Bukas</h6>
          </div>
          <ul>

            <li>
              <Link to="/dashboard" className="nav-link ">
                <AiOutlineDashboard className="sidebaricon " />
                <span className="sidebarlabel ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/announcement-admin" className="nav-link ">
                <BsMegaphoneFill className="sidebaricon" />
                <span className="sidebarlabel ms-1 d-none d-sm-inline">Announcement</span>
              </Link>
            </li>
            <li>
              <Link to="/emergency-admin" className="nav-link ">
                <BsTelephoneFill className="sidebaricon" />
                <span className="sidebarlabel ms-1 d-none d-sm-inline">Emergency</span>
              </Link>
            </li>
            {/* <li className={`dropdown-sidebar ${isDropdownOpen ? 'open' : ''}`}> */}
            <li className="dropdown-sidebar">
              <Link to="" className="nav-link ">
                <div className="barangaymodule">
                  <span onClick={toggleDropdown}>
                    <BsFillFileEarmarkFill className="sidebaricon" />
                    <span className="sidebarlabel ms-1">
                      Barangay Module <BiChevronDown />
                    </span>
                  </span>
                </div>
              </Link>
              {/* <ul className="sidebar-submenu"> */}
              <ul className={`sidebar-submenu w-100 ${isDropdownOpen ? 'open' : ''}`}>
                {isDropdownOpen && (
                  <>
                    <li>
                      <Link to="/b-officials-admin" className="nav-link ">
                        <BsFillPersonBadgeFill className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline"> Barangay Officials</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/d-barangay-certificate" className="nav-lin">
                        <BsFillFileEarmarkArrowDownFill className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline"> Document Requests</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/blotter-admin" className="nav-link ">
                        <RiFolderWarningFill className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline"> Blotter Records</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/residents-admin" className="nav-link">
                        <BsFillPeopleFill className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Residents Info</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/b-permit-admin" className="nav-link">
                        <BsEnvelopePaper className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Business Permit</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/b-promotion-admin" className="nav-link">
                        <BsBuildingFillUp className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Business Promotion</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/feedbacks-admin" className="nav-link">
                        <BsMailbox className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Feedbacks</span>

                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className={`${isDropdownOpen ? 'hide' : ''}`}>
              <Link to="/staff-logs-admin" className="nav-link">
                <BsTerminal className="sidebaricon" />
                <span className="sidebarlabel ms-1 d-none d-sm-inline">Staff Logs</span>
              </Link>
            </li>
            <li className={`${isDropdownOpen ? 'hide' : ''}`}>
              <Link to="/admin-accounts" className="nav-link">
                <BsPersonFill className="sidebaricon" />
                <span className="sidebarlabel ms-1 d-none d-sm-inline">Admin Accounts</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`business-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div class="pagetitle">
          <h1> Promote Business  </h1>
        </div>
        <main id="main" class="main">
          <section class="section">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-md-flex justify-content-between align-items-center">
                      <h5 class="card-title">Promote Business</h5>
                      <form class="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                        <button type="submit" title="Search"><i class="bi bi-search"></i></button>
                      </form>
                    </div>

                    <div class="search-bar d-flex justify-content-between pt-2">
                      <p>Brgy. Harapin ang Bukas</p>
                      <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                    </div>

                    <table class="table caption-top">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Business Name</th>
                          <th scope="col">Business Hours</th>
                          <th scope="col">Address</th>
                          <th scope="col">Contact Number</th>
                          <th scope="col">Gallery</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Business</td>
                          <td>10:00AM - 8:00PM</td>
                          <td>address</td>
                          <td>09876543210</td>
                          <td>img.jpg</td>
                          <td>
                            <div class='gap-2 d-md-flex justify-content-start align-items-center'>
                              <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                              <form method='post' action=''>
                                <input type='hidden' name='id' value="" />
                                <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* POP-UP FORMS */}
              {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={handleSubmit}>
                      <div className="certificate">
                        <h2 className="certificate-title">PROMOTE BUSINESS </h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="BusinessName">BUSINESS NAME</label>
                            <input
                              type="text"
                              id="BusinessName"
                              name="BusinessName"
                              value={inputValues.BusinessName}
                              onChange={handleInputChange}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="BusinessType"> Type of Business </label>
                            <input
                              type="text"
                              id="BusinessType"
                              name="BusinessType"
                              value={inputValues.BusinessType}
                              onChange={handleInputChange}
                              className="form-control"
                              required /> </div>

                          <div className="form-group">
                            <label htmlFor="BusinessHours">Business Hours</label>
                            <input
                              type="text"
                              id="BusinessHours"
                              name="BusinessHours"
                              value={inputValues.BusinessHours}
                              onChange={handleInputChange}
                              className="form-control"
                              required /></div>



                          <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input
                              type="text"
                              id="Address"
                              name="Address"
                              value={inputValues.Address}
                              onChange={handleInputChange}
                              className="form-control"
                              required /></div>


                          <div className="form-group">
                            <label htmlFor="ContactNumber">Contact Number</label>
                            <input
                              type="text"
                              id="ContactNumber"
                              name="ContactNumber"
                              value={inputValues.ContactNumber}
                              onChange={handleInputChange}
                              className="form-control"
                              required /></div>



                          <div className="form-group">
                            <label htmlFor="InsertImage">Insert Images Here</label>
                            <input
                              type="file"
                              id="InsertImage"
                              name="InsertImage"
                              value={inputValues.InsertImage}
                              onChange={handleInputChange}
                              className="form-control"
                              required /></div>

                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">Submit </button>
                            <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </section>

          {isSubmitted && (
            <div className="success-message">
              <p>You have successfully submitted a request!</p>
            </div>
          )}

        </main>
      </div>


    </>
  );
}

export default BpromotionAdmin;
