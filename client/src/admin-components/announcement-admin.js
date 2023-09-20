import React, { useState, useRef, useEffect } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import Axios from 'axios';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
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
import { FaUserCircle } from "react-icons/fa";

function AnnouncementAdmin() {
  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const [editwhat, setEditwhat] = useState('');
  const [editdesc, setEditdesc] = useState('');
  const [editdate, setEditdate] = useState('');
  const [editwhere, setEditwhere] = useState('');
  const [editwho, setEditwho] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); //EDIT FORM
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; //SHOW ADD FORM 
  const handleEditDiscard = () => { setShowEditForm(false); }; // EDIT DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); }; // DISCARD FUNCTION


  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditwhat(rowData.what);
    setEditdesc(rowData.desc);
    setEditdate(rowData.date);
    setEditwhere(rowData.where);
    setEditwho(rowData.who);
    setSelectedRowId(rowData.id_announcement);
    setShowEditForm(true);
  };

  // SIDEBAR - TOPBAR FUNCTIONS -----------------------------------------
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
      what: "sample",
      description: "Description 1",
      when: "Date 1",
      where: "Location 1",
      who: "User 1",
    },
    {
      id: 2,
      what: "sample",
      description: "Description 2",
      when: "Date 2",
      where: "Location 2",
      who: "User 2",
    },
    {
      id: 3,
      what: "Sample Data 3",
      description: "Description 3",
      when: "mamaya",
      where: "Location 3",
      who: "User 3",
    },
    {
      id: 4,
      what: "Sample Data 4",
      description: "Description 4",
      when: "Date 4",
      where: "jan lang",
      who: "User 4",
    },
    {
      id: 5,
      what: "Sample Data 5",
      description: "Description 5",
      when: "Date 5",
      where: "Location 5",
      who: "marc",
    },
    {
      id: 6,
      what: "Sample Data 6",
      description: "tanginamo",
      when: "Date 6",
      where: "Location 6",
      who: "User 6",
    },
    {
      id: 7,
      what: "Sample Data 7",
      description: "Description 7",
      when: "Date 7",
      where: "Location 7",
      who: "clarise",
    },
    {
      id: 8,
      what: "Sample Data 8",
      description: "Description 8",
      when: "Date 8",
      where: "Location 8",
      who: "User 8",
    },
    {
      id: 9,
      what: "Sample Data 9",
      description: "Description 9",
      when: "Date 9",
      where: "Location 9",
      who: "User 9",
    },
    {
      id: 10,
      what: "Sample Data 10",
      description: "Description 10",
      when: "Date 10",
      where: "Location 10",
      who: "User 10",
    },
    {
      id: 11,
      what: "Sample Data 11",
      description: "Description 11",
      when: "Date 11",
      where: "Location 11",
      who: "User 11",
    },
    {
      id: 12,
      what: "Sample Data 1",
      description: "Description 12",
      when: "Date 12",
      where: "Location 12",
      who: "User 12",
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

  // Function to go to the next page ------------------------------------------
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / rowCount)) {
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

  // CRUD ----------------------------------------------------------------------
  const handleEdit = (item) => {
    console.log(`Editing item with id ${item.id}`);
  };

  const handleDelete = (item) => {
    console.log(`Deleting item with id ${item.id}`);
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

        {/* TABLE STARTS */}
        <main id="main" className="main">
          <div className="pagetitle"><h1> Announcement  </h1> </div>
          <div className="table-container d-flex justify-content-center align-items-center">
            <div className="col-12 border rounded p-3 m-5">
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
                  <button className="btn btn-lg btn-primary">ADD</button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <table className="table m-auto">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">What</th>
                        <th scope="col">Description</th>
                        <th scope="col">When</th>
                        <th scope="col">Where</th>
                        <th scope="col">Who</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.slice(startIndex, endIndex).map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.what}</td>
                          <td>{item.description}</td>
                          <td>{item.when}</td>
                          <td>{item.where}</td>
                          <td>{item.who}</td>
                          <td>
                            <button className="btn btn-success btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
    </>
  );
}
export default AnnouncementAdmin;
