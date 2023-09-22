import './assets/css/style.css';
import Axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';
import { FiUser } from 'react-icons/fi';
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

function BlotterAdmin() {

  //  ------------------------------ SIDEBAR TOPBAR ------------------------------
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

  // NUMBER OF ROWS DISPLAYED -----------------------------------------------
  const [rowCount, setRowCount] = useState(10);

  // PAGE NUMBER --------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);

  // SEARCH QUERY --------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // SAMPLE DATA ---------------------------------------------------------------
  const data = [
    {
      id: 1,
      complaint_date: "2023-09-15",
      complaint_type: "Noise Complaint",
      incident_location: "123 Main Street",
      complaint_details: "Loud music late at night",
      c_fullname: "John Doe",
      s_documents: "Evidence1.jpg",
      status: "Pending",
    },
    {
      id: 2,
      complaint_date: "2023-09-14",
      complaint_type: "Property Damage",
      incident_location: "456 Elm Street",
      complaint_details: "Vandalism reported",
      c_fullname: "Jane Smith",
      s_documents: "Evidence2.jpg",
      status: "Resolved",
    },
    {
      id: 3,
      complaint_date: "2023-09-13",
      complaint_type: "Theft",
      incident_location: "789 Oak Avenue",
      complaint_details: "Stolen bicycle",
      c_fullname: "Mike Johnson",
      s_documents: "Evidence3.jpg",
      status: "Pending",
    },
    {
      id: 4,
      complaint_date: "2023-09-12",
      complaint_type: "Noise Complaint",
      incident_location: "101 Pine Street",
      complaint_details: "Loud party next door",
      c_fullname: "Sarah Lee",
      s_documents: "Evidence4.jpg",
      status: "Resolved",
    },
    {
      id: 5,
      complaint_date: "2023-09-11",
      complaint_type: "Suspicious Activity",
      incident_location: "222 Cedar Road",
      complaint_details: "Unusual behavior reported",
      c_fullname: "David Brown",
      s_documents: "Evidence5.jpg",
      status: "Pending",
    },
    {
      id: 6,
      complaint_date: "2023-09-10",
      complaint_type: "Property Damage",
      incident_location: "333 Maple Lane",
      complaint_details: "Vandalism to a vehicle",
      c_fullname: "Emily Davis",
      s_documents: "Evidence6.jpg",
      status: "Resolved",
    },
    {
      id: 7,
      complaint_date: "2023-09-09",
      complaint_type: "Noise Complaint",
      incident_location: "444 Birch Street",
      complaint_details: "Loud music during the night",
      c_fullname: "Chris Wilson",
      s_documents: "Evidence7.jpg",
      status: "Pending",
    },
    {
      id: 8,
      complaint_date: "2023-09-08",
      complaint_type: "Theft",
      incident_location: "555 Redwood Drive",
      complaint_details: "Missing laptop",
      c_fullname: "Olivia White",
      s_documents: "Evidence8.jpg",
      status: "Resolved",
    },
    {
      id: 9,
      complaint_date: "2023-09-07",
      complaint_type: "Noise Complaint",
      incident_location: "666 Willow Avenue",
      complaint_details: "Loud party at a neighbor's house",
      c_fullname: "Daniel Harris",
      s_documents: "Evidence9.jpg",
      status: "Pending",
    },
    {
      id: 10,
      complaint_date: "2023-09-06",
      complaint_type: "Property Damage",
      incident_location: "777 Elm Street",
      complaint_details: "Graffiti on a building",
      c_fullname: "Sophia Martinez",
      s_documents: "Evidence10.jpg",
      status: "Resolved",
    },
    {
      id: 11,
      complaint_date: "2023-09-05",
      complaint_type: "Noise Complaint",
      incident_location: "888 Oak Avenue",
      complaint_details: "Loud music disturbance",
      c_fullname: "Liam Anderson",
      s_documents: "Evidence11.jpg",
      status: "Pending",
    },
    {
      id: 12,
      complaint_date: "2023-09-04",
      complaint_type: "Theft",
      incident_location: "999 Pine Street",
      complaint_details: "Stolen wallet",
      c_fullname: "Ava Thomas",
      s_documents: "Evidence12.jpg",
      status: "Resolved",
    },
    {
      id: 13,
      complaint_date: "2023-09-03",
      complaint_type: "Property Damage",
      incident_location: "111 Cedar Road",
      complaint_details: "Broken windows",
      c_fullname: "Noah Rodriguez",
      s_documents: "Evidence13.jpg",
      status: "Pending",
    },
    {
      id: 14,
      complaint_date: "2023-09-02",
      complaint_type: "Noise Complaint",
      incident_location: "222 Maple Lane",
      complaint_details: "Loud party disturbance",
      c_fullname: "Emma Garcia",
      s_documents: "Evidence14.jpg",
      status: "Resolved",
    },
    {
      id: 15,
      complaint_date: "2023-09-01",
      complaint_type: "Suspicious Activity",
      incident_location: "333 Birch Street",
      complaint_details: "Unusual behavior in the park",
      c_fullname: "Mason Lewis",
      s_documents: "Evidence15.jpg",
      status: "Pending",
    },
    {
      id: 16,
      complaint_date: "2023-08-31",
      complaint_type: "Property Damage",
      incident_location: "444 Redwood Drive",
      complaint_details: "Vandalism to public property",
      c_fullname: "Olivia Clark",
      s_documents: "Evidence16.jpg",
      status: "Resolved",
    },
    {
      id: 17,
      complaint_date: "2023-08-30",
      complaint_type: "Noise Complaint",
      incident_location: "555 Willow Avenue",
      complaint_details: "Loud music disturbance",
      c_fullname: "James Turner",
      s_documents: "Evidence17.jpg",
      status: "Pending",
    },
    {
      id: 18,
      complaint_date: "2023-08-29",
      complaint_type: "Theft",
      incident_location: "666 Elm Street",
      complaint_details: "Missing bicycle",
      c_fullname: "Sophia Lewis",
      s_documents: "Evidence18.jpg",
      status: "Resolved",
    },
    {
      id: 19,
      complaint_date: "2023-08-28",
      complaint_type: "Noise Complaint",
      incident_location: "777 Oak Avenue",
      complaint_details: "Loud party next door",
      c_fullname: "Aiden Garcia",
      s_documents: "Evidence19.jpg",
      status: "Pending",
    },
    {
      id: 20,
      complaint_date: "2023-08-27",
      complaint_type: "Property Damage",
      incident_location: "888 Pine Street",
      complaint_details: "Graffiti on a public building",
      c_fullname: "Sophie Turner",
      s_documents: "Evidence20.jpg",
      status: "Resolved",
    },
    {
      id: 21,
      complaint_date: "2023-08-26",
      complaint_type: "Noise Complaint",
      incident_location: "999 Cedar Road",
      complaint_details: "Loud music late at night",
      c_fullname: "Ethan Wilson",
      s_documents: "Evidence21.jpg",
      status: "Pending",
    },
  ];
  // Event handler for dropdown change ----------------------------------------
  const handleRowCountChange = (e) => {
    const selectedRowCount = parseInt(e.target.value);
    setRowCount(selectedRowCount);
    setCurrentPage(1); // Reset current page to 1 when row count changes
  };

  // Event handler for search input change -------------------------------------
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when search query changes
  };

  // Function to get the current page data using slice
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowCount;
    const endIndex = startIndex + rowCount;
    return filteredData.slice(startIndex, endIndex);
  };

  // Function to go to the next page ------------------------------------------
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowCount)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page --------------------------------------
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the starting and ending indices for the current page -------------
  const startIndex = (currentPage - 1) * rowCount;
  const endIndex = startIndex + rowCount;

  // Function to filter data based on search query -----------------------------
  const filteredData = data.filter((item) => {
    const itemValues = Object.values(item).map((value) =>
      value.toString().toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
  });



  //  ------------------------------ SHOW ADD FORM ---------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); };


  //   DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); };

  const [complaint_date, setcomplaint_date] = useState('');
  const [complaint_type, setcomplaint_type] = useState('');
  const [incident_location, setincident_location] = useState('');
  const [complaint_details, setcomplaint_details] = useState('');
  const [c_fullname, setc_fullname] = useState('');
  const [s_documents, sets_documents] = useState('');


  const handleEditSubmit = () => { }


  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);

  const [editcomplaint_date, setEditcomplaint_date] = useState('');
  const [editcomplaintType, setEditcomplaint_type] = useState('');
  const [editincidentLocation, setEditincident_location] = useState('');
  const [editcomplaintDetails, setEditcomplaint_details] = useState('');
  const [editcomplainantFullname, setEditc_fullname] = useState('');
  const [editsupportingDocuments, setEdits_documents] = useState('');

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };


  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------

  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditcomplaint_date(rowData.complaint_date);
    setEditcomplaint_type(rowData.complaint_type);
    setEditincident_location(rowData.incident_location);
    setEditcomplaint_details(rowData.complaint_details);
    setEditc_fullname(rowData.c_fullname);
    setEdits_documents(rowData.s_documents);
    setSelectedRowId(rowData.id_blotter);
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
      <div className={`business-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
          <div className="toppart-table border row w-75 d-flex align-items-center">
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Enter search keyword"
                  name="query"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="tabsz dropdown-center">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button>
                <ul className="dropdown-menu">
                  <li><Link to="/announcement-admin">General</Link></li>
                  <li><Link to="/livelihood-admin">Livelihood</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown-tablenumbers">
                <select className="Table-numbers form-control" value={rowCount} onChange={handleRowCountChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------------------  TABLE -------------------------------------------------------------  */}
        <main id="main" class="main">
          <section class="section">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div className="row p-2 d-flex justify-content-between">
                      <div className="col-4">
                        <div className="table-pages">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}>
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              {Array.from({ length: Math.ceil(filteredData.length / rowCount) }, (_, i) => (
                                <li className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
                                  <a className="page-link" href="#" onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                  </a>
                                </li>
                              ))}
                              <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <div className="col-4 text-end ">
                        <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                      </div>
                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Blotter #</th>
                          <th scope="col">DATE</th>
                          <th scope="col">COMPLAINT TYPE</th>
                          <th scope="col">INCIDENT LOC.</th>
                          <th scope="col">COMPLAINT DETAILS</th>
                          <th scope="col">COMPLAINANT Name</th>
                          <th scope="col">SUPPORTING DOCUMENTS</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageData().map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.complaint_date}</td>
                            <td>{item.complaint_type}</td>
                            <td>{item.incident_location}</td>
                            <td>{item.complaint_details}</td>
                            <td>{item.c_fullname}</td>
                            <td>{item.s_documents}</td>
                            <td>{item.status}</td>
                            <td>
                              <button className="btn btn-primary btn-sm" onClick={() => showEditFormHandler(item)}>Edit</button>
                              <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* ADD POP-UP FORMS  */}

            {showForm && (
              <div className="popup-overlay">
                <div className="popup-form">
                  <form >
                    <div className="certificate">
                      <h2 className="certificate-title">ADD BLOTTER INFO</h2>
                      <div className="certificate-content">

                        <div className="form-group">
                          <label htmlFor="owner">COMPLAINT Date </label>
                          <input
                            type="date"
                            id="owner"
                            name="owner" onChange={(e) => { setcomplaint_date(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="bname"> COMPLAINT TYPE </label>
                          <input
                            type="text"
                            id="bname"
                            name="bname"
                            onChange={(e) => { setcomplaint_type(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="address">INCIDENT LOCATION </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={(e) => { setincident_location(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="type">COMPLAINT DETAILS </label>
                          <input
                            type="text"
                            id="type"
                            name="type" onChange={(e) => { setcomplaint_details(e.target.value); }}
                            className="form-control" required /></div>
                        <div className="form-group">
                          <label htmlFor="type">COMPLAINANT FULL NAME </label>
                          <input
                            type="text"
                            id="type"
                            name="type" onChange={(e) => { setc_fullname(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="type">SUPPORTING DOCUMENTS</label>
                          <input
                            type="text"
                            id="type"
                            name="type" onChange={(e) => { sets_documents(e.target.value); }}
                            className="form-control" required /></div>



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
            {/*
             EDIT FORM */}

            {showEditForm && selectedRowData && (
              <div className='popup-overlay'>
                <div className='popup-form'>
                  <form>
                    <div className='certificate'>
                      <h2 className='certificate-title'>EDIT RESIDENTS INFO</h2>
                      <div className='certificate-content'>
                        <div className='form-group'>
                          <label htmlFor='owner'>COMPLAINT DATE</label>
                          <input
                            type='date'
                            id='owner'
                            name='owner'
                            value={editcomplaint_date}
                            onChange={(e) => setEditcomplaint_date(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-group'>
                          <label htmlFor='owner'>COMPLAINT TYPE</label>
                          <input
                            type='text'
                            id='owner'
                            name='owner'
                            value={editcomplaintType}
                            onChange={(e) => setEditcomplaint_type(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-group'>
                          <label htmlFor='owner'>INCIDENT LOCATION</label>
                          <input
                            type='text'
                            id='owner'
                            name='owner'
                            value={editincidentLocation}
                            onChange={(e) => setEditincident_location(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-group'>
                          <label htmlFor='bname'>COMPLAINT DETAILS</label>
                          <input
                            type='text'
                            id='bname'
                            name='bname'
                            value={editcomplaintDetails}
                            onChange={(e) => setEditcomplaint_details(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-group'>
                          <label htmlFor='address'>COMPLAINANT FULL NAME</label>
                          <input
                            type='text'
                            id='address'
                            name='address'
                            value={editcomplainantFullname}
                            onChange={(e) => setEditc_fullname(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-group'>
                          <label htmlFor='type'>SUPPORTING DOCUMENTS</label>
                          <input
                            type='text'
                            id='type'
                            name='type'
                            value={editsupportingDocuments}
                            onChange={(e) => setEdits_documents(e.target.value)}
                            className='form-control' required />
                        </div>

                        <div className='form-buttons'>
                          <button type='submit' className='btn btn-primary' onClick={handleEditSubmit}>Submit</button>
                          <button type='button' className='btn btn-secondary' onClick={handleEditDiscard}>Discard</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </section >
        </main >

      </div >
    </>
  );
}
export default BlotterAdmin;
