import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
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
import {
    RiFolderWarningFill,
} from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.css';
import { FaUserCircle } from "react-icons/fa";


function FeedbackAdmin() {
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
            id: 1, fdate: '2023-09-19',
            ffeedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 2, fdate: '2023-09-20',
            ffeedback: 'Sample Feedback 2'
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

    // State to track which rows are expanded
    const [expandedRows, setExpandedRows] = useState({});

    // Function to toggle the expanded state of a row
    const toggleRow = (id) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
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
                        <div className="col-6">
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
                        <div className="col-6">
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
                <main id="main" class="main">

                    <div class="pagetitle">
                        <h1> Suggestions and Feedbacks </h1>
                    </div>

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
                                        <table className ="table w-100 flex-column">

                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col ">Date</th>
                                                    <th scope="col">Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((val) => (
                                                    <tr key={val.id}>
                                                        <th scope="row">{val.id}</th>
                                                        <td>{val.fdate}</td>
                                                        <td className="w-75">
                                                            {expandedRows[val.id] ? (
                                                                <>
                                                                    {val.ffeedback}
                                                                    <button
                                                                        onClick={() => toggleRow(val.id)}
                                                                        className="btn btn-link btn-sm"
                                                                    >
                                                                        See Less
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {val.ffeedback.slice(0, 50)}
                                                                    {val.ffeedback.length > 50 && (
                                                                        <button
                                                                            onClick={() => toggleRow(val.id)}
                                                                            className="btn btn-link btn-sm"
                                                                        >
                                                                            See More
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default FeedbackAdmin;
