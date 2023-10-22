import 'bootstrap/dist/css/bootstrap.css';
import Picture from '../user-components/assets/img/Official1.jpg';
import Axios from "axios";
import { BsCamera } from "react-icons/bs";
import { Link, NavLink, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import UserNav from './user-navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa";
import "./assets/css/user-style.css";
import Footer from './footer';

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
            <UserNav />
            <div className="user-profile">
                <div className="container user-profile-container pt-5 pe-3 ps-3 pb-5">
                    <div className="card user-profile-card p-4 m-5">
                        <section>
                            <div className="profile-pic-container ps-3 m-0">
                                <img src={profilePicSrc} alt="Profile Picture" className="profile-pic" id="profile-pic" />
                            </div>
                            <div className="p-3 m-0">
                                <input type="file" accept="image/*" id="file-input" className="file-input" onChange={handleFileChange} />
                                <label htmlFor="file-input" className="upload-button">Upload Profile</label>
                            </div>
                        </section>
                        <section>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" onClick={() => showContent(1)} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={activeContent === 1} />
                                <label className="btn btn-outline-primary" id="settings_btn" htmlFor="btnradio1">Settings</label>

                                <input type="radio" onClick={() => showContent(2)} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={activeContent === 2} />
                                <label className="btn btn-outline-primary" id="viewrequest_btn" htmlFor="btnradio2">View Requests</label>
                            </div>
                            <div id="line"></div>
                        </section>
                        <section>
                            <div id="content1" className={`settings content ${activeContent === 1 ? 'active' : ''}`}>
                                {/* Residence Profile Section */}
                                <section className="residence-profile m-3">
                                    <h3><b>Residence Profile</b></h3>
                                    <form class="form1">
                                        <h2 id="form_name">FULL NAME</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="lastName" class="form-label">Last Name:</label>
                                                <input type="text" id="lastName" class="form-control" placeholder="LAST NAME" aria-label="LAST NAME" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="firstName" class="form-label">First Name:</label>
                                                <input type="text" id="firstName" class="form-control" placeholder="FIRST NAME" aria-label="FIRST NAME" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="midName" class="form-label">Middle Name:</label>
                                                <input type="text" id="midName" class="form-control" placeholder="MIDDLE NAME" aria-label="MIDDLE NAME" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="midName" class="form-label">Middle Name:</label>
                                                <input type="text" id="suffix" class="form-control" placeholder="SUFFIX" aria-label="SUFFIX" disabled />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form2">
                                        <h2 id="form_name">COMPLETE ADDRESS</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="house&streetName" class="form-label">House no., Street:</label>
                                                <input type="text" id="house&streetName" class="form-control" aria-label="House no. & Street" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="brgyName" class="form-label">Barangay:</label>
                                                <input type="text" id="brgyName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="districtName" class="form-label">District:</label>
                                                <input type="text" id="districtName" class="form-control" aria-label="District" disabled />
                                            </div>
                                        </div>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="cityName" class="form-label">City/Municipality:</label>
                                                <input type="text" id="cityName" class="form-control" aria-label="House no. & Street" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="provinceName" class="form-label">Province:</label>
                                                <input type="text" id="provinceName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="regionName" class="form-label">Region:</label>
                                                <input type="text" id="regionName" class="form-control" aria-label="District" disabled />
                                            </div>
                                        </div>
                                    </form>

                                    <form class="form3">
                                        <h2 id="form_name">MAILING ADDRESS</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="emailName" class="form-label">Email/FB Account:</label>
                                                <input type="text" id="emailName" class="form-control" aria-label="House no. & Street" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="contactName" class="form-label">Contact:</label>
                                                <input type="text" id="contactName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="nationalityName" class="form-label">Nationality:</label>
                                                <input type="text" id="nationalityName" class="form-control" aria-label="District" disabled />
                                            </div>
                                        </div>
                                    </form>
                                </section>

                                {/* Personal Information Section */}
                                <section className="personal-information m-3">
                                    <h3><b>Personal Information</b></h3>
                                    <form class="form4 mt-3">
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="sex" class="form-label">Sex:</label>
                                                <input type="text" id="sex" class="form-control" placeholder="SEX" aria-label="SEX" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="civilstatus" class="form-label">Civil Status:</label>
                                                <input type="text" id="civilstatus" class="form-control" placeholder="CIVIL STATUS" aria-label="CIVIL STATUS" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="homeownership" class="form-label">Home Ownership: </label>
                                                <input type="text" id="homeownership" class="form-control" placeholder="HOME OWNERSHIP" aria-label="HOME OWNERSHIP" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="employmentstatus" class="form-label">Employment Status:</label>
                                                <input type="text" id="employmentstatus" class="form-control" placeholder="EMPLOYMENT STATUS" aria-label="EMPLOYMENT STATUS" disabled />
                                            </div>
                                        </div>
                                    </form>

                                    <form class="form5 mt-3">
                                        <h5 id="form_name">Employment Information</h5>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="companyName" class="form-label">Company Name:</label>
                                                <input type="text" id="companyName" class="form-control" aria-label="House no. & Street" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Position:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form6 mt-3">
                                        <h2 id="form_name">Birthdate/Birthplace</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="companyName" class="form-label">Month:</label>
                                                <input type="text" id="companyName" class="form-control" aria-label="House no. & Street" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Day:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Year:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">City/Municipality:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Age:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" disabled />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form7 mt-3">
                                        <h2 id="form_name">Educational Attainment</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="educationalattainment" class="form-label">Highest Educational Attainment:</label>
                                                <input type="text" id="educationalattainment" class="form-control" aria-label="Educational Attainment" disabled />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form8 mt-3">
                                        <h2 id="form_name">Residence Class</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="residenceclass" class="form-label">Class:</label>
                                                <input type="text" id="residenceclass" class="form-control" aria-label="Residence Class" disabled />
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>
                            <div id="content2" className={`viewreq content ${activeContent === 2 ? 'active' : ''}`}>
                                <section className="request-summary flex-column m-3">
                                    <h3><b>Request</b></h3>
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
                                                <td>aaa</td>
                                                <td>bbbbb</td>
                                                <td>ccccccccc</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>dddddddd</td>
                                                <td>eeeeeeeeee</td>
                                                <td>fffffffff</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>gggggggggg</td>
                                                <td>hhhhhhhhhh</td>
                                                <td>iiiiiiii</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default UserProfile;