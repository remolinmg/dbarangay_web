import './assets/css/style.css';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';
import { FiUser } from 'react-icons/fi';
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

function BlotterAdmin() {

  // ---------------------------------- SIDEBAR COLLAPSED  ----------------------------------

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarCollapse = () => { setSidebarCollapsed(!isSidebarCollapsed); };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => { setDropdownOpen(!isDropdownOpen); };


  //  ------------------------------ SHOW ADD FORM ---------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); };


  //   DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); };

  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);

  const [editcomplaint_date, setEditcomplaint_date] = useState('');
  const [editcomplaintType, setEditcomplaint_type] = useState('');
  const [editincidentLocation, setEditincident_location] = useState('');
  const [editcomplaintDetails, setEditcomplaint_details] = useState('');
  const [editcomplainantFullname, setEditc_fullname] = useState('');
  const [editsupportingDocuments, setEdits_documents] = useState('');

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };


  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------

  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditcomplaint_date(rowData.complaint_date);
    setEditcomplaint_type(rowData.complaint_type);
    setEditincident_location(rowData.incident_location);
    setEditcomplaint_details(rowData.complaint_details);
    setEditc_fullname(rowData.c_fullname);
    setEdits_documents(rowData.s_documents);
    setSelectedRowId(rowData.id_blotter);
    setShowEditForm(true);
  };

  return (
    <>
      <div className="topbarsection">
        <div className="topnavbar d-flex justify-content-between align-items-center">
          <div className="topnavlef">
            <button className="collapse-button" onClick={handleSidebarCollapse}>
              <BiMenu />
            </button>
          </div>
          <div className="topnavmid"> <h3>Barangay Harapin Ang Bukas </h3> </div>
          <div className="topnavright">
            <div className="mr-10">
              <FiUser size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className={`containersidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="newsidebar ">
          <div className="text-center">
            <Link className="navbar-brand" to="#">
              <img id="tblImage" className="w-50 h-auto" src={logo} alt="" />
            </Link>
            <h6>Barangay Harapin Ang Bukas</h6>
          </div>
          <ul>

            <li>
              <Link to="/dashboard" className="nav-link ">
                <AiOutlineDashboard className="icon" />
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/announcement-admin" className="nav-link ">
                <BsMegaphoneFill className="icon" />
                <span className="ms-1 d-none d-sm-inline">Announcement</span>
              </Link>
            </li>
            <li>
              <Link to="/emergency-admin" className="nav-link ">
                <BsTelephoneFill className="icon" />
                <span className="ms-1 d-none d-sm-inline">Emergency</span>
              </Link>
            </li>
            <li className="dropdown-sidebar">
              <Link to="" className="nav-link ">
                <div className="barangaymodule">
                  <span onClick={toggleDropdown}>
                    <BsFillFileEarmarkFill className="icon" />
                    <span className="ms-1">
                      Barangay Module <BiChevronDown />
                    </span>
                  </span>
                </div>
              </Link>
              <ul className={`sidebar-submenu ${isDropdownOpen ? 'open' : ''}`}>
                {isDropdownOpen && (
                  <>
                    <li>
                      <Link to="/b-officials-admin" className="nav-link ">
                        <BsFillPersonBadgeFill className="icon" />
                        Barangay Officials
                      </Link>
                    </li>
                    <li>
                      <Link to="/d-barangay-certificate" className="nav-lin">
                        <BsFillFileEarmarkArrowDownFill className="icon" />
                        Document Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/blotter-admin" className="nav-link ">
                        <RiFolderWarningFill className="icon" />
                        Blotter Records
                      </Link>
                    </li>
                    <li>
                      <Link to="/residents-admin" className="nav-link">
                        <BsFillPeopleFill className="icon" />
                        Residents Info
                      </Link>
                    </li>
                    <li>
                      <Link to="/b-permit-admin" className="nav-link">
                        <BsEnvelopePaper className="icon" />
                        Business Permit
                      </Link>
                    </li>
                    <li>
                      <Link to="/b-promotion-admin" className="nav-link">
                        <BsBuildingFillUp className="icon" />
                        Business Promotion
                      </Link>
                    </li>
                    <li>
                      <Link to="/feedbacks-admin" className="nav-link">
                        <BsMailbox className="icon" />
                        Feedbacks
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className={`${isDropdownOpen ? 'hide' : ''}`}>
              <Link to="/staff-logs-admin" className="nav-link">
                <BsTerminal className="icon" />
                <span className="ms-1 d-none d-sm-inline">Staff Logs</span>
              </Link>
            </li>
            <li className={`${isDropdownOpen ? 'hide' : ''}`}>
              <Link to="/admin-profile" className="nav-link">
                <BsPersonFill className="icon" />
                <span className="ms-1 d-none d-sm-inline">Edit Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`business-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
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
              <div class="dropdown-center mt-2">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown button</button>

                <ul class="dropdown-menu">
                  <Link to="/b-permit-admin">
                    <li><a class="dropdown-item">Business Permit</a></li></Link>
                  <Link to="/b-clearance-admin">
                    <li><a class="dropdown-item">Business Clearance</a></li></Link>

                </ul>
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


        {/* -------------------------------------------------------------  TABLE -------------------------------------------------------------  */}
        <main id="main" class="main">
          <section class="section">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row p-2 d-flex justify-content-between">
                      <div class="col-4">
                        <div> <h1 className="search-container"><b />BLOTTER </h1></div>
                      </div>
                      <div class="col-4 text-end ">
                        <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                      </div>
                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Blotter #</th>

                          <th scope="col">DATE </th>
                          <th scope="col"> COMPLAINT TYPE </th>
                          <th scope="col"> INCIDENT LOC. </th>
                          <th scope="col"> COMPLAINT DETAILS </th>
                          <th scope="col">COMPLAINANT Name</th>
                          <th scope="col">SUPPORTING DOCUMENTS </th>
                          <th scope="col">Status </th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* {Blottertbl.map((val) => {
                          return (
                            <tr key={val.id_blotter}>
                              <th scope="row">{val.id_blotter}</th>
                              <td>{format(new Date(val.complaint_date), 'yyyy-MM-dd')}</td>
                              <td>{val.complaint_type}</td>
                              <td>{val.incident_location}</td>
                              <td>{val.complaint_details}</td>
                              <td>{val.c_fullname}</td>
                              <td>{val.s_documents}</td>
                              <td>

                                <div className="mb-3">
                                  <select
                                    type="text"
                                    id="Role"
                                    name="Role"
                                    className="form-control"
                                  >
                                    <option value="">New</option>
                                    <option value="ongoing">Approved</option>
                                    <option value="processed">Disapproved</option>
                                  </select>
                                </div>
                              </td>

                              <td>
                                <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => showEditFormHandler(val)}
                                  >
                                    Edit
                                  </button>
                                  <form method='post' action=''>
                                    <input type='hidden' name='id' value="" />
                                    <button
                                      className="btn btn-outline-danger"
                                      type="button"
                                      name="deleteRow"
                                    >
                                      Delete
                                    </button>
                                  </form>
                                </div>
                              </td>
                            </tr>
                          );
                        })} */}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------ ADD POP-UP FORMS  ------------------------------------------------------------*/}
              {/* {showForm  && (
   <div className="popup-overlay">
    <div className="popup-form">
    <form >
         <div className="certificate">
           <h2 className="certificate-title">ADD BLOTTER INFO</h2>
             <div className="certificate-content">

             <div className="form-group">
                <label htmlFor="owner">COMPLAINT Date </label>
                   <input
                       type="date"
                       id="owner"
                       name="owner" onChange={(e) => {setcomplaint_date(e.target.value); }}
                       className="form-control" required /> </div>

              <div className="form-group">
                <label htmlFor="bname"> COMPLAINT TYPE </label>
                   <input
                     type="text"
                     id="bname"
                     name="bname"
                     onChange={(e) => {setcomplaint_type(e.target.value); }}
                     className="form-control"required /> </div>

              <div className="form-group">
                <label htmlFor="address">INCIDENT LOCATION </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={(e) => { setincident_location(e.target.value); }}
                        className="form-control" required /></div>

              <div className="form-group">
              <label htmlFor="type">COMPLAINT DETAILS </label>
                <input
                   type="text"
                   id="type"
                   name="type" onChange={(e) => {setcomplaint_details(e.target.value); }}
                   className="form-control" required /></div>
                         <div className="form-group">
              <label htmlFor="type">COMPLAINANT FULL NAME </label>
                <input
                   type="text"
                   id="type"
                   name="type" onChange={(e) => {setc_fullname(e.target.value); }}
                   className="form-control" required /></div>

<div className="form-group">
              <label htmlFor="type">SUPPORTING DOCUMENTS</label>
                <input
                   type="text"
                   id="type"
                   name="type" onChange={(e) => {sets_documents(e.target.value); }}
                   className="form-control" required /></div>



              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">Submit </button>
                <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
                            </div>
                        </div>
                    </div>
                 </form>
             </div>
        </div>
    )} */}





              {/* ------------------------------------------------- EDIT FORM --------------------------------------------------------- */}
              {/* {showEditForm && selectedRowData && (
        <div className='popup-overlay'>
          <div className='popup-form'>
          <form>
              <div className='certificate'>
                <h2 className='certificate-title'>EDIT RESIDENTS INFO</h2>
                <div className='certificate-content'>
                  <div className='form-group'>
                    <label htmlFor='owner'> COMPLAINT DATE </label>
                    <input
                      type='date'
                      id='owner'
                      name='owner'
                      value={editcomplaint_date}
                      onChange={(e) => setEditcomplaint_date(e.target.value)}
                      className='form-control' required  />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='owner'> COMPLAINT TYPE </label>
                    <input
                      type='text'
                      id='owner'
                      name='owner'
                      value={editcomplaintType}
                      onChange={(e) => setEditcomplaint_type(e.target.value)}
                      className='form-control' required  />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='owner'> INCIDENT LOCATION </label>
                    <input
                      type='text'
                      id='owner'
                      name='owner'
                      value={editincidentLocation}
                      onChange={(e) => setEditincident_location(e.target.value)}
                      className='form-control' required  />
                  </div>


                  <div className='form-group'>
                    <label htmlFor='bname'> complaint Details</label>
                    <input
                      type='text'
                      id='bname'
                      name='bname'
                      value={editcomplaintDetails}
                      onChange={(e) => setEditcomplaint_details(e.target.value)}
                      className='form-control' required />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='address'>complainanant Fullname </label>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      value={editcomplainantFullname}
                      onChange={(e) => setEditc_fullname(e.target.value)}
                      className='form-control' required />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='type'>s_documents</label>
                    <input
                      type='text'
                      id='type'
                      name='type'
                      value={editsupportingDocuments}
                      onChange={(e) => setEdits_documents(e.target.value)}
                      className='form-control' required  />
                   </div>

                    <div className='form-buttons'>
                    <button type='submit' className='btn btn-primary' onClick=> Submit  </button>  
                    <button type='button' className='btn btn-secondary' onClick={handleEditDiscard}> Discard </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
     )} */}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
export default BlotterAdmin;
