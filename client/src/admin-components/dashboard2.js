import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
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
function Dashboard2() {

    const [totalEmergencies, setTotalEmergencies] = useState(0);
    const [pendingEmergencies, setPendingEmergencies] = useState(0);

    const percentagePending = ((pendingEmergencies / totalEmergencies) * 100).toFixed(2);


    const [healthData, setHealthData] = useState([]);
    const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Fetch emergency data
        axios.get('http://localhost:8000/get/health')
            .then((response) => {
                const emergencyData = response.data;

                // Calculate the total number of emergency cases
                const total = emergencyData.length;
                setTotalEmergencies(total);

                // Calculate the number of pending cases
                const pending = emergencyData.filter(entry => entry.status === 'pending').length;
                setPendingEmergencies(pending);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    useEffect(() => {
        // Fetch health data with a 12-month limit
        const twelveMonthsAgo = moment().subtract(12, 'months').format('YYYY-MM-DD');
        axios
            .get(`http://localhost:8000/get/health?fromDate=${twelveMonthsAgo}`)
            .then((response) => {
                const healthData = response.data;
                setHealthData(healthData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (healthData.length === 0) return;

        const monthlyData = {};
        const months = [];

        // Define health case types
        const healthTypes = [
            'Accident',
            'Heart Attack',
            'Stroke',
            'Dengue',
            'Pneumonia',
            'Chicken pox',
            'HIV',
            'Influenza',
            'COVID-19',
            'Others',
        ];

        // Define unique colors for each health type
        const colors = [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(128, 128, 0, 0.6)',
            'rgba(255, 165, 0, 0.6)',
            'rgba(0, 128, 0, 0.6)',
            'rgba(255, 0, 0, 0.6)',
        ];

        // Initialize datasets with unique colors
        const datasets = healthTypes.map((type, index) => ({
            label: type,
            backgroundColor: colors[index],
            data: [],
        }));

        healthData.forEach((entry) => {
            const date = moment(entry.date, 'YYYY-MM-DD');
            const monthYear = date.format('MMM YYYY');

            if (!months.includes(monthYear)) {
                months.push(monthYear);
                datasets.forEach((dataset) => {
                    dataset.data.push(0); // Initialize each dataset with 0
                });
                monthlyData[monthYear] = { ...datasets };
            }

            const typeIndex = healthTypes.indexOf(entry.type);
            if (typeIndex !== -1) {
                monthlyData[monthYear][typeIndex].data[months.indexOf(monthYear)]++;
            }
        });

        const labels = months;
        const updatedDatasets = datasets.map((dataset) => {
            return { ...dataset, data: dataset.data.slice(0, months.length) };
        });

        setBarChartData({ labels, datasets: updatedDatasets });
    }, [healthData]);

    const data = {
        labels: barChartData.labels,
        datasets: barChartData.datasets,
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
    const decoded = jwt_decode(token);
      const _id = decoded.id;
      const response = await axios.get(`http://localhost:8000/get/userprofile/${_id}`);
      setUserData(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

return (
 <>
 
   <div className="topbarsection">
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
                   <FaUserCircle className="adminprofile" />
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
                <ul class="nav justify-content-evenly">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="dashboard">Residents</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard1">Incidents Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard2">Health</a>
                    </li>
                </ul>
                <div className="row m-5 mt-0">
                    <div className="dashboard-topside d-flex justify-content-evenly w-100">
                        <div className="card topcard m-1 col-md-6 p-0 ">
                            <div className="total-population card-body text-center">
                                <h5 className="card-title">Total Emergencies</h5>
                                <p className="card-text">Number of emergency cases recorded.</p>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    Total Emergencies: {totalEmergencies}
                                </p>
                            </div>
                        </div>
                        <div className="card barangay-voters topcard m-1 col-md-6  p-0 ">
                            <div className="card-body text-center">
                                <h5 className="card-title">Pending Emergency </h5>
                                <p className="card-text"> Percentage and Total</p>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {percentagePending}% (Pending: {pendingEmergencies})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 p-0">
                        <div className="row ">
                            <div className="col-12 col-md-12">
                                <div className="card barchartcard">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h2>Health Data by Type for the Last 12 Months</h2>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Bar
                                                data={data}
                                                options={{
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            title: {
                                                                display: true,
                                                                text: 'Number of Cases',
                                                            },
                                                        },
                                                        x: {
                                                            title: {
                                                                display: true,
                                                                text: 'Month',
                                                            },
                                                        },
                                                    },
                                                    plugins: {
                                                        legend: {
                                                            display: true,
                                                            position: 'top',
                                                        },
                                                    },
                                                }}
                                            />

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

export default Dashboard2;
