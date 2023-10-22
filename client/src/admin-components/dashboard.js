import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
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
    const barChartRef = useRef(null);
    const residenceClassBarChartRef = useRef(null);
    const [totalPopulation, setTotalPopulation] = useState(0);
    const [registeredVoters, setRegisteredVoters] = useState(0);
    const [registeredStudents, setRegisteredStudents] = useState(0);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [malePercentage, setMalePercentage] = useState(0);
    const [femalePercentage, setFemalePercentage] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');



    //bar chart employmentStatus 
    const [employmentStatusData, setEmploymentStatusData] = useState({
        labels: ['Employed', 'Unemployed'],
        data: [0, 0],
    });
    //pie chart age
    const [ageData, setAgeData] = useState({
        labels: ['1-12', '13-19', '20-30', '31-40', '41 Above'],
        data: [0, 0, 0, 0, 0],
    });
    //bar chart residentClass 
    const [residenceClassData, setResidenceClassData] = useState({
        labels: ['PWD', 'Solo Parent'],
        data: [0, 0],
        backgroundColor: ['blue', 'orange'], // You can specify custom colors here
    });





    // top cards ---------------------------------------------------
    useEffect(() => {
        axios.get('http://localhost:8000/get/user')
            .then((response) => {
                const userCount = response.data.length;
                setTotalPopulation(userCount);

                const maleUsers = response.data.filter((user) => user.sex === 'Male');
                const femaleUsers = response.data.filter((user) => user.sex === 'Female');
                const maleUsersCount = maleUsers.length;
                const femaleUsersCount = femaleUsers.length;
                setMaleCount(maleUsersCount);
                setFemaleCount(femaleUsersCount);

                setMalePercentage((maleUsersCount / userCount) * 100);
                setFemalePercentage((femaleUsersCount / userCount) * 100);

                const registeredVotersCount = response.data.filter((user) => user.voterRegistration === 'Registeredvoter').length;
                setRegisteredVoters(registeredVotersCount);

                const registeredStudentsCount = response.data.filter((user) => user.employmentStatus === 'Student').length;
                setRegisteredStudents(registeredStudentsCount);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    //pie chart fetch data AGE-----------------------------------------------------------------------------------------------------------
    useEffect(() => {
        axios.get('http://localhost:8000/get/user')
            .then((response) => {
                const userData = response.data;
                const ageCounts = [0, 0, 0, 0, 0];

                userData.forEach((user) => {
                    const age = user.age; // Assuming there's an "age" field in the user data
                    if (age >= 1 && age <= 12) {
                        ageCounts[0]++;
                    } else if (age >= 13 && age <= 19) {
                        ageCounts[1]++;
                    } else if (age >= 20 && age <= 30) {
                        ageCounts[2]++;
                    } else if (age >= 31 && age <= 40) {
                        ageCounts[3]++;
                    } else {
                        ageCounts[4]++; // For ages '41 Above'
                    }
                });

                setAgeData({
                    ...ageData,
                    data: ageCounts,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    //pie chart display AGE-----------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const pieChartTopCtx = pieChartTopRef.current.getContext('2d');
        let pieChartTopInstance = null;

        const createPieChartTop = () => {
            if (ageData.labels.length > 0) {
                pieChartTopInstance = new Chart(pieChartTopCtx, {
                    type: 'pie',
                    data: {
                        labels: ageData.labels,
                        datasets: [
                            {
                                data: ageData.data,
                                backgroundColor: [
                                    'red', 'blue', 'yellow', 'green', 'purple',
                                ],
                            },
                        ],
                    },
                });
            }
        };
        createPieChartTop();
        return () => {
            if (pieChartTopInstance) {
                pieChartTopInstance.destroy();
            }
        };
    }, [ageData]);
    // Bar chart fetch data employment status -------------------------------------
    useEffect(() => {
        axios.get('http://localhost:8000/get/user')
            .then((response) => {
                const userData = response.data;
                const employmentStatusCounts = [0, 0];

                userData.forEach((user) => {
                    const employmentStatus = user.employmentStatus;
                    if (employmentStatus === 'Employed') {
                        employmentStatusCounts[0]++;
                    } else if (employmentStatus === 'Unemployed') {
                        employmentStatusCounts[1]++;
                    }
                });

                // Update state with employment status data
                setEmploymentStatusData({
                    ...employmentStatusData,
                    data: employmentStatusCounts,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    // bar chart display data employment status-------------------------------------
    useEffect(() => {
        const barChartCtx = barChartRef.current.getContext('2d');
        let barChartInstance = null;

        const createBarChart = () => {
            if (employmentStatusData.labels.length > 0) {
                barChartInstance = new Chart(barChartCtx, {
                    type: 'bar',
                    data: {
                        labels: employmentStatusData.labels,
                        datasets: [
                            {
                                label: 'Employment Status',
                                data: employmentStatusData.data,
                                backgroundColor: [
                                    'red', 'blue',
                                ],
                            },
                        ],
                    },
                });
            }
        };

        createBarChart();

        return () => {
            if (barChartInstance) {
                barChartInstance.destroy();
            }
        };
    }, [employmentStatusData]);
    // Bar chart fetch data resident Class -------------------------------------
    useEffect(() => {
        axios.get('http://localhost:8000/get/user')
            .then((response) => {
                const userData = response.data;
                // Initialize counts for PWD and Solo Parent users
                const residenceClassCounts = [0, 0];
                userData.forEach((user) => {
                    const residenceClass = user.residenceClass; // Assuming there's a "residenceClass" field in the user data
                    if (residenceClass === 'PWD') {
                        residenceClassCounts[0]++;
                    } else if (residenceClass === 'soloParent') {
                        residenceClassCounts[1]++;
                    }
                });
                // Update state with residence class data
                setResidenceClassData((prevData) => {
                    return {
                        ...prevData,
                        data: residenceClassCounts,
                    };
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // bar chart display data resident Classs-------------------------------------
    useEffect(() => {
        const residenceClassBarChartCtx = residenceClassBarChartRef.current.getContext('2d');
        let residenceClassBarChartInstance = null;

        const createResidenceClassBarChart = () => {
            if (residenceClassData.labels.length > 0) {
                residenceClassBarChartInstance = new Chart(residenceClassBarChartCtx, {
                    type: 'bar',
                    data: {
                        labels: residenceClassData.labels,
                        datasets: [
                            {
                                label: 'Residence Class',
                                data: residenceClassData.data,
                                backgroundColor: residenceClassData.backgroundColor,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        };

        createResidenceClassBarChart();

        return () => {
            if (residenceClassBarChartInstance) {
                residenceClassBarChartInstance.destroy();
            }
        };
    }, [residenceClassData]);






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

    useEffect(() => {
        // Make an HTTP request to fetch user information
        axios.get('http://localhost:8000/get/user')
            .then((response) => {
                console.log('Response data:', response.data); // Log the entire response data
                const userData = response.data;
                console.log('User data:', userData); // Log the user data
                setName(userData.name);
                setEmail(userData.email);
                setProfile(userData.profile);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


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
                                            <h5>{name}</h5>
                                            <h5>{email}</h5>
                                        </div>
                                    </div>
                                    <div className="lowerprofile">
                                        <div className="button-profile1">
                                            <NavLink to="/residents-accounts" activeClassName="active">
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
                    <div className="dashboard-topside d-flex justify-content-evenly w-100">
                        <div className="card topcard m-1 col-md-3">
                            <div className="total-population card-body text-center">
                                <h5 className="card-title">Total Population</h5>
                                <p className="card-text">The current population of the barangay.</p>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    Population: {totalPopulation}
                                </p>
                            </div>
                        </div>
                        <div className="card barangay-voters card topcard m-1 col-md-3">
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

                        <div className="Total-students card topcard m-1 col-md-3">
                            <div className="card-body text-center">
                                <h5 className="card-title">Registered Students</h5>
                                <p className="card-text">The current Students of the barangay.</p>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    Students: {registeredStudents}
                                </p>
                            </div>
                        </div>
                        <div className="male-female-percentages card topcard m-1 col-md-3">
                            <div className="card-body text-center">
                                <h5 className="card-title">Male and Female Statistics</h5>
                                <p className="card-text" style={{ fontSize: '20px' }}>
                                    Male: {maleCount} ({malePercentage.toFixed(2)}%)
                                </p>
                                <p className="card-text" style={{ fontSize: '20px' }}>
                                    Female: {femaleCount} ({femalePercentage.toFixed(2)}%)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="card">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h5 className="card-title">Bar Chart</h5>
                                        <canvas ref={barChartRef} id="barChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 p-0">
                        <div className="row">
                            <div className="col-6 col-sm-12">
                                <div className="card">
                                    <div className="filter">
                                    </div>
                                    <div className="pie-chart-top card-body Chart">
                                        <h5 className="card-title">AGE</h5>
                                        <canvas ref={pieChartTopRef} id="pieChartTop" width="200" height="100"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-12">
                                <div className="card">
                                    <div className="filter">
                                    </div>
                                    <div className="pie-chart-top card-body Chart">
                                        <h5 className="card-title">Resident Class</h5>
                                        <canvas ref={residenceClassBarChartRef} id="residentClassChart" width="200" height="100"></canvas>
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
