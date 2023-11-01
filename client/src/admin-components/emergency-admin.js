import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import axios from 'axios';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';
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

function EmergencyAdmin() {
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

  // DATA ---------------------------------------------------------------
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get/emergency');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };



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
    const reversedData = [...filteredAndSortedData].reverse(); // Reverse the data
    return reversedData.slice(startIndex, endIndex);
  };
// stay on first page
  const filteredAndSortedData = data
  .filter((item) => {
    const itemValues = Object.values(item).map((value) =>
      value.toString().toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
  })

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

  // Function to filter data based on search query -----------------------------
  const filteredData = data.filter((item) => {
    const itemValues = Object.values(item).map((value) =>
      value.toString().toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
  });

  // Forms ----------------------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; //   SHOW FORMS 
  const handleDiscard = () => { setShowForm(false); }; //   DISCARD FUNCTION

  //  DELETE  
  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/emergency/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [editStatus, setEditStatus] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };

  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData._id);
  
    setEditStatus(rowData.status);
    setShowEditForm(true);
  };
  const updateRowData = async (id) => {
    try {
      const updatedData = {
        status: editStatus,
      };


      const response = await axios.put(
        `http://localhost:8000/update/emergency/${selectedRowData}`,
        updatedData
      );
      console.log(response.data);
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error(error);
      // Handle error, show an error message to the user
    }
  };

  const navigate = useNavigate();  

  const handleSignOut = () => {
    document.cookie = 'access_token=; ';
    localStorage.removeItem('jwtToken');
    window.localStorage.clear();
    navigate('/admin')
  };

// User FETCHING
const [userData, setUserData] = useState([]);
useEffect(() => {
  fetchUser(); 
}, []);

const fetchUser = async () => {
  try {
    const token = Cookies.get('access_token');
    if (token) { 
    const decoded =jwtDecode(token);
      const _id = decoded.id;
      const response = await axios.get(`http://localhost:8000/get/userprofile/${_id}`);
      setUserData(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

return (
 <>
 
   <div className="topbarsection">
   {Array.isArray(userData) ? (
                         userData.map((item, index) => (
                             <div key={index}>
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
                   <h5>{item.firstName} {item.middleName} {item.lastName}</h5>
                   <h5>{item.email}</h5>
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

                   
                     <div onClick={handleSignOut} className="profilebuttons">
                       <BiLogOut className="profileicons" /> Log out
                     </div>
                   
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>

     </div>
     </div>
                         ))
                     ) : (
                         <p>No data to display.</p>
                     )}
   </div>
      <div className={`containersidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="newsidebar">
          <div className="text-center">
            <Link className="navbar-brand" to="/dashboard">
              <img className="tblImage w-50" src={logo} alt="" />
            </Link>
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
              <ul className={`sidebar-submenu w-100 ms-3 ${isDropdownOpen ? 'open' : ''}`}>
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
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Incident Reports</span>

                      </Link>
                    </li>
                    <li>
                      <Link to="/residents-admin" className="nav-link">
                        <BsFillPeopleFill className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Residents Info</span>

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
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown-tablenumbers">
              <select
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Enter search keyword"
                  name="query"
                  value={searchQuery}
                  onChange={handleSearchChange}
                >
                   <option value="new">New</option>
                  <option value="on process">On process</option>
                  <option value="processed">Processed</option>
                  <option value="declined">Declined</option>
              </select>
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
        <div class="pagetitle">
          <h1> Emergency  </h1>
        </div>
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
                    </div>



                    <table class="table caption-top">
                      <thead>
                        <tr>
                          <th scope="col">Resident Name</th>
                          <th scope="col">Location</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Emergency Type</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageData().map((item, index) => (
                          <tr key={index}>
                            <td>{item.userId}</td>
                            <td>{item.currentLocation}</td>
                            <td>{item.contactNum}</td>
                            <td>{item.emergencyType}</td>
                            <td>{item.date}</td>
                            <td>{item.status}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => showEditFormHandler(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteRow(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* EDIT FORM */}
            {showEditForm && (
              <div className="popup-overlay">
                <div className="popup-form">
                  <form>
                    <div className="certificate">
                      <h2 className="certificate-title">EDIT EMERGENCY</h2>
                      <div className="certificate-content">
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <select id="status"
                            className="form-control"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            style={{ fontSize: '20px', marginBottom: '10px' }} >
                            <option value="New" >New</option>
                            <option value="On Process">On Process</option>
                            <option value="Processed">Processed</option>
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary" onClick={updateRowData}>Save</button>
                      <button type="button" className="btn btn-danger" onClick={handleEditDiscard}>Discard</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default EmergencyAdmin;