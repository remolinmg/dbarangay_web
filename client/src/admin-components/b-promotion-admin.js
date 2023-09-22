import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import Axios from 'axios';
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
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: "",

    },
    {
      id: 2,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 3,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 4,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 5,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 6,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    }, {
      id: 7,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 8,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 9,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 10,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 11,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 12,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    }, {
      id: 13,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 14,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
    },
    {
      id: 15,
      b_owner: "JERICHO",
      b_name: "Doe's Restaurant",
      b_address: "123 Main Street",
      b_hours: "JERICHO",
      type_business: "Doe's Restaurant",
      b_contact: "123 Main Street",
      b_picture: ""
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



  // Forms ----------------------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; // SHOW FORMS
  const handleDiscard = () => { setShowForm(false); }; // DISCARD FUNCTION

  // DELETE
  const deleteRow = (row) => { Axios.delete(`http://localhost:3001/api/delete/bpermit/${row}`); }

  // Database ----------------------------
  const [id, setId] = useState('');
  const [b_owner, setOwner] = useState('');
  const [b_name, setName] = useState('');
  const [b_address, setAddress] = useState('');
  const [b_hours, setHours] = useState('');
  const [type_business, setTypeBusiness] = useState('');
  const [b_contact, setContact] = useState('');
  const [selectedPicture, setSelectedPicture] = useState(null); // Add this line for the selected picture
  const [bPermitTbl, setBPermitTbl] = useState([])

  // ADD FUNCTION -----------------------------------
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/bpermit').then((response) => { setBPermitTbl(response.data); });
  }, [])

  const submitReq = () => {
    const formData = new FormData();
    formData.append("b_owner", b_owner);
    formData.append("b_name", b_name);
    formData.append("b_address", b_address);
    formData.append("b_hours", b_hours);
    formData.append("type_business", type_business);
    formData.append("b_contact", b_contact);
    formData.append("b_picture", selectedPicture); // Include the selected picture in the form data

    Axios.post('http://localhost:3001/api/insert/bpermit', formData)
      .then((response) => {
        // Rest of your code...
      });
  };

  // EDIT FORM STATES (ShowForms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const [editOwner, setEditOwner] = useState('');
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editTypeBusiness, setEditTypeBusiness] = useState('');
  const [editHours, setEditHours] = useState('');
  const [editContact, setEditContact] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };

  // Function to show the edit form with the default data of the selected row
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditOwner(rowData.b_owner);
    setEditName(rowData.b_name);
    setEditAddress(rowData.b_address);
    setEditTypeBusiness(rowData.type_business);
    setSelectedRowId(rowData.idb_permit);
    setShowEditForm(true);
  };

  const updateRowData = () => {
    const formData = new FormData();
    formData.append("b_owner", editOwner);
    formData.append("b_name", editName);
    formData.append("b_address", editAddress);
    formData.append("type_business", editTypeBusiness);
    formData.append("b_picture", selectedPicture);
    Axios.put(`http://localhost:3001/api/update/bpermit/${selectedRowData.idb_permit}`, {
      b_owner: editOwner,
      b_name: editName,
      b_address: editAddress,
      type_business: editTypeBusiness,
    }).then((response) => {

      const updatedTableData = bPermitTbl.map((rowData) => {
        if (rowData.idb_permit === selectedRowData.idb_permit) {
          return {
            ...rowData,
            b_owner: editOwner,
            b_name: editName,
            b_address: editAddress,
            type_business: editTypeBusiness,
          };
        } else {
          return rowData;
        }
      });

      // Update the state with the new table data
      setBPermitTbl(updatedTableData);

      // Clear the selectedRowData and close the edit form
      setSelectedRowData(null);
      setShowEditForm(false);
    });
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
        <main id="main" className="main">
          <div className="pagetitle"><h1> Business Promotion  </h1> </div>
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
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
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Business Owner</th>
                          <th scope="col">Business Name </th>
                          <th scope="col">Business Address </th>
                          <th scope="col">Business Hours </th>
                          <th scope="col">Type of Business </th>
                          <th scope="col">Contact Number </th>
                          <th scope="col">Business Picture </th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {getCurrentPageData().map((val) => {
                          return <tr key={val.id}>
                            <th scope="row">{val.id}</th>
                            <td>{val.b_owner}</td>
                            <td>{val.b_name}</td>
                            <td>{val.b_address}</td>
                            <td>{val.b_hours}</td>
                            <td>{val.type_business}</td>
                            <td>{val.b_contact}</td>
                            <td>
                              <img
                                src={val.b_picture} // Use the 'b_picture' field as the image source
                                alt=""
                                className="business-picture"
                              />
                            </td>
                            <td>
                              <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit</button>
                                <form method='post' action=''>
                                  <input type='hidden' name='id' value="" />
                                  <button
                                    className="btn btn-outline-danger"
                                    type="submit"
                                    name="deleteRow"
                                    onClick={() => { deleteRow(val.b_owner); }}>Delete</button>
                                </form>
                              </div>
                            </td>
                          </tr>
                        })}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------ ADD POP-UP FORMS  ------------------------------------------------------------*/}
              {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={submitReq}>
                      <div className="certificate">
                        <h2 className="certificate-title">ADD RESIDENTS INFO</h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="owner">Business Owner</label>
                            <input
                              type="text"
                              id="owner"
                              name="owner"
                              onChange={(e) => { setOwner(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="bname">Business Name</label>
                            <input
                              type="text"
                              id="bname"
                              name="bname"
                              onChange={(e) => { setName(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Business Hours */}
                          <div className="form-group">
                            <label htmlFor="bhours">Business Hours</label>
                            <input
                              type="text"
                              id="bhours"
                              name="bhours"
                              onChange={(e) => { setHours(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Contact Number */}
                          <div className="form-group">
                            <label htmlFor="bcontact">Contact Number</label>
                            <input
                              type="text"
                              id="bcontact"
                              name="bcontact"
                              onChange={(e) => { setContact(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Business Picture */}
                          <div className="form-group">
                            <label htmlFor="picture">Business Picture</label>
                            <input
                              type="file"
                              id="picture"
                              name="picture"
                              accept="image/*"
                              onChange={(e) => setSelectedPicture(e.target.files[0])}
                              className="form-control"
                              required />
                          </div>

                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleDiscard}>
                              Discard
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}


              {/* ------------------------------------------------- EDIT FORM --------------------------------------------------------- */}
              {showEditForm && selectedRowData && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={updateRowData}>
                      <div className="certificate">
                        <h2 className="certificate-title">EDIT RESIDENTS INFO</h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="owner">Business Owner</label>
                            <input
                              type="text"
                              id="owner"
                              name="owner"
                              value={editOwner}
                              onChange={(e) => setEditOwner(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="bname">Business Name</label>
                            <input
                              type="text"
                              id="bname"
                              name="bname"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Business Hours */}
                          <div className="form-group">
                            <label htmlFor="bhours">Business Hours</label>
                            <input
                              type="text"
                              id="bhours"
                              name="bhours"
                              value={editHours}
                              onChange={(e) => setEditHours(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Contact Number */}
                          <div className="form-group">
                            <label htmlFor="bcontact">Contact Number</label>
                            <input
                              type="text"
                              id="bcontact"
                              name="bcontact"
                              value={editContact}
                              onChange={(e) => setEditContact(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          {/* Add Business Picture */}
                          <div className="form-group">
                            <label htmlFor="picture">Business Picture</label>
                            <input
                              type="file"
                              id="picture"
                              name="picture"
                              accept="image/*"
                              onChange={(e) => setSelectedPicture(e.target.files[0])}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}>
                              Discard
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default BpromotionAdmin;
