import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import axios from 'axios';
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


function BpromotionAdminOthers() {
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
            const response = await axios.get('http://localhost:8000/get/promotebusiness');
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
            await axios.delete(`http://localhost:8000/delete/promotebusiness/${id}`);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    //------------------------------------------------ Database ----------------------------
    const [residentName, setResidentName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [hours, setHours] = useState('');
    const [contact, setContact] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState();
    //-------------------------- ADD FUNCTION -----------------------------------

    const promoteBusiness = () => {
        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('address', address);
        formData.append('hours', hours);
        formData.append('contact', contact);
        formData.append('category', category);
        formData.append('residentName', residentName);
        formData.append('file', file);
        axios.post('http://localhost:8000/promotebusiness', formData).then(res => {
            if (res.data === "Error saving data to MongoDB") {
                alert("Business Already Exist!");
            }
            else if (res.data === "File and text data saved to MongoDB") {
            }
        })
            .catch(er => console.log(er))
    };

    // EDIT FORM STATES (ShowForms) ------------------------------

    const [editResidentName, setEditResidentName] = useState('');
    const [editBusinessName, setEditBusinessName] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editHours, setEditHours] = useState('');
    const [editContact, setEditContact] = useState('');
    const [editFile, setEditFile] = useState('');
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const handleEditDiscard = () => { setShowEditForm(false); };

    // Function to show the edit form with the default data of the selected row
    const showEditFormHandler = (rowData) => {
        setSelectedRowData(rowData._id);
        setEditResidentName(rowData.residentName);
        setEditBusinessName(rowData.businessName);
        setEditAddress(rowData.address);
        setEditCategory(rowData.category);

        setEditHours(rowData.hours);
        setEditContact(rowData.contact);
        setShowEditForm(true);
    };

    const updateRowData = async () => {
        try {
            const formData = new FormData();
            formData.append('residentName', editResidentName);
            formData.append('businessName', editBusinessName);
            formData.append('address', editAddress);
            formData.append('category', editCategory);
            formData.append('file', editFile);
            formData.append('hours', editHours);
            formData.append('contact', editContact);

            const response = await axios.put(
                `http://localhost:8000/update/promotebusiness/${selectedRowData}`,
                formData
            );
            console.log(response.data);
            fetchData();
            setShowEditForm(false);
        } catch (error) {
            console.error(error);
        }
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
                                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                                <ul className="dropdown-menu dropdown-topcategory">
                                    <li><Link to="/b-promotion-admin" className="dropdown-item text-center">Grocery</Link></li>
                                    <li><Link to="/b-promotion-fastfood" className="dropdown-item text-center">Fastfood</Link></li>
                                    <li><Link to="/b-promotion-hardware" className="dropdown-item text-center">Hardware</Link></li>
                                    <li><Link to="/b-promotion-others" className="dropdown-item text-center">Others</Link></li>
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
                    <div className="pagetitle"><h1> Others Table </h1> </div>
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
                                                    <th scope="col">Business Name </th>
                                                    <th scope="col">Business Address </th>
                                                    <th scope="col">Business Hours </th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Contact Number </th>
                                                    <th scope="col">Business Owner</th>
                                                    <th scope="col">Business Picture </th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {getCurrentPageData().map((val) => {
                                                    return <tr key={val._id}>
                                                        <th scope="row">{val._id}</th>
                                                        <td>{val.businessName}</td>
                                                        <td>{val.address}</td>
                                                        <td>{val.hours}</td>
                                                        <td>{val.category}</td>
                                                        <td>{val.contact}</td>
                                                        <td>{val.residentName}</td>
                                                        <td>
                                                            <img
                                                                style={{ width: "100px", height: "100px" }}
                                                                src={require(`../../../server/uploads/promotebusiness/${val.filename}`)}
                                                                alt=""
                                                                className="business-picture"
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit</button>
                                                                <form >
                                                                    <input type='hidden' name='id' value="" />
                                                                    <button
                                                                        className="btn btn-outline-danger"
                                                                        type="submit"
                                                                        name="deleteRow"
                                                                        onClick={() => { deleteRow(val._id); }}>Delete</button>
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
                                        <form>
                                            <div className="certificate">
                                                <h2 className="certificate-title">ADD BUSINESS INFORMATION</h2>
                                                <div className="certificate-content">
                                                    <div className="form-group">
                                                        <label htmlFor="bname">Business Name</label>
                                                        <input
                                                            type="text"
                                                            id="businessName"
                                                            name="businessName"
                                                            onChange={(e) => setBusinessName(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="address">Business Address</label>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>




                                                    <div className="form-group">
                                                        <label htmlFor="bhours">Business Hours</label>
                                                        <input
                                                            type="text"
                                                            id="hours"
                                                            name="hours"
                                                            onChange={(e) => setHours(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="owner">Business Category</label>
                                                        <input
                                                            type="text"
                                                            id="category"
                                                            name="category"
                                                            onChange={(e) => setCategory(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="bcontact">Contact Number</label>
                                                        <input
                                                            type="text"
                                                            id="contact"
                                                            name="contact"
                                                            onChange={(e) => setContact(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="owner">Business Owner</label>
                                                        <input
                                                            type="text"
                                                            id="residentName"
                                                            name="residentName"
                                                            onChange={(e) => setResidentName(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Add Business Picture */}
                                                    <div className="form-group">
                                                        <label htmlFor="picture">Business Picture</label>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            name="file"
                                                            accept="image/*"
                                                            onChange={(e) => setFile(e.target.files[0])}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-buttons">
                                                        <button type="submit" className="btn btn-primary" onClick={promoteBusiness}>
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
                                        <form>
                                            <div className="certificate">
                                                <h2 className="certificate-title">EDIT BUSINESS INFORMATION</h2>
                                                <div className="certificate-content">
                                                    <div className="form-group">
                                                        <label htmlFor="bname">Business Name</label>
                                                        <input
                                                            type="text"
                                                            id="bname"
                                                            name="bname"
                                                            value={editBusinessName}
                                                            onChange={(e) => setEditBusinessName(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="bhours">Address</label>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            value={editAddress}
                                                            onChange={(e) => setEditAddress(e.target.value)}
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

                                                    <div className="form-group">
                                                        <label htmlFor="category">Business Category</label>
                                                        <input
                                                            type="text"
                                                            id="category"
                                                            name="category"
                                                            value={editCategory}
                                                            onChange={(e) => setEditCategory(e.target.value)}
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

                                                    <div className="form-group">
                                                        <label htmlFor="owner">Business Owner</label>
                                                        <input
                                                            type="text"
                                                            id="owner"
                                                            name="owner"
                                                            value={editResidentName}
                                                            onChange={(e) => setEditResidentName(e.target.value)}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Add Business Picture */}
                                                    <div className="form-group">
                                                        <label htmlFor="file">Business Picture</label>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            name="file"
                                                            accept="image/*"
                                                            onChange={(e) => setEditFile(e.target.files[0])}
                                                            className="form-control"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-buttons">
                                                        <button type="submit" className="btn btn-primary" onClick={updateRowData}>
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

export default BpromotionAdminOthers;
