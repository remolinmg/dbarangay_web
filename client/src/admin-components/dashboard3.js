import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
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
    BsMailbox,
    BsFillInfoCircleFill,
} from "react-icons/bs";

import {
    RiFolderWarningFill,
} from "react-icons/ri";
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import moment from 'moment';
function Dashboard3() {

    const [totalCertificates, setTotalCertificates] = useState(0);
    const [certificateData, setCertificateData] = useState({
        newCount: 0,
        onProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });


    useEffect(() => {
        // Fetch Barangay Certificate data
        axios.get('https://dbarangay.onrender.com/get/barangaycertificate')
            .then((response) => {
                const certificatesData = response.data;
                // Calculate the total number of Barangay Certificates
                const total = certificatesData.length;
                setTotalCertificates(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);




    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/barangaycertificate')
            .then((response) => {
                const certificateData = response.data;

                const newCount = certificateData.filter((certificate) => certificate.status === 'New').length;
                const onProcessCount = certificateData.filter((certificate) => certificate.status === 'On Process').length;
                const processedCount = certificateData.filter((certificate) => certificate.status === 'Processed').length;
                const declinedCount = certificateData.filter((certificate) => certificate.status === 'Declined').length;

                setCertificateData({ newCount, onProcessCount, processedCount, declinedCount });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const certificateChartData = {
        labels: ['Certificate Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [certificateData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [certificateData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [certificateData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [certificateData.declinedCount],
            },
        ],
    };

    const certificateOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    // ------------------------------------BUSINESS CLEARANCE---------------------------------------------------------------------
    const [totalBusinessClearance, setTotalBusinessClearance] = useState(0);
    const [businessClearanceData, setBusinessClearanceData] = useState({
        newCount: 0,
        onProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/businessclearance')
            .then((response) => {
                const businessClearanceData = response.data;

                const newCount = businessClearanceData.filter((clearance) => clearance.status === 'New').length;
                const onProcessCount = businessClearanceData.filter((clearance) => clearance.status === 'On Process').length;
                const processedCount = businessClearanceData.filter((clearance) => clearance.status === 'Processed').length;
                const declinedCount = businessClearanceData.filter((clearance) => clearance.status === 'Declined').length;

                setBusinessClearanceData({ newCount, onProcessCount, processedCount, declinedCount });

                // Calculate total requests
                const total = newCount + onProcessCount + processedCount + declinedCount;
                setTotalBusinessClearance(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const businessClearanceChartData = {
        labels: ['Business Clearance Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [businessClearanceData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [businessClearanceData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [businessClearanceData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [businessClearanceData.declinedCount],
            },
        ],
    };

    const businessClearanceOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // -----------------------------------------------BARANGAY ID-----------------------------------------------------------
    const [totalBarangayId, setTotalBarangayId] = useState(0);
    const [barangayIdData, setBarangayIdData] = useState({
        newCount: 0,
        idonProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/barangayid')
            .then((response) => {
                const barangayIdData = response.data;

                const newCount = barangayIdData.filter((item) => item.status === 'New').length;
                const onProcessCount = barangayIdData.filter((item) => item.status === 'On Process').length;
                const processedCount = barangayIdData.filter((item) => item.status === 'Processed').length;
                const declinedCount = barangayIdData.filter((item) => item.status === 'Declined').length;

                setBarangayIdData({ newCount, onProcessCount, processedCount, declinedCount });

                // Calculate total requests
                const total = newCount + onProcessCount + processedCount + declinedCount;
                setTotalBarangayId(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const barangayIdChartData = {
        labels: ['Barangay ID Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [barangayIdData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [barangayIdData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [barangayIdData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [barangayIdData.declinedCount],
            },
        ],
    };

    const barangayIdOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // ---------------------------------------BARANGAY INSTALLATION-----------------------------------------------------------------
    const [totalInstallation, setTotalInstallation] = useState(0);
    const [installationData, setInstallationData] = useState({
        newCount: 0,
        onProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/installation')
            .then((response) => {
                const installationData = response.data;

                const newCount = installationData.filter((installation) => installation.status === 'New').length;
                const onProcessCount = installationData.filter((installation) => installation.status === 'On Process').length;
                const processedCount = installationData.filter((installation) => installation.status === 'Processed').length;
                const declinedCount = installationData.filter((installation) => installation.status === 'Declined').length;

                setInstallationData({ newCount, onProcessCount, processedCount, declinedCount });

                // Calculate total requests
                const total = newCount + onProcessCount + processedCount + declinedCount;
                setTotalInstallation(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const installationChartData = {
        labels: ['Installation Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [installationData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [installationData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [installationData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [installationData.declinedCount],
            },
        ],
    };

    const installationOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    // ---------------------------------------BARANGAY CONSTRUCTION-----------------------------------------------------------------
    const [totalConstruction, setTotalConstruction] = useState(0);
    const [constructionStatusData, setConstructionStatusData] = useState({
        newCount: 0,
        onProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/construction')
            .then((response) => {
                const constructionStatusData = response.data;

                const newCount = constructionStatusData.filter((construction) => construction.status === 'New').length;
                const onProcessCount = constructionStatusData.filter((construction) => construction.status === 'On Process').length;
                const processedCount = constructionStatusData.filter((construction) => construction.status === 'Processed').length;
                const declinedCount = constructionStatusData.filter((construction) => construction.status === 'Declined').length;

                setConstructionStatusData({ newCount, onProcessCount, processedCount, declinedCount });
                const total = newCount + onProcessCount + processedCount + declinedCount;
                setTotalConstruction(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const constructionStatusChartData = {
        labels: ['Construction Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [constructionStatusData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [constructionStatusData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [constructionStatusData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [constructionStatusData.declinedCount],
            },
        ],
    };

    const constructionStatusOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    // ---------------------------------------BARANGAY INDIGENCY-----------------------------------------------------------------
    const [indigencyData, setIndigencyData] = useState({
        newCount: 0,
        onProcessCount: 0,
        processedCount: 0,
        declinedCount: 0,
    });
    const [totalIndigency, setTotalIndigency] = useState(0);

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/barangayindigency')
            .then((response) => {
                const indigencyData = response.data;

                const newCount = indigencyData.filter((indigency) => indigency.status === 'New').length;
                const onProcessCount = indigencyData.filter((indigency) => indigency.status === 'On Process').length;
                const processedCount = indigencyData.filter((indigency) => indigency.status === 'Processed').length;
                const declinedCount = indigencyData.filter((indigency) => indigency.status === 'Declined').length;

                setIndigencyData({ newCount, onProcessCount, processedCount, declinedCount });

                // Calculate total requests
                setIndigencyData({ newCount, onProcessCount, processedCount, declinedCount });

                // Calculate total indigency
                const total = newCount + onProcessCount + processedCount + declinedCount;
                setTotalIndigency(total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const indigencyChartData = {
        labels: ['Indigency Status'],
        datasets: [
            {
                label: 'New',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [indigencyData.newCount],
            },
            {
                label: 'On Process',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [indigencyData.onProcessCount],
            },
            {
                label: 'Processed',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
                data: [indigencyData.processedCount],
            },
            {
                label: 'Declined',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                data: [indigencyData.declinedCount],
            },
        ],
    };

    const indigencyOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    //SIDEBAR - TOPBAR ---------------------------------------------------------------------------------------

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
        <div className='dbody'>
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
                        <Link className="navbar-brand" to="/dashboard">
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
                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Logs</span>
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

            <div className={`dashboard-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <Notification />
                <div className='dashboardlinktop d-flex justify-content-center'>
                    <ul className="nav d-flex justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px', background: "rgba(54, 162, 235, 0.6)" }} aria-current="page" href="/dashboard3">Document Requests</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px' }} aria-current="page" href="/dashboard">Residents</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px' }} href="/dashboard1">Incidents Reports</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px' }} href="/dashboard2">Health</a>
                        </li>
                    </ul>
                </div>



                <div className="row m-5 mt-0">
                    <div>
                        {/* First Row CARDS */}
                        {/* Card 1 */}
                        <div className="dashboard-topside d-flex justify-content-evenly w-100">
                            <Link to="/d-barangay-certificate" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Barangay Certificate</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Barangaycertificate Recorded.</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalCertificates}
                                    </p>
                                </div>
                            </Link>
                            {/* Card 2 */}
                            <Link to="/b-permit-admin" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Business Permit</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Business Permit Recorded.</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalBusinessClearance}
                                    </p>
                                </div>
                            </Link>
                            {/* Card 3 */}
                            <Link to="/d-barangay-id" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Barangay ID</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Barangay ID Recorded.</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalBarangayId}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Second Row CARDS */}
                        {/* Card 4 */}
                        <div className="dashboard-topside d-flex justify-content-evenly w-100">
                            <Link to="/d-barangay-installation" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Barangay Installation</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Barangay Installation Recorded.</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalInstallation}
                                    </p>
                                </div>
                            </Link>
                            {/* Card 5 */}
                            <Link to="/d-barangay-construction" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Barangay Construction</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Barangay Construction Recorded</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalConstruction}
                                    </p>
                                </div>
                            </Link>
                            {/* Card 6 */}
                            <Link to="/d-barangay-indigency" className="card topcard m-1 col-md-4 p-0" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="total-population card-body text-center">
                                    <h5 className="card-title">Barangay Indigency</h5>
                                    <p className="card-text" style={{ fontSize: '24px' }}>Total Barangay Indigency Recorded.</p>
                                    <p className="card-text" style={{ fontSize: '24px' }}>
                                        Total Certificates: {totalIndigency}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {/* FIRST PART */}
                        <div className="col-md-12 mt-2 p-0">
                            <div className="row ">
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">
                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Barangay Certificate Requests</h5>
                                                <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="Barangay Certificate Request status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={certificateChartData} options={certificateOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">
                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Business Permit Requests</h5>
                                                <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="Business Permit Request status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={businessClearanceChartData} options={businessClearanceOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">

                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Barangay ID Requests</h5>
                                                <h5 className="tooltipiconright" data-toggle="tooltip" data-placement="top" aria-labels="Barangay ID Requests Request status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={barangayIdChartData} options={barangayIdOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECOND PART */}
                        <div className="col-md-12 mt-2">
                            <div className="row">
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">
                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Barangay Installation Requests</h5>
                                                <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="Barangay Installation Requests status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={installationChartData} options={installationOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">
                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Barangay Construction Requests</h5>
                                                <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="Barangay Construction Requests status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={constructionStatusChartData} options={constructionStatusOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-4 p-1">
                                    <div className="card barchartcard">
                                        <div className="filter"></div>
                                        <div className="bar-chart card-body Chart">
                                            <div className="charttopdivider d-flex justify-content-between sm-5">
                                                <h5>Barangay Indigency Requests</h5>
                                                <h5 className="tooltipiconright" data-toggle="tooltip" data-placement="top" aria-labels="Barangay Indigency Requests status">
                                                    <BsFillInfoCircleFill /> </h5>
                                            </div>
                                            <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                                <Bar data={indigencyChartData} options={indigencyOptions} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
}

export default Dashboard3;
