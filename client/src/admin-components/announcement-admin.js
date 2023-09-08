import React, { useState, useRef, useEffect } from "react";
import './assets/css/style.css';
import { Outlet, Link , NavLink} from 'react-router-dom';
import { format } from 'date-fns';
import Axios from 'axios';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown,BiLogOut, BiCog } from 'react-icons/bi';
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
import { FaUserCircle } from "react-icons/fa";

function AnnouncementAdmin() {
//  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
const [SelectedRowId, setSelectedRowId] = useState(null);
const [editwhat, setEditwhat] = useState('');
const [editdesc, setEditdesc] = useState('');
const [editdate, setEditdate] = useState('');
const [editwhere, setEditwhere] = useState('');
const [editwho, setEditwho] = useState('');
const [selectedRowData, setSelectedRowData] = useState(null);
const [showEditForm, setShowEditForm] = useState(false); //EDIT FORM
const [showForm, setShowForm] = useState(false); 
const toggleForm = () => {setShowForm(!showForm);}; //SHOW ADD FORM 
const handleEditDiscard = () => {setShowEditForm(false);}; // EDIT DISCARD FUNCTION
const handleDiscard = () => {setShowForm(false);}; // DISCARD FUNCTION


// ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
const showEditFormHandler = (rowData) => {
  setSelectedRowData(rowData);
  setEditwhat(rowData.what);
  setEditdesc(rowData.desc);
  setEditdate(rowData.date);
  setEditwhere(rowData.where);
  setEditwho(rowData.who);
  setSelectedRowId(rowData.id_announcement);
  setShowEditForm(true);
};
    
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarCollapse = () => { setSidebarCollapsed(!isSidebarCollapsed); };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
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
      <div className={`containersidebar ${isSidebarCollapsed ? 'collapsed' : ''} d-none d-md-block`}>
        <div className="newsidebar">
          <div className="text-center">
            <Link className="navbar-brand" to="/dashboard">
              <img className="tblImage w-50 h-100" src={logo} alt="" />
            </Link>
            <h6>Barangay Harapin Ang Bukas</h6>
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
              <ul className={`sidebar-submenu w-100 ${isDropdownOpen ? 'open' : ''}`}>
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
                      <Link to="/b-permit-admin" className="nav-link">
                        <BsEnvelopePaper className="sidebaricon" />
                        <span className="sidebarlabel ms-1 d-none d-sm-inline">Business Permit</span>

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
      <div className={`container-documents vh-100 h-100 ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
          <div className="row w-75">
            <div className="col-4 ">

              <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
              </form>
            </div>


            <div className="col-4">
              <div class="dropdown-center mt-2">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown button</button>

                <ul class="dropdown-menu">
                  <Link to="/announcement-admin">
                    <li><a class="dropdown-item">General</a></li></Link>
                  <Link to="/livelihood-admin">
                    <li><a class="dropdown-item">Livelihood</a></li></Link>
                </ul>
              </div>
            </div>
            <div className="col-4">
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

{/* TABLE STARTS */}
<main id="main" class="main">
        <div class="table-container d-flex justify-content-center align-items-center">
          <div class="col-12 border rounded p-3 m-5">
            <div class="row p-2 d-flex justify-content-between">
              <div class="col-4">
                <div>
                  <h1 className="search-container"><b />Announcements</h1>
                </div>
              </div>
              <div class="col-4 text-end ">
                {/* ToggleForm BUTTON */}
                <button className="btn btn-lg btn-primary" onClick={toggleForm}>ADD</button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <table class="table m-auto">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">What</th>
                      <th scope="col">Description</th>
                      <th scope="col">When</th>
                      <th scope="col">Where</th>
                      <th scope="col">Who</th>
                      <th scope="col">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                  {/* {announcementTbl.map((val) => {
                  return (
                    
                      <tr key={val.id_announcement}>
                        <th scope="row">{val.id_announcement}</th>
                        <td>{val.what}</td>
                        <td>{val.desc}</td>
                        <td>{format(new Date(val.date), 'yyyy-MM-dd')}</td> 
                        <td>{val.where}</td>
                        <td>{val.who}</td>


                      <td className="table-row d-flex justify-content-center">
                        <div class='gap-2 d-flex align-self-center'>
                        <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit </button>
                          <form method='post' action=''>
                            <input type='hidden' name='id' value="" />
                            <button className='btn btn-outline-danger' type='submit' name='deletePost' >Delete</button>
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

 {/* ------------------------- POP-UP FORMS ------------------------- */}
        {/* {showForm && (
            <div className="popup-overlay">
              <div className="popup-form">
                <form onSubmit="">
                  <div className="certificate">
                    <h2 className="certificate-title">ADD ANNOUNCEMENT </h2>
                    <div className="certificate-content">

                      <div className="form-group">
                        <label htmlFor="What">WHAT </label>
                        <input
                          type="text"
                          id="What"
                          name="What"
                          onChange={(e) => {setwhat(e.target.value); }}
                          className="form-control"
                          required /></div>

                      <div className="form-group">
                        <label htmlFor="Description"> Description </label>
                        <input
                          type="text"
                          id="Description"
                          name="Description"
                          onChange={(e) => {setdesc(e.target.value);}}
                          className="form-control"required /> </div>

                      <div className="form-group">
                        <label htmlFor="When"> WHEN </label>
                        <input
                          type="date"
                          id="When"
                          name="Wnen"
                          onChange={(e) => {setdate(e.target.value);}}
                          className="form-control"required /></div>

                      <div className="form-group">
                        <label htmlFor="Where">WHERE</label>
                        <input
                          type="text"
                          id="Where"
                          name="Where"
                          onChange={(e) => {setwhere(e.target.value); }}
                          className="form-control"required /></div>

                      <div className="form-group">
                        <label htmlFor="Who"> WHO </label>
                        <input
                          type="text"
                          id="Who"
                          name="Who"
                          onChange={(e) => {setwho(e.target.value);}}
                          className="form-control"required /></div>

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
     
{/* ------------------------------------------------- EDIT FORMS --------------------------------------------------------- */}
{/* {showEditForm && selectedRowData && (
  <div className='popup-overlay'>
  <div className='popup-form'>
    <form onSubmit="">
     <div className='certificate'>
      <h2 className="certificate-title">EDIT ANNOUNCEMENTS INFO</h2>
        <div className="certificate-content">

         <div className="form-group">
         <label htmlFor="What">WHAT</label>
           <input
            type="text"
            id="What"
            name="What"
            value={editwhat} onChange={(e) => setEditwhat(e.target.value)} 
            className="form-control" required /> </div>

          <div className="form-group">
          <label htmlFor="DESCRIPTION"> DESCRIPTION  </label>
            <input
              type="text"
              id="DESCRIPTION"
              name="DESCRIPTION"
              value={editdesc} onChange={(e) => setEditdesc(e.target.value)}
              className="form-control"required /> </div>

          <div className="form-group">
          <label htmlFor="WHEN"> WHEN </label>
              <input
                type="date"
                id="WHEN"
                name="WHEN"
                value={editdate} onChange={(e) => setEditdate(e.target.value)}
                className="form-control" required /></div>

           <div className="form-group">
           <label htmlFor="WHERE">WHERE</label>
             <input
               type="text"
               id="WHERE"
               name="WHERE"
               value={editwhere} onChange={(e) => setEditwhere(e.target.value)}
               className="form-control" required /></div>

          <div className="form-group">
          <label htmlFor="WHO"> WHO </label>
            <input
               type="text"
               id="WHO"
               name="WHO"
               value={editwho} onChange={(e) => setEditwho(e.target.value)}
              className='form-control' required  /></div>

         <div className="form-buttons">
           <button type='submit' className='btn btn-primary'>Submit</button>  
           <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}>Discard</button>
          </div>
         </div>
       </div>
    </form>
   </div>
 </div>
 )} */}
  </div>
    </main>
        </div>
        </>
    );
}
export default AnnouncementAdmin;
