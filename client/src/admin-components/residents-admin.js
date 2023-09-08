import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';
import { RiFolderWarningFill, } from "react-icons/ri";
import Axios from 'axios';
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
import 'bootstrap/dist/css/bootstrap.css';
import { FaUserCircle } from "react-icons/fa";



function ResidentsAdmin() {
  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const [editlastname, setEditlastname] = useState('');
  const [editfirstname, setEditfirstname] = useState('');
  const [editage, setEditage] = useState('');
  const [editsex, setEditsex] = useState('');
  const [editdateregistered, setEditdateregistered] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);


  const [showEditForm, setShowEditForm] = useState(false); //SHOW EDIT FORMS
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; //SHOW ADD FORMS
  const handleEditDiscard = () => { setShowEditForm(false); }; // EDIT DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); }; // DISCARD FUNCTION




  useEffect(() => {
    if (selectedRowData) {
      setEditlastname(selectedRowData.lastname);
      setEditfirstname(selectedRowData.firstname);
      setEditage(selectedRowData.age);
      setEditsex(selectedRowData.sex);
      setEditdateregistered(selectedRowData.dateregistered);

    }
  }, [selectedRowData]);

  //  -------------------------------------------- SIDEBAR COLLAPSED --------------------------------------------
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarCollapse = () => { setSidebarCollapsed(!isSidebarCollapsed); };


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

  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditlastname(rowData.lastname);
    setEditfirstname(rowData.firstname);
    setEditage(rowData.age);
    setEditsex(rowData.sex);
    setEditdateregistered(rowData.dateregistered);
    setSelectedRowId(rowData.id);
    setShowEditForm(true);
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
      <div className={`container-documents vh-100 h-100 ${isSidebarCollapsed ? 'expanded' : ''}`}>

        <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
          <div className="row w-75">
            <div className="col-md-6 ">
              <form className="input-group d-flex align-items-center">
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-btn" />
                <div className="input-group-append">
                  <button className="btn btn-primary mt-2" type="submit" id="search-btn">icon</button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
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


        {/* --------------------------------------------------------- TABLE STARTS --------------------------------------- */}
        <main id="main" class="main">

          <div className="table-container d-flex justify-content-center align-items-center">
            <div className="col border rounded p-3 m-5">
              <div className="row p-2 d-flex justify-content-between">
                <div className="col-4">
                  <div>
                    <h1 className="search-container"><b>Residents Information</b></h1>
                  </div>
                </div>
                <div className="col-4 text-end ">
                  <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <table className="table m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Resident No.</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Date Registerd</th>
                        <th scope="col">Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {/* {residenttable.map((val) => {
                        return (
                          <tr key={val.id}>
                            <th scope="row">{val.id}</th>
                            <td>{val.lastname}</td>
                            <td>{val.firstname}</td>
                            <td>{val.age}</td>
                            <td>{val.sex}</td>
                            <td>{format(new Date(val.dateregistered), 'yyyy-MM-dd')}</td>
                            <td>
                              <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit </button>
                                <form method='post' action=''>
                                  <input type='hidden' name='id' value={val.id} />
                                  <button className='btn btn-outline-danger' type='submit' name='deletePost' >Delete</button>
                                </form>
                              </div>
                            </td>
                          </tr>

                        );
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
                  <form>
                    <div className="certificate">
                      <h2 className="certificate-title">ADD RESIDENTS INFO</h2>
                      <div className="certificate-content">
                        <div className="form-group">
                          <label htmlFor="lastname">LAST NAME</label>
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            onChange={(e) => {
                              setlastname(e.target.value);
                            }}
                            className="form-control"
                            required /></div>

                        <div className="form-group">
                          <label htmlFor="firstname"> FIRST NAME </label>
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            onChange={(e) => {
                              setfirstname(e.target.value);
                            }}
                            className="form-control"
                            required /> </div>

                        <div className="form-group">
                          <label htmlFor="age">AGE </label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            onChange={(e) => {
                              setage(e.target.value);
                            }}
                            className="form-control"
                            required /></div>

                        <div className="form-group">
                          <label htmlFor="sex">SEX</label>
                          <input
                            type="text"
                            id="sex"
                            name="sex"
                            onChange={(e) => {
                              setsex(e.target.value);
                            }}
                            className="form-control"
                            required /></div>

                        <div className="form-group">
                          <label htmlFor="dateregistered">Date Registered</label>
                          <input
                            type="date"
                            id="dateregistered"
                            name="dateregistered"
                            onChange={(e) => {
                              setdateregistered(e.target.value);
                            }}
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
            )} */}

            {/* ------------------------------------------------- EDIT FORMS --------------------------------------------------------- */}
            {/* {showEditForm && selectedRowData && (
              <div className='popup-overlay'>
                <div className='popup-form'>
                  <form >
                    <div className='certificate'>
                      <h2 className="certificate-title">EDIT RESIDENTS INFO</h2>
                      <div className="certificate-content">

                        <div className="form-group">
                          <label htmlFor="lastname">LAST NAME</label>
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={editlastname} onChange={(e) => setEditlastname(e.target.value)}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="First_Name"> FIRST NAME </label>
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={editfirstname} onChange={(e) => setEditfirstname(e.target.value)}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="Age">AGE </label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            value={editage} onChange={(e) => setEditage(e.target.value)}
                            className="form-control"
                            required /></div>

                        <div className="form-group">
                          <label htmlFor="sex">SEX</label>
                          <input
                            type="text"
                            id="sex"
                            name="sex"
                            value={editsex} onChange={(e) => setEditsex(e.target.value)}
                            className="form-control"
                            required /></div>

                        <div className="form-group">
                          <label htmlFor="DateRegistered">Date Registered</label>
                          <input
                            type="date"
                            id="dateregistered"
                            name="DateRegistered"
                            value={editdateregistered} onChange={(e) => setEditdateregistered(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className="form-buttons">
                          <button type='submit' className='btn btn-primary'> Submit  </button>
                          <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}> Discard </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            )} */}
          </div>
        </main>

      </div>

    </>
  );
}

export default ResidentsAdmin;