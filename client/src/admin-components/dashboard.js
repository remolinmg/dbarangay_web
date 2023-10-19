import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
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
    BsMailbox,
} from "react-icons/bs";

import {
    RiFolderWarningFill,
} from "react-icons/ri";
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { FaUserCircle } from "react-icons/fa";


function Dashboard() {
    const pieChartTopRef = useRef(null);
    const pieChartBottomRef = useRef(null);
    const lineChartRef = useRef(null);
    //pie chart -----------------------------------------------------------------------------------------------------------
    const [totalPopulation, setTotalPopulation] = useState(10000); // Initial total population
    const [registeredVoters, setRegisteredVoters] = useState(1000); // Initial registered voters

    // Simulate fetching data from a backend or database
    useEffect(() => {
        setTimeout(() => {
            const updatedTotalPopulation = 15000; // Updated total population
            const updatedRegisteredVoters = 15000; // Updated registered voters

            setTotalPopulation(updatedTotalPopulation);
            setRegisteredVoters(updatedRegisteredVoters);
        }, 2000);
    }, []);

    useEffect(() => {
        const pieChartTopCtx = pieChartTopRef.current.getContext('2d');
        const pieChartBottomCtx = pieChartBottomRef.current.getContext('2d');

        let pieChartTopInstance = null;
        let pieChartBottomInstance = null;

        const createPieChartTop = () => {
            pieChartTopInstance = new Chart(pieChartTopCtx, {
                type: 'pie',
                data: {
                    labels: ['1-5', '6-12', '13-19', '20-30', '30-50'],
                    datasets: [
                        {
                            data: [12, 19, 3, 5, 2],
                            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
                        },
                    ],
                },

            });
        };

        const createPieChartBottom = () => {
            pieChartBottomInstance = new Chart(pieChartBottomCtx, {
                type: 'pie',
                data: {
                    labels: ['Male', 'Female', 'Undisclosed'],
                    datasets: [
                        {
                            data: [25, 35, 40], // Replace with your data
                            backgroundColor: ['orange', 'purple', 'pink'], // Customize colors
                        },
                    ],
                },
            });
        };

        createPieChartTop();
        createPieChartBottom();

        return () => {
            if (pieChartTopInstance) {
                pieChartTopInstance.destroy();
            }
            if (pieChartBottomInstance) {
                pieChartBottomInstance.destroy();
            }
        };
    }, []);
    //line chart ------------------------------------------------------------------------------
    useEffect(() => {
        const lineChartCtx = lineChartRef.current.getContext('2d');
        let lineChartInstance = null;

        const createLineChart = () => {
            lineChartInstance = new Chart(lineChartCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [500, 800, 900, 700, 600, 1000],
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            yAxisID: 'revenue-axis',
                        },
                        {
                            label: 'Profit',
                            data: [200, 400, 600, 800, 1000, 1200],
                            borderColor: 'rgb(192, 75, 192)',
                            tension: 0.1,
                            yAxisID: 'profit-axis',
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            id: 'revenue-axis',
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            id: 'profit-axis',
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    },
                },
            });
        };

        createLineChart();

        return () => {
            if (lineChartInstance) {
                lineChartInstance.destroy();
            }
        };
    }, []);



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


            <div className={`dashboard-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <div className="row m-5">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="dashboard-topside d-flex justify-content-evenly w-100">
                                <div className="card topcard m-1 col-md-4">
                                    <div className="total-population card-body text-center">
                                        <h5 className="card-title">Total Population</h5>
                                        <p className="card-text">The current population of the barangay.</p>
                                        <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                            Population: {totalPopulation}
                                        </p>
                                    </div>
                                </div>
                                <div className="barangay-voters card topcard m-1 col-md-4">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Registered Voters</h5>
                                        <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                            Registered Voters: {registeredVoters}
                                        </p>
                                        <p className="card-text" style={{ fontSize: '20px' }}>
                                            Percentage of Registered Voters: {((registeredVoters / totalPopulation) * 100).toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                                <div className="Total-students card topcard m-1 col-md-4">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Student Percentage</h5>
                                        <p className="card-text">The current Students of the barangay.</p>
                                        <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                            Students: 45%
                                            <br />
                                            Non Students: 55%
                                        </p>
                                    </div>
                                </div>
                            </div>





                            <div className="col-12 p-1">
                                <div className="card mt-3">
                                    <div className="filter">
                                        {/* Dropdown menu */}
                                        {/* ... */}
                                    </div>

                                    <div className="axis-chart card-body Chart">
                                        <h5 className="card-title">Line Chart</h5>

                                        {/* Line Chart container */}
                                        <canvas ref={lineChartRef} id="lineChart" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-6 col-sm-12">
                                <div className="card">
                                    <div className="filter">
                                        {/* Dropdown menu */}
                                        {/* ... */}
                                    </div>

                                    <div className="pie-chart-top card-body Chart">
                                        <h5 className="card-title">AGE</h5>

                                        {/* Pie Chart container */}
                                        <canvas ref={pieChartTopRef} id="pieChartTop" width="200" height="100"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-12">
                                <div className="pie-chart-bottom card mt-3">
                                    <div className="card-body border">
                                        <h5 className="card-title">Sex Chart</h5>
                                        <p className="card-text">Total Sex Registered Citizen</p>
                                        {/* Add a canvas for the bottom pie chart */}
                                        <canvas ref={pieChartBottomRef} id="pieChartBottom" width="200" height="100"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Dashboard;
