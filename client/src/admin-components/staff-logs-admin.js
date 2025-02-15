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
import { jwtDecode } from "jwt-decode";
import Notification from './notifications';
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

function StafflogsAdmin() {

    const [email, setEmail] = useState('');
    const [accessDate, setAccessDate] = useState('');
    const [data, setData] = useState([]);

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

    // NUMBER OF ROWS DISPLAYED -----------------------------------------------
    const [rowCount, setRowCount] = useState(10);

    // PAGE NUMBER --------------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);

    // SEARCH QUERY --------------------------------------------------------------
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query

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
    const endIndex = startIndex + rowCount;

    // Function to filter data based on search query -----------------------------
    const filteredData = data.filter((item) => {
        const itemValues = Object.values(item).map((value) =>
            value.toString().toLowerCase()
        );
        return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
    });



    // Data
    useEffect(() => {
        fetchData(); // Fetch initial data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dbarangay.onrender.com/get/stafflogs');
            setData(response.data);
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

    // User FETCHING
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = Cookies.get('access_token');
            if (token) {
                const decoded = jwtDecode(token);
                const _id = decoded.id;
                const response = await axios.get(`https://dbarangay.onrender.com/get/userprofile/${_id}`);
                setUserData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className="topbarsection" style={{ background: "#034f84" }}>
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
                                                        <img src={item.filename.url} style={{ width: "80px", height: "80px", borderRadius: "50px" }} calt="Profile Picture" className="profile-pic" id="profile-pic" />
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
            <div className={`containersidebar ${isSidebarCollapsed ? 'collapsed' : ''}`} style={{ background: "#0C356A" }}>
                <div className="newsidebar">
                    <div className="text-center">
                        <Link className="navbar-brand" to="/dashboard3">
                            <img className="tblImage w-50" src={logo} alt="" />
                        </Link>
                    </div>
                    <ul>

                        <li>
                            <Link to="/dashboard3" className="nav-link ">
                                <AiOutlineDashboard className="sidebaricon " />
                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Dashboard</span>
                            </Link>
                        </li>
                        <li >
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
                                                <span className="sidebarlabel ms-1 d-none d-sm-inline"> Incident Reports</span>

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
                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Log Trail</span>
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
                <Notification />
                <div class="pagetitle">
                    <h1> Log Trail </h1>
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
                                        </div>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Date of Access</th>
                                                    <th scope="col">Time of Access</th>
                                                    <th scope="col">Activity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getCurrentPageData()
                                                    .sort((a, b) => {
                                                        // Assuming accessDate and accessTime are combined to represent the timestamp
                                                        const timestampA = new Date(`${a.accessDate} ${a.accessTime}`);
                                                        const timestampB = new Date(`${b.accessDate} ${b.accessTime}`);

                                                        // Sort in descending order
                                                        return timestampB - timestampA;
                                                    })
                                                    .map((item) => (
                                                        <tr key={item._id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.accessDate}</td>
                                                            <td>{item.accessTime}</td>
                                                            <td>{item.activity}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>


                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </main >

            </div>
        </>
    );
}

export default StafflogsAdmin;