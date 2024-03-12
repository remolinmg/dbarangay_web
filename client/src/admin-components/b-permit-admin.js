import './assets/css/style.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
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

function BpermitAdmin() {
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
    const [tFirstName, setTFirstName] = useState();
    const [tLastName, setTLastName] = useState();

    useEffect(() => {
        fetchData(); // Fetch initial data when the component mounts
        fetchName(); //Fetch name from token
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dbarangay.onrender.com/get/businessclearance');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchName = async () => {
        // Access Token
        const token = Cookies.get("access_token");
        if (token) {
            const decoded = jwtDecode(token);
            setTFirstName(decoded.firstName);
            setTLastName(decoded.lastName);
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


    // Forms ----------------------------------------------
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => { setShowForm(!showForm); }; //   SHOW FORMS 
    const handleDiscard = () => { setShowForm(false); }; //   DISCARD FUNCTION

    //  DELETE  
    const deleteRow = async (id) => {
        try {
            await axios.delete(`https://dbarangay.onrender.com/delete/businessclearance/${id}`, { data: { tFirstName, tLastName } });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    //------------------------------------------------ Database ----------------------------
    const [residentName, setResidentName] = useState('');
    const [userId, setUserId] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [reasonOfRequest, setReasonOfRequest] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [type, setType] = useState(''); const [modeOfPayment, setModeOfPayment] = useState('');
    const [reference, setReference] = useState('');

    // gcash reference
    const [isGCashChecked, setIsGCashChecked] = useState(false);
    const [isCOPChecked, setIsCOPChecked] = useState(false);
    const [gcashInputValues, setGcashInputValues] = useState([]);

    const handleCheckboxChangeGcash = () => {
        setIsGCashChecked(!isGCashChecked);
        setModeOfPayment('G-Cash');
        setIsCOPChecked(false);
    };
    const handleCheckboxChangeCash = () => {
        setIsCOPChecked(!isCOPChecked);
        setModeOfPayment('Cash On Pick-up');
        setIsGCashChecked(false);
    };

    const renderInputTextboxes = () => {
        if (isGCashChecked) {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="gcashref">GCash Reference No.</label>
                        <input
                            type="text"
                            id="gcashRefNo"
                            name="gcashRef"
                            className="form-control"
                            onChange={(e) => setReference(e.target.value)}
                            required />
                    </div>
                </div>
            )
        }
        return (null);
    };

    //-------------------------- ADD FUNCTION -----------------------------------

    async function businessClearance(e) {
        e.preventDefault();

        try {

            await axios.post("https://dbarangay.onrender.com/businessclearance", {
                businessName, address, residentName, userId, type, reasonOfRequest, pickUpDate, modeOfPayment, reference, tFirstName, tLastName
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("You already sent the same request!");
                    }
                    else if (res.data === "notexist") {
                        setShowForm(false);
                        fetchData();
                    }
                })
                .catch(e => {
                    alert("Failed!")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }
    }

    //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
    const [editBusinessName, setEditBusinessName] = useState('');
    const [editType, setEditType] = useState('');
    const [editResidentName, setEditResidentName] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editReasonOfRequest, setEditReasonOfRequest] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const handleEditDiscard = () => { setShowEditForm(false); };

    // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
    const showEditFormHandler = (rowData) => {
        setSelectedRowData(rowData._id);
        setEditBusinessName(rowData.businessName)
        setEditType(rowData.type)
        setEditResidentName(rowData.residentName);
        setEditAddress(rowData.address);
        setEditReasonOfRequest(rowData.reasonOfRequest);
        setEditDate(rowData.pickUpDate);
        setEditStatus(rowData.status);
        setShowEditForm(true);
    };
    const updateRowData = async (id) => {
        try {
            const updatedData = {
                businessName: editBusinessName,
                address: editAddress,
                residentName: editResidentName,
                type: editType,
                reasonOfRequest: editReasonOfRequest,
                pickUpDate: editDate,
                status: editStatus,
            };


            const response = await axios.put(
                `https://dbarangay.onrender.com/update/businessclearance/${selectedRowData}`,
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
            <div className={`business-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <Notification />
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
                            </div>
                        </div>
                        <div id="services-cat-dropdown" className="col-4">
                            <div className="tabsz dropdown-center">
                                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Services Category</button>
                                <ul class="dropdown-menu dropdown-topcategory">
                                    <Link to="/d-barangay-certificate" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Barangay Certificate</a></li></Link>
                                    <Link to="/b-permit-admin" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Business Permit</a></li></Link>
                                    <Link to="/d-barangay-id" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Barangay ID</a></li></Link>
                                    <Link to="/d-barangay-installation" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Installation Permit</a></li></Link>
                                    <Link to="/d-barangay-construction" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Construction Permit</a></li></Link>
                                    <Link to="/d-barangay-indigency" className="nav-link">
                                        <li><a class="dropdown-item" className="dropdown-item text-center">Barangay Indigency</a></li></Link>
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
                    <div className="pagetitle"><h1> Business Permit  </h1> </div>
                    <section className="section">
                        <div className="row">
                            <div className="col-lg-12">
                                <div id="b-permitcard" className="card">
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
                                            <div id="b-permit-addbtn" className="col-4 text-end ">
                                                <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                                            </div>
                                        </div>
                                        <table id="b-permit-table" className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Business Name</th>
                                                    <th scope="col">Business Address </th>
                                                    <th scope="col">Business Owner </th>
                                                    <th scope="col">Ownership Type </th>
                                                    <th scope="col">Nature of Business </th>
                                                    <th scope="col">Pick-up Date </th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Reference No.</th>
                                                    <th scope="col">Status </th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getCurrentPageData().map((val) => {
                                                    return <tr key={val.id}>
                                                        <td>{val.businessName}</td>
                                                        <td>{val.address}</td>
                                                        <td>{val.residentName}</td>
                                                        <td>{val.type}</td>
                                                        <td>{val.reasonOfRequest}</td>
                                                        <td>{val.pickUpDate}</td>
                                                        <td>{val.modeOfPayment}</td>
                                                        <td>{val.reference}</td>
                                                        <td>{val.status}</td>
                                                        <td>
                                                            <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit</button>
                                                                <button
                                                                    className="btn btn-outline-danger"
                                                                    onClick={() => { deleteRow(val._id); }}>Delete</button>

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
                                        <form>
                                            <div className="certificate">
                                                <h2 className="certificate-title">Business Clearance Request Form</h2>
                                                <div className="certificate-content">

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="businessPermitField1">Business Name:</label>
                                                                <input
                                                                    type="text"
                                                                    id="businessPermitField1"
                                                                    name="businessPermitField1"
                                                                    onChange={(e) => setBusinessName(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="Address"> Address</label>
                                                                <input
                                                                    type="text"
                                                                    id="Address"
                                                                    name="Address"
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="residentsName">Owner's Name:</label>
                                                                <input
                                                                    type="text"
                                                                    id="residentName"
                                                                    name="residentName"
                                                                    onChange={(e) => setResidentName(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="residentsName">Owner's Resident ID:</label>
                                                                <input
                                                                    type="text"
                                                                    id="residentName"
                                                                    name="residentName"
                                                                    onChange={(e) => setUserId(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="ownertype">Ownership type</label>
                                                                <select
                                                                    id="ownertype"
                                                                    className="form-control"
                                                                    onChange={(e) => setType(e.target.value)}
                                                                   
                                                                >
                                                                    <option value="????" ></option>
                                                                    <option value="sole">Sole Proprietorship</option>
                                                                    <option value="partnership">Partnership/Corporation</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="reasonOfRequest">Nature of Business</label>
                                                                <input
                                                                    type="text"
                                                                    id="reasonOfRequest"
                                                                    name="reasonOfRequest"
                                                                    onChange={(e) => setReasonOfRequest(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="issuedDate">Pick-up Date:</label>
                                                                <input
                                                                    type="date"
                                                                    id="issuedDate"
                                                                    name="issuedDate"
                                                                    onChange={(e) => setPickUpDate(e.target.value)}
                                                                    className="form-control"
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label>Mode of Payment:</label>
                                                                <div>
                                                                    <input
                                                                        className="ms-1 me-1"
                                                                        type="checkbox"
                                                                        checked={isCOPChecked}
                                                                        onChange={handleCheckboxChangeCash}
                                                                    />
                                                                    Cash on Pick-up
                                                                </div>

                                                                <div className="">
                                                                    <input
                                                                        className="ms-1 me-1"
                                                                        type="checkbox"
                                                                        checked={isGCashChecked}
                                                                        onChange={handleCheckboxChangeGcash}

                                                                    />
                                                                    GCash
                                                                </div>

                                                                {renderInputTextboxes()}
                                                            </div>
                                                        </div>
                                                        <div className="form-buttons">
                                                            <button type="submit" className="btn btn-primary" onClick={businessClearance}>Submit</button>
                                                            <button type="button" className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* ------------------------------------------------- EDIT FORM --------------------------------------------------------- */}
                            {showEditForm && selectedRowData && (
                                <div className='popup-overlay'>
                                    <div className='popup-form'>
                                        <form onSubmit={updateRowData}>
                                            <div className='certificate'>
                                                <h2 className='certificate-title'>Business Clearance Request Form</h2>
                                                <div className='certificate-content'>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className='form-group'>
                                                                <label htmlFor='bname'> Business Name </label>
                                                                <input
                                                                    type='text'
                                                                    id='bname'
                                                                    name='bname'
                                                                    value={editBusinessName}
                                                                    onChange={(e) => setEditBusinessName(e.target.value)}
                                                                    className='form-control' required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className='form-group'>
                                                                <label htmlFor='address'>Business Address </label>
                                                                <input
                                                                    type='text'
                                                                    id='address'
                                                                    name='address'
                                                                    value={editAddress}
                                                                    onChange={(e) => setEditAddress(e.target.value)}
                                                                    className='form-control' required />
                                                            </div>
                                                        </div>


                                                        <div className="col-6">
                                                            <div className='form-group'>
                                                                <label htmlFor='owner'> Business Owner </label>
                                                                <input
                                                                    type='text'
                                                                    id='owner'
                                                                    name='owner'
                                                                    value={editResidentName}
                                                                    onChange={(e) => setEditResidentName(e.target.value)}
                                                                    className='form-control' required />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="ownertype">Ownership type</label>
                                                                <select
                                                                    id="ownertype"
                                                                    className="form-control"
                                                                    value={editType}
                                                                    onChange={(e) => setEditType(e.target.value)}

                                                                >
                                                                    <option value="????" ></option>
                                                                    <option value="sole">Sole Proprietorship</option>
                                                                    <option value="partnership">Partnership/Corporation</option>
                                                                </select>
                                                            </div>
                                                        </div>


                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="EditReason">Reason of Request</label>
                                                                <input
                                                                    type="text"
                                                                    id="EditReason"
                                                                    name="EditReason"
                                                                    value={editReasonOfRequest}
                                                                    onChange={(e) => setEditReasonOfRequest(e.target.value)}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="EditIssuedDate">Issued Date:</label>
                                                                <input
                                                                    type="date"
                                                                    id="EditIssuedDate"
                                                                    name="EditIssuedDate"
                                                                    value={editDate}
                                                                    onChange={(e) => setEditDate(e.target.value)}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="status">Status</label>
                                                                <select id="status"
                                                                    className="form-control"
                                                                    value={editStatus}
                                                                    onChange={(e) => setEditStatus(e.target.value)}
                                                                >
                                                                    <option value="New" >New</option>
                                                                    <option value="On Process">On Process</option>
                                                                    <option value="Processed">Processed</option>
                                                                    <option value="Declined">Declined</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className='form-buttons'>
                                                            <button type='submit' className='btn btn-primary' onClick={updateRowData}> Submit  </button>
                                                            <button type='button' className='btn btn-secondary' onClick={handleEditDiscard}> Discard </button>
                                                        </div>
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
export default BpermitAdmin;
