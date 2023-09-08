import { useEffect, useRef, useState } from 'react';
import './assets/css/style.css';
import { Link, NavLink, Route } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown,BiLogOut, BiCog } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import {RiFolderWarningFill} from "react-icons/ri";
import { format } from 'date-fns';
import Axios from 'axios';

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
import { FaUserCircle } from "react-icons/fa";
function Bceritificate() {
  
// ---------------------------------- SIDEBAR COLLAPSED  ----------------------------------

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

 //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
 const [SelectedRowId, setSelectedRowId] = useState(null);
 const [editlast_name, setEditlast_name] = useState('');
 const [editmiddle_initial, setEditmiddle_initial] = useState('');
 const [editfirst_name, setEditfirst_name] = useState('');
 const [editaddress, setEditaddress] = useState('');
 const [editcontact_num, setEditcontact_num] = useState('');
 const [editreqs, setEditreqs] = useState('');
 const [editdaterequest, setEditdaterequest] = useState('');
 const [selectedRowData, setSelectedRowData] = useState(null);

const [showEditForm, setShowEditForm] = useState(false); //SHOW EDIT FORMS
const [showForm, setShowForm] = useState(false); 
const toggleForm = () => {setShowForm(!showForm);}; //SHOW ADD FORMS
const handleEditDiscard = () => {setShowEditForm(false);}; // EDIT DISCARD FUNCTION
const handleDiscard = () => {setShowForm(false);}; // DISCARD FUNCTION



// SELECTED ROW DATA
  useEffect(() => {
    if (selectedRowData) {
      setEditlast_name(selectedRowData.last_name);
      setEditmiddle_initial(selectedRowData.middle_initial);
      setEditfirst_name(selectedRowData.first_name);
      setEditaddress(selectedRowData.address);
      setEditcontact_num(selectedRowData.contact_num);
      setEditreqs(selectedRowData.reqs);
      setEditdaterequest(selectedRowData.daterequest);
      
    }
  }, [selectedRowData]);

// ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
const showEditFormHandler = (rowData) => {
  setSelectedRowData(rowData);
  setEditlast_name(rowData.last_name);
  setEditmiddle_initial(rowData.middle_initial);
  setEditfirst_name(rowData.first_name);
  setEditaddress(rowData.address);
  setEditcontact_num(rowData.contact_num);
  setEditreqs(rowData.reqs);
  setEditdaterequest(rowData.daterequest);
  setSelectedRowId(rowData.id_cert);
  setShowEditForm(true);
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
              <div class="dropdown-center mt-2">
                <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown button</button>

                <ul class="dropdown-menu">
                  <Link to="/d-barangay-certificate">
                    <li><a class="dropdown-item">Barangay Certificate</a></li></Link>
                  <Link to="/d-barangay-indigency">
                    <li><a class="dropdown-item">Barangay Indigency</a></li></Link>
                  <Link to="/d-barangay-installation">
                    <li><a class="dropdown-item">Installation Permit</a></li></Link>
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


{/*------------------------ TABLE STARTS -------------------------- */}
<main id="main" class="main">
<div class="table-container d-flex justify-content-center align-items-center">
<div class="col border rounded p-3 m-5">
<div class="row p-2 d-flex justify-content-between">
  <div class="col-4">
  <div><h1 className="search-container"><b />Barangay Certificate</h1></div>
  </div>
    <div class="col-4 text-end ">
      <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
       </div>
     </div>
    <div class="row">
     <div class="col">
       <table class="table m-auto">
         <thead>
           <tr>
            <th scope="col">#</th>
            <th scope="col">Last Name</th>
            <th scope="col">Middle Initial </th>
            <th scope="col">First Name</th>
            <th scope="col">Address</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Reason of Request</th>
            <th scope="col">Date Requested</th>
            <th scope="col">Action</th>
           </tr>
          </thead>
       <tbody>
       {/* {certificatetable.map((val) => {
         return (
          <tr key={val.id}>
            <th scope="row">{val.id}</th>
                <td>{val.last_name}</td>        
                <td>{val.middle_initial}</td>          
                <td>{val.first_name}</td>          
                <td>{val.address}</td>          
                <td>{val.contact_num}</td>          
                <td>{val.reqs}</td>          
                <td>{format(new Date(val.daterequest), 'yyyy-MM-dd')}</td> 
                <td>
                <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                  <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit </button>
                  <form method='post' action=''>
                  <input type='hidden' name='id' value={val.id} /> 
                  <button onClick={() => { deletecertficates(val.last_name) }} className='btn btn-outline-danger' type='submit' name='deletePost' >Delete</button>
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

  {/* -----------------------------  POP-UP FORMS ------------------- */}
  {/* {showForm && (
    <div className="popup-overlay">
     <div className="popup-form">
       <form>
        <div className="certificate">
        <h2 className="certificate-title">ADD CERIFICATES INFO</h2>
         <div className="certificate-content">
         <div className="form-group">
           <label htmlFor="last_name">LAST NAME</label>
             <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={(e) => {setlast_name(e.target.value);}}
                className="form-control"required /></div>

         <div className="form-group">
           <label htmlFor="first_name"> MIDDLE INITIAL </label>
             <input
               type="text"
               id="first_name"
               name="first_name"
               onChange={(e) => {setmiddleInitial(e.target.value);}}
               className="form-control"required /> </div>

          <div className="form-group">
          <label htmlFor="first_name"> FIRST NAME </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              onChange={(e) => {setfirst_name(e.target.value);}}
              className="form-control" required /></div>

           <div className="form-group">
           <label htmlFor="address">ADDRESS </label>
             <input
               type="text"
               id="address"
               name="address"
               onChange={(e) => {setaddress(e.target.value);}}
               className="form-control"required /></div>

            <div className="form-group">
            <label htmlFor="contact_num">CONTACT NUMBER </label>
              <input
                type="text"
                id="contact_num"
                name="contact_num"
                onChange={(e) => {setcontact(e.target.value); }}
                className="form-control"required /></div>

           <div className="form-group">
           <label htmlFor="reqs"> REASON OF REQUEST </label>
             <input
               type="text"
               id="reqs"
               name="reqs"
               onChange={(e) => {setreason(e.target.value);}}
               className="form-control"required /></div>

            <div className="form-group">
            <label htmlFor="daterequested"> DATE REQUESTED </label>
              <input
                type="date"
                id="daterequested"
                name="daterequested"
                onChange={(e) => {setdaterequest(e.target.value); }}
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
  <form>
    <div className='certificate'>
     <h2 className="certificate-title">EDIT CERTIFICATE INFO</h2>
     <div className="certificate-content">

      <div className="form-group">
        <label htmlFor="last_name">LAST NAME</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={editlast_name} onChange={(e) => setEditlast_name(e.target.value)} 
          className="form-control"required /></div>
      
      <div className="form-group">
      <label htmlFor="middle_initial"> MIDDLE INITIAL </label>
        <input
          type="text"
          id="middle_initial"
          name="middle_initial"
          value={editmiddle_initial} onChange={(e) => setEditmiddle_initial(e.target.value)}
          className="form-control"required /> </div>

      <div className="form-group">
      <label htmlFor="First_Name"> FIRST NAME </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={editfirst_name} onChange={(e) => setEditfirst_name(e.target.value)}
          className="form-control"required /> </div>

       <div className="form-group">
       <label htmlFor="address"> ADDRESS </label>
        <input
          type="text"
          id="address"
          name="address"
          value={editaddress} onChange={(e) => setEditaddress(e.target.value)}
          className="form-control" required /></div>

       <div className="form-group">
       <label htmlFor="contact_num"> CONTACT NUMBER </label>
         <input
           type="text"
           id="contact_num"
           name="contact_num"
           value={editcontact_num} onChange={(e) => setEditcontact_num(e.target.value)}
           className="form-control" required /></div>

       <div className="form-group">
       <label htmlFor="reqs"> REASON OF REQUEST </label>
         <input
           type="text"
           id="reqs"
           name="reqs"
           value={editreqs} onChange={(e) => setEditreqs(e.target.value)}
           className="form-control" required /></div>

        <div className="form-group">
        <label htmlFor="daterequest">Date REQUESTED</label>
          <input
           type="date"
           id="daterequest"
           name="daterequest"
           value={editdaterequest} onChange={(e) => setEditdaterequest(e.target.value)}
           className='form-control' required  />
        </div>

          <div className="form-buttons">
          <button type='submit' className='btn btn-primary'> Submit  </button>  
          <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}> Discard </button>
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

export default Bceritificate;