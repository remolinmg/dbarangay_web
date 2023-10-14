import 'bootstrap/dist/css/bootstrap.css';
import Picture from '../user-components/assets/img/Official1.jpg';
import Axios from "axios";
import { BsCamera } from "react-icons/bs";
import { Link, NavLink, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
    const [activeContent, setActiveContent] = useState(1);
    const [profilePicSrc, setProfilePicSrc] = useState('https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png');
    const [selectedFile, setSelectedFile] = useState(null);

    const showContent = (contentNumber) => {
        setActiveContent(contentNumber);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePicSrc(event.target.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
    const toggleProfileSubmenu = () => {
        setProfileSubmenuVisible(!ProfilesubmenuVisible);
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
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


    return (
        <>
            <div className="topbarsection">
                <div className="topnavbar d-flex justify-content-between align-items-center">
                    <div className="topnavlef">
                        <Link to="/admin-accounts" className="adminicon">
                            <BsFillArrowLeftCircleFill className="return1" />
                        </Link>
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
            <div className="residentsaccount">
                <div className="content_background">
                    <div className="content_container">
                        <div className="profile-pic-container">
                            <img src={profilePicSrc} alt="Profile Picture" className="profile-pic" id="profile-pic" />
                        </div>
                        <div>
                            <input type="file" accept="image/*" id="file-input" className="file-input" onChange={handleFileChange} />
                            <label htmlFor="file-input" className="upload-button">Upload Profile</label>
                        </div>

                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" onClick={() => showContent(1)} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={activeContent === 1} />
                            <label className="btn btn-outline-primary" id="settings_btn" htmlFor="btnradio1">Settings</label>

                            <input type="radio" onClick={() => showContent(2)} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={activeContent === 2} />
                            <label className="btn btn-outline-primary" id="viewrequest_btn" htmlFor="btnradio2">View Requests</label>
                        </div>
                        <div id="line"></div>

                        <h1 id="content_title">Residence Profiling</h1>

                        <div id="content1" className={`settings content ${activeContent === 1 ? 'active' : ''}`}>
                            {/* Residence Profile Section */}
                            <section className="residence_profile">
                                <h1 id="title">Residence Profile</h1>
                                <form class="form1">
                                    <h2 id="form_name">FULL NAME</h2>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="lastName" class="form-label">Last Name:</label>
                                            <input type="text" id="lastName" class="form-control" placeholder="LAST NAME" aria-label="LAST NAME" />
                                        </div>
                                        <div class="col">
                                            <label for="firstName" class="form-label">First Name:</label>
                                            <input type="text" id="firstName" class="form-control" placeholder="FIRST NAME" aria-label="FIRST NAME" />
                                        </div>
                                        <div class="col">
                                            <label for="midName" class="form-label">Middle Name:</label>
                                            <input type="text" id="midName" class="form-control" placeholder="MIDDLE NAME" aria-label="MIDDLE NAME" />
                                        </div>
                                        <div class="col">
                                            <label for="inputState" class="form-label">Suffix:</label>
                                            <select id="inputState" class="form-select">
                                                <option selected>CHOOSE</option>
                                                <option>I</option>
                                                <option>II</option>
                                                <option>III</option>
                                                <option>JR</option>
                                                <option>SR</option>
                                                <option>N/A</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                <form class="form2">
                                    <h2 id="form_name">COMPLETE ADDRESS</h2>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="house&streetName" class="form-label">House no., Street:</label>
                                            <input type="text" id="house&streetName" class="form-control" aria-label="House no. & Street" />
                                        </div>
                                        <div class="col">
                                            <label for="brgyName" class="form-label">Barangay:</label>
                                            <input type="text" id="brgyName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="districtName" class="form-label">District:</label>
                                            <input type="text" id="districtName" class="form-control" aria-label="District" />
                                        </div>
                                    </div>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="cityName" class="form-label">City/Municipality:</label>
                                            <input type="text" id="cityName" class="form-control" aria-label="House no. & Street" />
                                        </div>
                                        <div class="col">
                                            <label for="provinceName" class="form-label">Province:</label>
                                            <input type="text" id="provinceName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="regionName" class="form-label">Region:</label>
                                            <input type="text" id="regionName" class="form-control" aria-label="District" />
                                        </div>
                                    </div>
                                </form>

                                <form class="form3">
                                    <h2 id="form_name">MAILING ADDRESS</h2>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="emailName" class="form-label">Email/FB Account:</label>
                                            <input type="text" id="emailName" class="form-control" aria-label="House no. & Street" />
                                        </div>
                                        <div class="col">
                                            <label for="contactName" class="form-label">Contact:</label>
                                            <input type="text" id="contactName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="nationalityName" class="form-label">Nationality:</label>
                                            <input type="text" id="nationalityName" class="form-control" aria-label="District" />
                                        </div>
                                    </div>
                                </form>
                            </section>

                            {/* Personal Information Section */}
                            <section>
                                <h1 id="title">Personal Information</h1>
                                <form class="form4">
                                    <div class="row mb-3">
                                        <fieldset class="row mb-3">
                                            <legend class="col-form-label col-sm-2 pt-0">GENDER</legend>
                                            <div class="col-sm-10">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                                    <label class="form-check-label" for="gridRadios1">
                                                        Male
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                                <form class="form5">
                                    <div class="row mb-3">
                                        <fieldset class="row mb-3">
                                            <legend class="col-form-label col-sm-2 pt-0">CIVIL STATUS</legend>
                                            <div class="col-sm-10">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                                    <label class="form-check-label" for="gridRadios1">
                                                        Single
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Married
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Widow/er
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Separated
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                                <form class="form6">
                                    <div class="row mb-3">
                                        <fieldset class="row mb-3">
                                            <legend class="col-form-label col-sm-2 pt-0">HOME OWNERSHIP</legend>
                                            <div class="col-sm-10">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                                    <label class="form-check-label" for="gridRadios1">
                                                        Owner
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Renting
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                                <form class="form7">
                                    <div class="row mb-3">
                                        <fieldset class="row mb-3">
                                            <legend class="col-form-label col-sm-2 pt-0">EMPLOYMENT STATUS</legend>
                                            <div class="col-sm-10">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                                    <label class="form-check-label" for="gridRadios1">
                                                        Employed
                                                    </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                    <label class="form-check-label" for="gridRadios2">
                                                        Unemployed
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                                <form class="form8">
                                    <h5 id="form_name">If Employed please answer:</h5>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="companyName" class="form-label">Company Name:</label>
                                            <input type="text" id="companyName" class="form-control" aria-label="House no. & Street" />
                                        </div>
                                        <div class="col">
                                            <label for="positionName" class="form-label">Position:</label>
                                            <input type="text" id="positionName" class="form-control" aria-label="Barangay" />
                                        </div>
                                    </div>
                                </form>
                                <form class="form9">
                                    <h2 id="form_name">Birthdate/Birthplace</h2>
                                    <div class="row g-3">
                                        <div class="col">
                                            <label for="companyName" class="form-label">Month:</label>
                                            <input type="text" id="companyName" class="form-control" aria-label="House no. & Street" />
                                        </div>
                                        <div class="col">
                                            <label for="positionName" class="form-label">Day:</label>
                                            <input type="text" id="positionName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="positionName" class="form-label">Year:</label>
                                            <input type="text" id="positionName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="positionName" class="form-label">City/Municipality:</label>
                                            <input type="text" id="positionName" class="form-control" aria-label="Barangay" />
                                        </div>
                                        <div class="col">
                                            <label for="positionName" class="form-label">Age:</label>
                                            <input type="text" id="positionName" class="form-control" aria-label="Barangay" />
                                        </div>
                                    </div>
                                </form>
                            </section>

                            {/* Educational Attainment Section */}
                            <section>
                                <h1 id="title">Educational Attainment</h1>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                        Elementary Graduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked1" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked1">
                                        Elementary Undergraduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked2">
                                        Highschool Graduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked3">
                                        Highschool Undergraduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked4">
                                        College Graduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked5">
                                        College Undergraduate
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked6" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked6">
                                        Currently Studying as:
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </section>

                            {/* Residence Class Section */}
                            <section>
                                <h1 id="title">Residence Class</h1>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios1"
                                        value="option1"
                                        checked
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Person with Disability (PWDs)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        value="option2"
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Solo Parent
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios3"
                                        value="option3"
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                        Out of School Youth
                                    </label>
                                </div>
                            </section>

                            <div className="save_btn">
                                <input type="checkbox" className="btn-check" id="btn-check-2" />
                                <label className="btn btn-primary" htmlFor="btn-check-2">
                                    Save Changes
                                </label>
                            </div>
                        </div>

                        {/* View Request */}
                        <div id="content2" className={`view_request content ${activeContent === 2 ? 'active' : ''}`}>
                            <h1>Request</h1>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">LAST NAME</th>
                                        <th scope="col">FIRST NAME</th>
                                        <th scope="col">MIDDLE NAME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Jakhul</td>
                                        <td>Salsalani</td>
                                        <td>Guererro</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Abdhul</td>
                                        <td>Marie</td>
                                        <td>Ping</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Hakdugan</td>
                                        <td>N/A</td>
                                        <td>Makati</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="save_btn">
                                <input type="checkbox" className="btn-check" id="btn-check-3" />
                                <label className="btn btn-primary" htmlFor="btn-check-3">
                                    Save Changes
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserProfile;