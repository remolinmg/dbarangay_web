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
function Dashboard() {


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

    // GRAPH EMPLOYMENT
    const [employmentChartData, setEmploymentChartData] = useState({
        employedData: 0,
        unemployedData: 0,
    });
    // GRAPH CIVILSTATUS
    const [civilStatusChartData, setCivilStatusChartData] = useState({
        singleCount: 0,
        marriedCount: 0,
        widowCount: 0,
        separatedCount: 0,
    });
    // GRAPH EDUCATIONAL ATTAINEMENT
    const [educationChartData, setEducationChartData] = useState({
        Undergraduate: 0,
        Elementary: 0,
        Highschool: 0,
        Bachelor: 0,
        Postgrad: 0,
        Doctoral: 0,
    });
    // GRAPH AGE
    const [ageChartData, setAgeChartData] = useState({
        age1to12Count: 0,
        age13to19Count: 0,
        age20to30Count: 0,
        age31to40Count: 0,
        age41to50Count: 0,
        age51to59Count: 0,
        age60AboveCount: 0,
    });
    // top cards ---------------------------------------------------
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/user')
            .then((response) => {
                const userData = response.data;

                // Filter the user data to get only "active" residents
                const activeResidents = userData.filter((user) => user.status === 'active');

                // Set the total population to the count of "active" residents
                setTotalPopulation(activeResidents.length);

                const maleUsers = activeResidents.filter((user) => user.sex === 'Male');
                const femaleUsers = activeResidents.filter((user) => user.sex === 'Female');
                const maleUsersCount = maleUsers.length;
                const femaleUsersCount = femaleUsers.length;
                setMaleCount(maleUsersCount);
                setFemaleCount(femaleUsersCount);

                setMalePercentage((maleUsersCount / activeResidents.length) * 100);
                setFemalePercentage((femaleUsersCount / activeResidents.length) * 100);

                const registeredVotersCount = activeResidents.filter((user) => user.votersRegistration === 'Registered').length;
                setRegisteredVoters(registeredVotersCount);

                const registeredStudentsCount = activeResidents.filter((user) => user.employmentStatus === 'Student').length;
                setRegisteredStudents(registeredStudentsCount);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // BAR GRAPH EMPLOYMENT STATUS
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/user')
            .then((response) => {
                const userData = response.data;

                // Filter the user data to get only "active" residents
                const activeResidents = userData.filter((user) => user.status === 'active');

                // Count the number of employed and unemployed residents among "active" residents
                const employedCount = activeResidents.filter((user) => user.employmentStatus === 'Employed').length;
                const unemployedCount = activeResidents.filter((user) => user.employmentStatus === 'Unemployed').length;

                setEmploymentChartData({ employedCount, unemployedCount });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const employmentData = {
        labels: ['Employment Status'],
        datasets: [
            {
                label: 'Employed',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [employmentChartData.employedCount],
            },
            {
                label: 'Unemployed',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [employmentChartData.unemployedCount],
            },
        ],
    };
    const employmentOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // BAR GRAPH CIVIL STATUS 
    useEffect(() => {
        // Make an HTTP request to the API endpoint to get user data
        axios.get('https://dbarangay.onrender.com/get/user')
            .then(response => {
                // Count the number of users with different civil statuses
                const singleCount = response.data.filter(user => user.civilStatus === 'Single').length;
                const marriedCount = response.data.filter(user => user.civilStatus === 'Married').length;
                const widowCount = response.data.filter(user => user.civilStatus === 'Widowed').length;
                const separatedCount = response.data.filter(user => user.civilStatus === 'Separated').length;

                setCivilStatusChartData({ singleCount, marriedCount, widowCount, separatedCount });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);
    const civilStatusData = {
        labels: ['Civil Status'],
        datasets: [
            {
                label: 'Single',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [civilStatusChartData.singleCount],
            },
            {
                label: 'Married',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [civilStatusChartData.marriedCount],
            },
            {
                label: 'Widowed',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: [civilStatusChartData.widowCount],
            },
            {
                label: 'Separated',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                data: [civilStatusChartData.separatedCount],
            },
        ],
    };
    const civilStatusOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Doughnut Educational Attainment
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/user')
            .then((response) => {
                const userData = response.data;

                // Filter the user data to get only "active" residents
                const activeResidents = userData.filter((user) => user.status === 'active');

                // Count the number of users with different educational attainments among "active" residents
                const undergraduateCount = activeResidents.filter((user) => user.highestEducation === 'Undergraduate').length;
                const elementaryCount = activeResidents.filter((user) => user.highestEducation === 'Elementary').length;
                const highSchoolCount = activeResidents.filter((user) => user.highestEducation === 'Highschool').length;
                const bachelorCount = activeResidents.filter((user) => user.highestEducation === 'Bachelor').length;
                const postgraduateCount = activeResidents.filter((user) => user.highestEducation === 'Postgrad').length;
                const doctoralCount = activeResidents.filter((user) => user.highestEducation === 'Doctoral').length;
                const noFormalCount = activeResidents.filter((user) => user.highestEducation === 'No Formal Education').length;

                setEducationChartData({
                    undergraduateCount,
                    elementaryCount,
                    highSchoolCount,
                    bachelorCount,
                    postgraduateCount,
                    doctoralCount,
                    noFormalCount
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const educationData = {
        labels: [
            'No Formal Education',
            'Undergraduate',
            'Elementary',
            'High School',
            "Bachelor's Degree",
            "Postgraduate (Master's Degree)",
            "Doctoral (PhD)",
        ],
        datasets: [
            {
                data: [
                    educationChartData.undergraduateCount,
                    educationChartData.elementaryCount,
                    educationChartData.highSchoolCount,
                    educationChartData.bachelorCount,
                    educationChartData.postgraduateCount,
                    educationChartData.doctoralCount,
                    educationChartData.noFormalCount
                ],
                backgroundColor: [
                    'rgba(50, 100, 220, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(128, 128, 0, 0.6)',
                ],
            },
        ],
    };

    const educationOptions = {
        maintainAspectRatio: true,
        legend: {
            display: true,
        },
    };

    // Age Distribution
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/user')
            .then((response) => {
                const userData = response.data;

                // Filter the user data to get only "active" residents
                const activeResidents = userData.filter((user) => user.status === 'active');

                // Count the number of users in different age groups among "active" residents
                const age1to12Count = activeResidents.filter((user) => user.age >= 1 && user.age <= 12).length;
                const age13to19Count = activeResidents.filter((user) => user.age >= 13 && user.age <= 19).length;
                const age20to30Count = activeResidents.filter((user) => user.age >= 20 && user.age <= 30).length;
                const age31to40Count = activeResidents.filter((user) => user.age >= 31 && user.age <= 40).length;
                const age41to50Count = activeResidents.filter((user) => user.age >= 41 && user.age <= 50).length;
                const age51to59Count = activeResidents.filter((user) => user.age >= 51 && user.age <= 59).length;
                const age60AboveCount = activeResidents.filter((user) => user.age >= 60).length;

                setAgeChartData({
                    age1to12Count,
                    age13to19Count,
                    age20to30Count,
                    age31to40Count,
                    age41to50Count,
                    age51to59Count,
                    age60AboveCount,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const ageData = {
        labels: [
            '12 below',
            '13-19',
            '20-30',
            '31-40',
            '41-50',
            '51-59',
            '60 Above',
        ],
        datasets: [
            {
                data: [
                    ageChartData.age1to12Count,
                    ageChartData.age13to19Count,
                    ageChartData.age20to30Count,
                    ageChartData.age31to40Count,
                    ageChartData.age41to50Count,
                    ageChartData.age51to59Count,
                    ageChartData.age60AboveCount,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(0, 204, 102, 0.6)',
                    'rgba(255, 128, 0, 0.6)',
                ],
            },
        ],
    };
    const ageOptions = {
        maintainAspectRatio: true,
        legend: {
            display: true,
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

    // profile ------------------
    useEffect(() => {
        // Make an HTTP request to fetch user information
        axios.get('https://dbarangay.onrender.com/get/user')
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



            <div className={`dashboard-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
                <Notification />
                <div className='dashboardlinktop d-flex justify-content-center'>
                    <ul className="nav d-flex justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px' }} aria-current="page" href="/dashboard3">Document Requests</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark border text-center" style={{ width: '200px', background: "rgba(54, 162, 235, 0.6)" }} aria-current="page" href="/dashboard">Residents</a>
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
                    <div className="dashboard-topside d-flex justify-content-evenly w-100">
                        <div className="card topcard m-1 col-md-3 p-0 ">
                            <div className="total-population card-body text-center">
                                <h5 className="card-title">Total Population</h5>
                                <p className="card-text">The current population of the barangay.</p>
                                <p className="card-text">
                                    Population: {totalPopulation}
                                </p>
                            </div>
                        </div>
                        <div className="card barangay-voters topcard m-1 col-md-3  p-0 ">
                            <div className="card-body text-center">
                                <h5 className="card-title">Registered Voters</h5>
                                <p className="card-text">
                                    Registered Voters: {registeredVoters}
                                </p>
                                <p className="card-text">
                                    Percentage of Registered Voters: {((registeredVoters / totalPopulation) * 100).toFixed(2)}%
                                </p>
                            </div>
                        </div>

                        <div className="Total-students card topcard m-1 col-md-3  p-0 ">
                            <div className="card-body text-center">
                                <h5 className="card-title">Registered Students</h5>
                                <p className="card-text">The current Students of the barangay.</p>
                                <p className="card-text">
                                    Students: {registeredStudents}
                                </p>
                            </div>
                        </div>
                        <div className="male-female-percentages card topcard m-1 col-md-3  p-0 ">
                            <div className="card-body text-center">
                                <h5 className="card-title">Male and Female Statistics</h5>
                                <p className="card-text">
                                    Male: {maleCount} ({malePercentage.toFixed(2)}%)
                                </p>
                                <p className="card-text">
                                    Female: {femaleCount} ({femalePercentage.toFixed(2)}%)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div className="row ">
                            <div className="col-12 col-md-12">
                                <div className="card barchartcard">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">

                                        <div className="charttopdivider d-flex justify-content-between sm-5">
                                            <h5 className="card-title">Employment Status</h5>
                                            <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="The diagram provides a clear representation of the employment landscape within the population, highlighting the ratio of individuals who are employed versus those who are unemployed.">
                                                <BsFillInfoCircleFill /> </h5>
                                        </div>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Bar data={employmentData} options={employmentOptions} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card barchartcard">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <div className="charttopdivider d-flex justify-content-between sm-5">
                                            <h5 className="card-title">Age</h5>
                                            <h5 className="tooltipicon" data-toggle="tooltip" data-placement="top" aria-label="The diagram provides a clear depiction of the age distribution within the population, highlighting the distribution of individuals across different age groups. It offers insight into the demographic composition, emphasizing the age demographics present in the population.">
                                                <BsFillInfoCircleFill /> </h5>
                                        </div>

                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Doughnut data={ageData} options={ageOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div className="row ">
                            <div className="col-12 col-md-12">
                                <div className="card barchartcard">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">

                                        <div className="charttopdivider d-flex justify-content-between sm-5">
                                            <h5 className="card-title">Civil Status</h5>
                                            <h5 className="tooltipiconright" data-toggle="tooltip" data-placement="top" aria-labels="The diagram provides a clear overview of the civil status distribution within the population, highlighting the proportions of individuals who are Single, Married, Widowed, and Separated. It offers insight into the marital status composition, illustrating the distribution of civil statuses among the population">
                                                <BsFillInfoCircleFill /> </h5>
                                        </div>

                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Bar data={civilStatusData} options={civilStatusOptions} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card barchartcard">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">

                                        <div className="charttopdivider d-flex justify-content-between sm-5">
                                            <h5 className="card-title">Educational Attainments</h5>
                                            <h5 className="tooltipiconright" data-toggle="tooltip" data-placement="top" aria-labels="The diagram provides a comprehensive view of the educational attainments within the population, highlighting the distribution across various levels of education. It offers insight into the educational landscape, emphasizing the proportion of individuals with different educational backgrounds.">
                                                <BsFillInfoCircleFill /> </h5>
                                        </div>

                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Doughnut data={educationData} options={educationOptions} />

                                        </div>
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
