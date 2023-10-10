import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
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
    BsMailbox
} from "react-icons/bs";
import {
    RiFolderWarningFill,
} from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.css';
import { FaUserCircle } from "react-icons/fa";


function Blivelihood() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const profileRef = useRef(null);
    const handleSidebarCollapse = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
    const toggleProfileSubmenu = () => {
        setProfileSubmenuVisible(!ProfilesubmenuVisible);
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
            <div className={`container-documents vh-100 ${isSidebarCollapsed ? 'expanded' : ''}`}>



                <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
                    <div className="row w-75">
                        <div className="col-md-4 ">
                            <form className="input-group d-flex align-items-center">
                                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-btn" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary mt-2" type="submit" id="search-btn">icon</button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <select id="Role" name="Role" className="form-control">
                                    <option value="">General</option>
                                    <option value="new">Livelihood</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <select className="form-control">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-container d-flex justify-content-center align-items-center">
                    <div class="col border rounded p-3 m-5">
                        <div class="row p-2 d-flex justify-content-between">
                            <div class="col-4">
                                <div>
                                    <h1 className="search-container w-auto"><b />Barangay Livelihood</h1>
                                </div>
                            </div>
                            <div class="col-4 text-end ">
                                <button class="btn btn-lg btn-primary">ADD</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <table class="table m-auto">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Middle Name</th>
                                            <th scope="col">Postal Address</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>

                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>

                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">9</th>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>
                                            <td>Thornton</td>
                                            <td>@twitter</td>
                                            <td>Thornton</td>

                                            <td className="table-row d-flex justify-content-center">
                                                <div class='gap-2 d-flex align-self-center'>
                                                    <button type='button' class='btn btn-primary'><a class='text-decoration-none text-white' href=''>Edit</a></button>
                                                    <form method='post' action=''>
                                                        <input type='hidden' name='id' value="" />
                                                        <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Blivelihood;
