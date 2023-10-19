import 'bootstrap/dist/css/bootstrap.css';
import Picture from '../user-components/assets/img/Official1.jpg';
import '../user-components/assets/css/user-style.css';
import './assets/css/style.css';
import Axios from "axios";
import { BsCamera } from "react-icons/bs";
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { useRef, useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { FaUserCircle } from "react-icons/fa";

function Admindetails() {
  const stylediv = {

    height: "140px",
    backgroundColor: "rgb(233, 236, 239)"
  };
  const stylespan = {
    color: "rgb(166, 168, 170)",
    font: "bold 8pt Arial"
  };
  const profileRef = useRef(null);

  const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };
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

                      
                        <div className="profilebuttons" onClick={handleSignOut}>
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
      <div className="py-5 text-dark" style={{ backgroundColor: "#1D5D9B" }}>
        <div class="container userprof mt-5 ">
          <div class="row flex-lg-nowrap" >
            <div class="col">
              <div class="row">
                <div class="col mb-3">
                  <div class="card">
                    <div class="card-body">
                      <div class="e-profile">
                        <div class="row">
                          <div class="col-12 col-sm-auto mb-3">
                            <div class="mx-auto" style={{ width: "140px" }}>
                              <div class="d-flex justify-content-center align-items-center rounded" style={stylediv}>
                                <span style={stylespan}>140x140</span>
                              </div>
                            </div>
                          </div>
                          <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div class=" text-sm-left mb-2 mb-sm-0">
                              <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">Carl Joshua Monreal</h4>
                              <div class="text-muted"><small>0101011</small></div>
                              <div class="mt-2">
                                <button class="btn btn-primary" type="button">
                                  <i style={{ fontSize: "20px" }}><BsCamera /> </i>
                                  <span>Change Photo</span>
                                </button>
                              </div>
                            </div>
                            <div class="text-center text-sm-right">
                              <div class="text-muted"><small>Barangay Harapin Ang Bukas</small></div>
                            </div>
                          </div>
                        </div>
                        <ul class="nav nav-tabs">
                          <li class="nav-item"><a href="" class="active nav-link">Settings</a></li>
                        </ul>
                        <div class="tab-content pt-3">
                          <div class="tab-pane active">
                            <form class="form" novalidate="">
                              <div class="row text-dark">
                                <div class="col">
                                  <div class="row ">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>First Name</label>
                                        <input class="form-control" type="text" name="fname" placeholder="Carl Joshua" value="Carl Joshua" />
                                      </div>
                                    </div>
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Lastname</label>
                                        <input class="form-control" type="text" name="mname" placeholder="Dorado" value="Dorado" />
                                      </div>
                                    </div>
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Lastname</label>
                                        <input class="form-control" type="text" name="lname" placeholder="Monreal" value="Monreal" />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="mt-3 mb-3">
                                    <div class="row">
                                      <div class="col">
                                        <label class="mb-2">Sex</label>
                                        <div class="custom-controls-stacked px-2">
                                          <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="sex-male" checked="" />
                                            <label class="custom-control-label" for="sex-male">Male</label>
                                          </div>
                                          <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="sex-female" checked="" />
                                            <label class="custom-control-label" for="sex-female">Female</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="religion">Religion</label>
                                    <select
                                      id="religion"
                                      className="option" style={{ fontSize: '14px', marginBottom: '10px' }}
                                    >
                                      <option value="">Select Religion</option>
                                      <option value="catholic">Roman Catholic</option>
                                      <option value="inc">Iglesia ni Cristo</option>
                                      <option value="muslim">Muslim</option>
                                      <option value="islam">Islam</option>
                                      <option value="sda">Seventh Day Adventist</option>
                                      <option value="jw">Jehovah's Witness</option>
                                      <option value="others">Other religious affiliations</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="civilStatus">Civil Status</label>
                                    <select
                                      id="civilStatuss"
                                      className="option" style={{ fontSize: '14px', marginBottom: '10px' }}
                                    >
                                      <option value="">Select Civil Status</option>
                                      <option value="single">Single</option>
                                      <option value="married">Married</option>
                                      <option value="divorced">Divorced</option>
                                      <option value="separated">Separated</option>
                                    </select>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Nationality</label>
                                        <input class="form-control" type="text" placeholder="Filipino" />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Address</label>
                                        <input class="form-control" type="text" placeholder="123 Barangay Harapin Ang Bukas Mandaluyong,City" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="checkbox-container mt-3 mb-3">
                                    <label htmlFor="isLivingWParents">Check if Living with Parents</label>
                                    <input
                                      type="checkbox"
                                      id="isLivingWParents"
                                    />

                                    <label htmlFor="isPWD">PWD </label>
                                    <input
                                      type="checkbox"
                                      id="isPWD"
                                    /> </div>
                                  <div className="form-group mt-3">
                                    <label htmlFor="H-Educational-A">Highest Educational Attaintment</label>
                                    <select
                                      id="h-educational-a"
                                      className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                                    >
                                      <option value="">Select Highest Educational Attaintment</option>
                                      <option value="undergrad">Undergraduate (Bachelor's Degree)</option>
                                      <option value="postgrad">Postgraduate (Master's Degree)</option>
                                      <option value="doctoral">Doctoral (PhD)</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="employmentStatus"> Employment Status</label>
                                    <select
                                      id="employmentStatus"
                                      className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                                    >
                                      <option value="">Select Employment Status</option>
                                      <option value="worker">Worker</option>
                                      <option value="employee">Employee</option>
                                      <option value="self-employed">Self-Employed</option>
                                      <option value="unemployed">Unemployed</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input
                                      type="date"
                                      id="dateOfBirth"
                                      required
                                      class="m-2"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                      class="m-2"
                                      type="tel"
                                      id="phoneNumber"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-column">

                                  <div className="form-group">
                                    <label htmlFor="telephoneNumber">Telephone Number</label>
                                    <input
                                      type="tel"
                                      id="telephoneNumber"
                                      class="m-2"
                                      required
                                    />
                                  </div>
                                  <div class="row">
                                    <div class="col mb-3">
                                      <div class="form-group">
                                        <label>Email</label>
                                        <input class="form-control" type="text" placeholder="user@example.com" />
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div class="row text-dark">
                                <div class="col-12 col-sm-6 mb-3">
                                  <div class="mb-2"><b>Change Password</b></div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Current Password</label>
                                        <input class="form-control" type="password" placeholder="••••••" />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>New Password</label>
                                        <input class="form-control" type="password" placeholder="••••••" />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="form-group">
                                        <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                                        <input class="form-control" type="password" placeholder="••••••" /></div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-12 col-sm-5 offset-sm-1 mb-3">
                                  <div class="mb-2"><b>Contact Person</b></div>
                                  <div class="row">
                                    <div class="col">
                                      <div className="form-group">
                                        <label htmlFor="contactPerson">Name</label>
                                        <input
                                          class="m-2"
                                          type="tel"
                                          id="contactPerson"
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className="form-column">

                                      <div className="form-group">
                                        <label htmlFor="contactNumber">Contact Number</label>
                                        <input
                                          type="tel"
                                          id="contactNumber"
                                          class="m-2"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col d-flex justify-content-end">
                                  <button class="btn btn-primary" type="submit">Save Changes</button>
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
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

export default Admindetails;