import './assets/css/style.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
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

function Complaintsadmin() {

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
      const response = await axios.get('http://localhost:8000/get/complaint');
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



  // Forms ----------------------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; // SHOW FORMS
  const handleDiscard = () => { setShowForm(false); }; // DISCARD FUNCTION


  //  DELETE  
  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/complaint/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------------------------ Database ----------------------------
  const [date, setDate] = useState('');
  const [complainant, setComplainant] = useState('');
  const [defendant, setDefendant] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState();
  //-------------------------- ADD FUNCTION -----------------------------------

  const complaint = () => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('complainant', complainant);
    formData.append('defendant', defendant);
    formData.append('type', type);
    formData.append('address', address);
    formData.append('status', status);
    formData.append('file', file);
    axios.post('http://localhost:8000/complaint', formData).then(res => {
      if (res.data === "Error saving data to MongoDB") {
        alert("Complaint Already Exist!");
      }
      else if (res.data === "File and text data saved to MongoDB") {
      }
    })
      .catch(er => console.log(er))
  };

  // EDIT FORM STATES (ShowForms) ------------------------------

  const [editDate, setEditDate] = useState('');
  const [editComplainant, setEditComplainant] = useState('');
  const [editDefendant, setEditDefendant] = useState('');
  const [editType, setEditType] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editFile, setEditFile] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };

  // Function to show the edit form with the default data of the selected row
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData._id);
    setEditDate(rowData.date);
    setEditComplainant(rowData.complainant);
    setEditDefendant(rowData.defendant);
    setEditType(rowData.type);
    setEditAddress(rowData.address);
    setEditStatus(rowData.status);
    setShowEditForm(true);
  };

  const updateRowData = async () => {
    try {
      const formData = new FormData();
      formData.append('date', editDate);
      formData.append('complainant', editComplainant);
      formData.append('defendant', editDefendant);
      formData.append('type', editType);
      formData.append('address', editAddress);
      formData.append('status', editStatus);
      formData.append('file', editFile);
      const response = await axios.put(
        `http://localhost:8000/update/complaint/${selectedRowData}`,
        formData
      );
      console.log(response.data);
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();  

  const handleSignOut = () => {
    document.cookie = 'access_token=; ';
    localStorage.removeItem('jwtToken');
    window.localStorage.clear();
    navigate('/admin')
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
            <div className="col-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Enter search keyword"
                  name="query"
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-3">
              <div className="tabsz dropdown-center">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                <ul className="dropdown-menu dropdown-topcategory">
                  <li><Link to="/blotter-admin" className="dropdown-item text-center">Blotter</Link></li>
                  <li><Link to="/complaints-admin" className="dropdown-item text-center">Complaints</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-3">
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
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
              </select>
              </div>
            </div>
            <div className="col-3">
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
          <h1> Complaints Table </h1>
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
                          <th scope="col">DATE</th>
                          <th scope="col">COMPLAINANT</th>
                          <th scope="col">DEFENDANT</th>
                          <th scope="col">COMPLAINT TYPE</th>
                          <th scope="col">INCIDENT ADDRESS</th>
                          <th scope="col">DOCUMENTATION</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageData().map((item) => (
                          <tr key={item._id}>
                            <td>{item.date}</td>
                            <td>{item.complainant}</td>
                            <td>{item.defendant}</td>
                            <td>{item.type}</td>
                            <td>{item.address}</td>
                            <td><img
                              style={{ width: "100px", height: "100px" }}
                              src={require(`../../../server/uploads/complaint/${item.filename}`)}
                              alt=""
                              className="business-picture"
                            /></td>
                            <td>{item.status}</td>
                            <td>
                              <button className="btn btn-primary btn-sm" onClick={() => showEditFormHandler(item)}>Edit</button>
                              <button className="btn btn-danger btn-sm" onClick={() => { deleteRow(item._id); }}>Delete</button>
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
                      <h2 className="certificate-title">ADD COMPLAINT INFO</h2>
                      <div className="certificate-content">

                        <div className="form-group">
                          <label htmlFor="date">COMPLAINT Date </label>
                          <input
                            type="date"
                            id="date"
                            name="date" onChange={(e) => { setDate(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="complainant">COMPLAINANT </label>
                          <input
                            type="text"
                            id="complainant"
                            name="complainant" onChange={(e) => { setComplainant(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="defendant">DEFENDANT</label>
                          <input
                            type="text"
                            id="defendant"
                            name="defendant" onChange={(e) => { setDefendant(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="type"> COMPLAINT TYPE </label>
                          <input
                            type="text"
                            id="type"
                            name="type"
                            onChange={(e) => { setType(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="address">INCIDENT ADDRESS </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={(e) => { setAddress(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="file">DOCUMENTATION</label>
                          <input
                            type="file"
                            id="file"
                            name="file" onChange={(e) => setFile(e.target.files[0])}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="status">STATUS</label>
                          <select
                            id="status"
                            className="form-control"
                            onChange={(e) => { setStatus(e.target.value); }}
                            style={{ fontSize: '20px', marginBottom: '10px' }}
                          >
                            <option value="????" ></option>
                            <option value="pending">PENDING</option>
                            <option value="processed">PROCESSED</option>
                          </select>
                        </div>
                        <div className="form-buttons">
                          <button type="submit" className="btn btn-primary" onClick={complaint}>Submit </button>
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
                        <div className="form-group">
                          <label htmlFor="date">COMPLAINT Date </label>
                          <input
                            type="date"
                            id="date"
                            value={editDate}
                            name="date" onChange={(e) => { setEditDate(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="complainant">COMPLAINANT </label>
                          <input
                            type="text"
                            id="complainant"
                            value={editComplainant}
                            name="complainant" onChange={(e) => { setEditComplainant(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="defendant">DEFENDANT</label>
                          <input
                            type="text"
                            id="defendant"
                            value={editDefendant}
                            name="defendant" onChange={(e) => { setEditDefendant(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="type"> COMPLAINT TYPE </label>
                          <input
                            type="text"
                            id="type"
                            name="type"
                            value={editType}
                            onChange={(e) => { setEditType(e.target.value); }}
                            className="form-control" required /> </div>

                        <div className="form-group">
                          <label htmlFor="address">INCIDENT ADDRESS </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={editAddress}
                            onChange={(e) => { setEditAddress(e.target.value); }}
                            className="form-control" required /></div>

                        <div className="form-group">
                          <label htmlFor="file">DOCUMENTATION</label>
                          <input
                            type="file"
                            id="file"
                            name="file" onChange={(e) => setEditFile(e.target.files[0])}
                            className="form-control" /></div>
                        <div className="form-group">
                          <label htmlFor="status">STATUS</label>
                          <select
                            id="status"
                            className="form-control"
                            value={editStatus}
                            onChange={(e) => { setEditStatus(e.target.value); }}
                            style={{ fontSize: '20px', marginBottom: '10px' }}
                          >
                            <option value="????" ></option>
                            <option value="pending">PENDING</option>
                            <option value="processed">PROCESSED</option>
                          </select>
                        </div>
                        <div className='form-buttons'>
                          <button type='submit' className='btn btn-primary' onClick={updateRowData}>Submit</button>
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
export default Complaintsadmin;