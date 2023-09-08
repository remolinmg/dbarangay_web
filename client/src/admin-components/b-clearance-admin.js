import { Link, NavLink, Route } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import Axios from 'axios';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';

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



function BclearanceAdmin() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); };

  //   DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); };

  //  ------------------------------ SIDEBAR COLLAPSED ------------------------------

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileSubmenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const [editresidentName, setEditresidentName] = useState('');
  const [editaddress, setEditaddress] = useState('');
  const [editreason, setEditreason] = useState('');
  const [editdate, setEditdate] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);


  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditresidentName(rowData.residentName);
    setEditaddress(rowData.address);
    setEditreason(rowData.reason);
    setEditdate(rowData.date);
    setSelectedRowId(rowData.id);
    // setShowEditForm(true);
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
        <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
          <div className="row w-75">
            <div className="col-md-4 ">
              <form className="input-group d-flex align-items-center">
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-btn" />
                <div className="input-group-append">
                  <button className="btn btn-primary mt-2" type="submit" id="search-btn">icon</button>
                </div>
              </form>
            </div>

            <div className="col-md-4">
              <div class="dropdown-center mt-2">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown button</button>

                <ul class="dropdown-menu">
                  <Link to="/b-permit-admin">
                    <li><a class="dropdown-item">Business Permit</a></li></Link>
                  <Link to="/b-clearance-admin">
                    <li><a class="dropdown-item">Business Clearance</a></li></Link>

                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <select className="form-control">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="pagetitle">
          <h1> Barangay Clearance  </h1>
        </div>
        <main id="main" class="main">
          <section class="section">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="d-md-flex justify-content-between align-items-center">
                      <h5 class="card-title">Barangay Clearance</h5>
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
                          <th scope="col">Resident Name</th>
                          <th scope="col">Address</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {bClearanceTbl.map((val) => {
                          return <tr>
                            <th scope="row">{val.id}</th>
                            <td>{val.residentName}</td>
                            <td>{val.address}</td>
                            <td>{val.reason}</td>
                            <td>{format(new Date(val.date), 'yyyy-mm-dd')}</td>
                            <td>
                              <div class="mb-3">
                                <select type="text" id="Role" name="Role" class="form-control">
                                  <option className="text-center" value="">New</option>
                                  <option className="text-center" value="ongoing">On Process</option>
                                  <option className="text-center" value="processed">Done</option>
                                </select>
                              </div>
                            </td>
                            <td>
                              <div class='gap-2 d-md-flex justify-content-start align-items-center'>
                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit </button>
                                <form method='post' action=''>
                                  <input type='hidden' name='id' value="" />
                                  <button class='btn btn-outline-danger' type='submit' name='deleteRow'
                                    >Delete</button>
                                </form>
                              </div>
                            </td>
                          </tr>
                        })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* POP-UP FORMS */}
              {/* {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={submitReq}>
                      <div className="certificate">
                        <h2 className="certificate-title">ADD CLEARANCE </h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="ResidentName">Resident Name</label>
                            <input
                              type="text"
                              id="ResidentName"
                              name="ResidentName"
                              onChange={(e) => {
                                setResidentName(e.target.value);
                              }}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Purpose">Address</label>
                            <input
                              type="text"
                              id="Purpose"
                              name="Purpose"
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              className="form-control"
                              required /> </div>

                          <div className="form-group">
                            <label htmlFor="Address">Reason of Request</label>
                            <input
                              type="text"
                              id="Address"
                              name="Address"
                              onChange={(e) => {
                                setReason(e.target.value);
                              }}
                              className="form-control"
                              required /></div>


                          <div className="form-group">
                            <label htmlFor="issuedDate">Issued Date:</label>
                            <input
                              type="date"
                              id="issuedDate"
                              name="issuedDate"
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                              className="form-control"
                              required /> </div>



                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">Submit </button>
                            <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )} */}


              {/* ------------------------------------------------- EDIT FORMS --------------------------------------------------------- */}
              {/* {showEditForm && selectedRowData && (
                <div className='popup-overlay'>
                  <div className='popup-form'>
                    <form onSubmit="">
                      <div className='certificate'>
                        <h2 className="certificate-title">EDIT CLEARANCE INFO</h2>
                        <div className="certificate-content">

                          <div className="form-group">
                            <label htmlFor="residentName">RESIDENT NAME </label>
                            <input
                              type="text"
                              id="residentName"
                              name="residentName"
                              value={editresidentName} onChange={(e) => setEditresidentName(e.target.value)}
                              className="form-control" required /></div>

                          <div className="form-group">
                            <label htmlFor="address"> ADDRESS </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={editaddress} onChange={(e) => setEditaddress(e.target.value)}
                              className="form-control" required /> </div>

                          <div className="form-group">
                            <label htmlFor="reason">REASON </label>
                            <input
                              type="text"
                              id="reason"
                              name="reason"
                              value={editreason} onChange={(e) => setEditreason(e.target.value)}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="DATE ">Date Registered</label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              value={editdate} onChange={(e) => setEditdate(e.target.value)}
                              className='form-control' required />
                          </div>

                          <div className="form-buttons">
                            <button type='submit' className='btn btn-primary' onClick=""> Submit  </button>
                            <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}> Discard </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              )} */}


            </div>
          </section>
        </main>
      </div>


    </>
  );
}
export default BclearanceAdmin;
