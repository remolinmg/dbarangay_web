import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BsCamera } from "react-icons/bs";
import { Link, NavLink, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import logo from '../admin-components/assets/img/brgy.png';
import { BiChevronDown } from 'react-icons/bi';
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
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  RiFolderWarningFill,
} from "react-icons/ri";
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

  const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
  const toggleProfileSubmenu = () => {
    setProfileSubmenuVisible(!ProfilesubmenuVisible);
  };
  return (
    <>
      <div className="topbarsection">
        <div className="topnavbar d-flex justify-content-between align-items-center">
          <div className="topnavlef">
            <Link to="/admin-accounts" className="nav-link">
              <BsFillArrowLeftCircleFill className="return1"/>
            </Link>
          </div>
          <div className="topnavmid">
            <h3>Barangay Harapin Ang Bukas </h3>
          </div>
          <div className="topnavright">
            <div onClick={toggleProfileSubmenu} className="link">
              <FaUserCircle className="user-icon" />
              {ProfilesubmenuVisible && (
                <ul className="Profilesubmenu">
                  <li className="profile-info">
                    <FaUserCircle className="profile-icon" />
                  </li>
                  <li>
                    <h5>CLARISE ANNELY</h5>
                  </li>
                  <li>
                    <h6>Summary of Request</h6>
                  </li>
                  <li>
                    <div className="request-summary">
                      <div className="column">
                        <p>Date</p>
                        <p>May 10, 2023</p>
                        <p>May 2, 2023</p>
                        <p>April 26, 2023</p>
                      </div>
                      <div className="column">
                        <p>Document</p>
                        <p>Barangay Clearance</p>
                        <p>Barangay Permit</p>
                        <p>Barangay ID</p>
                      </div>
                      <div className="column">
                        <p>Status</p>
                        <p className="sample-status">Requested</p>
                        <p className="sample-status-denied">Denied</p>
                        <p className="sample-status-claimed">Claimed</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <NavLink className="link" to="/admin-profile" activeClassName="active">
                      <a href="#" className="button">Settings</a>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#" className="button">Sign Out</a>
                  </li>
                </ul>
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