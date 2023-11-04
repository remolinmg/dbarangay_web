import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { jwtDecode } from "jwt-decode";

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
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

function Dashboard1() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');

    // blotter -----------------------------
    const [blotterCount, setBlotterCount] = useState(0);
    const [pendingBlotterCount, setPendingBlotterCount] = useState(0);
    const percentagePending = ((pendingBlotterCount / blotterCount) * 100).toFixed(2);
    const currentDate = moment();
    const twelveMonthsAgo = moment(currentDate).subtract(12, 'months');
    const [blotterData, setBlotterData] = useState([]);
    const [barChartData, setBarChartData] = useState({ labels: [], minor: [], major: [] });

    // complaints ------------------------------
    const [complaintCount, setComplaintCount] = useState(0);
    const [pendingComplaintCount, setPendingComplaintCount] = useState(0);
    const percentagePendingComplaint = ((pendingComplaintCount / complaintCount) * 100).toFixed(2);
    const [complaintData, setComplaintData] = useState([]);
    const [barChartDataComaplints, setBarChartDataComaplints] = useState({ labels: [], minor: [], major: [] });


    // Blotter card -------------------------------------------------
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/blotter')
            .then((response) => {
                const blotterData = response.data;

                const totalRecords = blotterData.length;
                setBlotterCount(totalRecords);

                const pendingRecords = blotterData.filter(entry => entry.status === 'pending').length;
                setPendingBlotterCount(pendingRecords);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // blotter charts ---------------------------------
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/blotter')
            .then((response) => {
                const blotterData = response.data;
                setBlotterData(blotterData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (blotterData.length === 0) return;

        const monthlyData = {};
        const months = [];

        blotterData.forEach((entry) => {
            const date = moment(entry.date, 'YYYY-MM-DD');
            const monthYear = date.format('MMM YYYY');

            if (date.isAfter(twelveMonthsAgo) && date.isBefore(currentDate)) {
                if (!months.includes(monthYear)) {
                    months.push(monthYear);
                    monthlyData[monthYear] = { minor: 0, major: 0 };
                }

                if (entry.kind === 'minor') {
                    monthlyData[monthYear].minor++;
                } else if (entry.kind === 'major') {
                    monthlyData[monthYear].major++;
                }
            }
        });

        const labels = months;
        const minor = months.map((month) => monthlyData[month].minor);
        const major = months.map((month) => monthlyData[month].major);

        setBarChartData({ labels, minor, major });
    }, [blotterData]);

    const colorMapping = {
        'Missing Person': 'rgba(255, 99, 132, 0.6)',
        'Missing Property': 'rgba(54, 162, 235, 0.6)',
        'Missing Animal': 'rgba(255, 206, 86, 0.6)',
        'INJURY': 'rgba(75, 192, 192, 0.6)',
        'Damage to Property': 'rgba(255, 159, 64, 0.6)',
        'Sexual Harrasment': 'rgba(128, 128, 0, 0.6)',
        'Others': 'rgba(255, 165, 0, 0.6)',
    };

    const types = [
        'Missing Person',
        'Missing Property',
        'Missing Animal',
        'Injury',
        'Damage to Property',
        'Sexual Harrasment',
        'Others',
    ];

    const datasets = types.map((type) => {
        const data = blotterData.filter(item => item.type === type).length;
        return {
            label: type,
            backgroundColor: colorMapping[type],
            data: [data],
        };
    });

    const data = {
        labels: ['Blotter Types'],
        datasets: datasets,
    };


    // complaints --------------------------------
    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/complaint')
            .then((response) => {
                const complaintData = response.data;
                const totalComplaints = complaintData.length;
                setComplaintCount(totalComplaints);

                const pendingComplaints = complaintData.filter(complaint => complaint.status === 'pending').length;
                setPendingComplaintCount(pendingComplaints);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://dbarangay.onrender.com/get/complaint')
            .then((response) => {
                const complaintData = response.data;
                setComplaintData(complaintData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (complaintData.length === 0) return;

        const monthlyData = {};
        const months = [];

        complaintData.forEach((entry) => {
            const date = moment(entry.date, 'YYYY-MM-DD');
            const monthYear = date.format('MMM YYYY');

            if (date.isAfter(twelveMonthsAgo) && date.isBefore(currentDate)) {
                if (!months.includes(monthYear)) {
                    months.push(monthYear);
                    monthlyData[monthYear] = { minor: 0, major: 0 };
                }

                if (entry.kind === 'minor') {
                    monthlyData[monthYear].minor++;
                } else if (entry.kind === 'major') {
                    monthlyData[monthYear].major++;
                }
            }
        });

        const labels = months;
        const minor = months.map((month) => monthlyData[month].minor);
        const major = months.map((month) => monthlyData[month].major);

        setBarChartDataComaplints({ labels, minor, major });
    }, [complaintData]);

    const complaintTypes = [
        'Noise Complaints',
        'Illegal Parking',
        'Curfew Violator',
        'Vandalism',
        'Rescission',
        'Garbage Problem',
        'Others',
    ];

    const complaintTypeDatasets = complaintTypes.map((type) => {
        const count = complaintData.filter((item) => item.complainttype === type).length;

        return {
            label: type,
            data: [count],
            backgroundColor: getBackgroundColorForType(type), // Define your color function
        };
    });

    function getBackgroundColorForType(type) {
        // Define a color mapping function for each type
        const colorMapping = {
            'Noise Complaints': 'rgba(255, 99, 132, 0.6)',
            'Illegal Parking': 'rgba(54, 162, 235, 0.6)',
            'Curfew Violator': 'rgba(255, 206, 86, 0.6)',
            'Vandalism': 'rgba(75, 192, 192, 0.6)',
            'Rescission': 'rgba(153, 102, 255, 0.6)',
            'Garbage Problem': 'rgba(255, 159, 64, 0.6)',
            'Others': 'rgba(128, 128, 0, 0.6)',
        };

        return colorMapping[type];
    }
    const complaintTypeData = {
        labels: ['Complaint Types'],
        datasets: complaintTypeDatasets,
    };



    // SIDEBAR - TOPBAR ---------------------------------------------------------------------------------------
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
        axios.get('https://dbarangay.onrender.com/get/user')
            .then((response) => {
                const userData = response.data;
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
        navigate('/admin');
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
                <img src={item.filename.url} style={{ width:"80px",height:"80px", borderRadius:"50px"}}calt="Profile Picture" className="profile-pic" id="profile-pic" />       
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
                            <ul className={`sidebar-submenu w-100 ms-3 ${isDropdownOpen ? 'open' : ''}`}>
                                {isDropdownOpen && (
                                    <>
                                        <li>
                                            <Link to="/b-officials-admin" className="nav-link ">
                                                <BsFillPersonBadgeFill className="sidebaricon" />
                                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Barangay Officials</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/d-barangay-certificate" className="nav-lin">
                                                <BsFillFileEarmarkArrowDownFill className="sidebaricon" />
                                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Document Requests</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/blotter-admin" className="nav-link ">
                                                <RiFolderWarningFill className="sidebaricon" />
                                                <span className="sidebarlabel ms-1 d-none d-sm-inline">Incident Reports</span>
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
                        <a class="nav-link" aria-current="page" href="/dashboard">
                            Residents
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/dashboard1">
                            Incidents Reports
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard2">
                            Health
                        </a>
                    </li>
                </ul>
                <div className="row m-5 mt-0">
                    <div className="dashboard-topside d-flex justify-content-evenly w-100">
                        <div className="card topcard m-1 col-md-3 p-0">
                            <div className="total-population card-body text-center">
                                <h5 className="card-title">Total Blotter Recorded</h5>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    Blotter Records: {blotterCount}
                                </p>
                            </div>
                        </div>
                        <div className="card barangay-voters topcard m-1 col-md-3 p-0">
                            <div className="pending-blotter card-body text-center">
                                <h5 className="card-title">Pending Blotter Percentage</h5>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {percentagePending}% (Pending: {pendingBlotterCount})
                                </p>
                            </div>
                        </div>

                        <div className="Total-students card topcard m-1 col-md-3 p-0">
                            <div className="card-body text-center">
                                <h5 className="card-title">Total Complaints</h5>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {complaintCount} Complaints
                                </p>
                            </div>
                        </div>
                        <div className="male-female-percentages card topcard m-1 col-md-3 p-0">
                            <div className="card-body text-center">
                                <h5 className="card-title">Pending Complaints Percentage</h5>
                                <p className="card-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {percentagePendingComplaint}% (Pending: {pendingComplaintCount})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div className="row">
                            <div className="col-12 col-md-12">
                                <div className="card ">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h5 className="card-title">Blotter Records by Month</h5>
                                        <p className="card-text">Categorized as Minor and Major Cases.</p>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Line // Use Line chart
                                                data={{
                                                    labels: barChartData.labels,
                                                    datasets: [
                                                        {
                                                            label: 'Minor Cases',
                                                            data: barChartData.minor,
                                                            borderColor: 'rgba(75, 192, 192, 1)',
                                                            borderWidth: 2,
                                                            fill: false, // No fill for lines
                                                        },
                                                        {
                                                            label: 'Major Cases',
                                                            data: barChartData.major,
                                                            borderColor: 'rgba(255, 99, 132, 1)',
                                                            borderWidth: 2,
                                                            fill: false, // No fill for lines
                                                        },
                                                    ],
                                                }}
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
                                <div className="card ">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h5 className="card-title">Type Blotter</h5>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Bar data={data}
                                                options={{
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            title: {
                                                                display: true,
                                                                text: 'Number of Blotter',
                                                            },
                                                        },
                                                        x: {
                                                            title: {
                                                                display: true,
                                                            },
                                                        },
                                                    },
                                                    plugins: {
                                                        legend: {
                                                            display: true,
                                                            position: 'top',
                                                        },
                                                    },
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div className="row ">
                            <div className="col-12 col-md-12">
                                <div className="card ">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h5 className="card-title">Complaints Records by Month</h5>
                                        <p className="card-text">Categorized as Minor and Major Cases.</p>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Line // Use Line chart
                                                data={{
                                                    labels: barChartDataComaplints.labels,
                                                    datasets: [
                                                        {
                                                            label: 'Minor Cases',
                                                            data: barChartDataComaplints.minor,
                                                            borderColor: 'rgba(75, 192, 192, 1)',
                                                            borderWidth: 2,
                                                            fill: false, // No fill for lines
                                                        },
                                                        {
                                                            label: 'Major Cases',
                                                            data: barChartDataComaplints.major,
                                                            borderColor: 'rgba(255, 99, 132, 1)',
                                                            borderWidth: 2,
                                                            fill: false, // No fill for lines
                                                        },
                                                    ],
                                                }}
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
                                <div className="card ">
                                    <div className="filter"></div>
                                    <div className="bar-chart card-body Chart">
                                        <h5 className="card-title">Type Complaints</h5>
                                        <div style={{ borderRadius: '10px', border: '1px solid #ddd' }}>
                                            <Bar
                                                data={complaintTypeData}
                                                options={{
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            title: {
                                                                display: true,
                                                                text: 'Number of Complaints',
                                                            },
                                                        },
                                                        x: {
                                                            title: {
                                                                display: true,
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
            </div>
        </>
    );
}

export default Dashboard1;
