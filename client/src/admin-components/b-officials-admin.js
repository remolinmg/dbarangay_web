import { useEffect, useRef, useState } from 'react';
import './assets/css/style.css';
import { Link, NavLink, Route } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown,BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiFolderWarningFill, } from "react-icons/ri";
import Axios from 'axios';
import { parse, format } from 'date-fns';
import { FaUserCircle } from "react-icons/fa";
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


function BofficialsAdmin() {

  //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const [editposition, setEditposition] = useState('');
  const [editfirstName, setEditfirstName] = useState('');
  const [editlastName, setEditlastName] = useState('');
  const [editcontact, setEditcontact] = useState('');
  const [editaddress, setEditaddress] = useState('');
  const [editImage, setEditImage] = useState('');

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editstartTerm, setEditstartTerm] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [editendTerm, setEditendTerm] = useState(format(new Date(), 'yyyy-MM-dd'));
  //  ------------------------------ EDIT FORM ------------------------------
  const [showEditForm, setShowEditForm] = useState(false);


  //  ------------------------------ SHOW ADD FORM ---------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); };


  // EDIT DISCARD FUNCTION
  const handleEditDiscard = () => { setShowEditForm(false); };


  // DISCARD FUNCTION
  const handleDiscard = () => { setShowForm(false); };


  // SELECTED ROW DATA
  useEffect(() => {
    if (selectedRowData) {

      setEditposition(selectedRowData.position);
      setEditfirstName(selectedRowData.firstName);
      setEditlastName(selectedRowData.lastName);
      setEditcontact(selectedRowData.contact);
      setEditaddress(selectedRowData.address);
      editImage(selectedRowData.image);
      setEditstartTerm(parse(selectedRowData.startTerm, 'yyyy-MM-dd', new Date()));
      setEditendTerm(parse(selectedRowData.endTerm, 'yyyy-MM-dd', new Date()));

    }
  }, [selectedRowData]);

  //  -------------------------------------------- SIDEBAR COLLAPSED --------------------------------------------
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

  // ----------------------------------  Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditposition(rowData.position);
    setEditfirstName(rowData.firstName);
    setEditlastName(rowData.lastName);
    setEditcontact(rowData.contact);
    setEditaddress(rowData.address);
    setEditImage(rowData.Image);
    setEditstartTerm(rowData.starTerm);
    setEditendTerm(rowData.endTerm);

    setSelectedRowId(rowData.id);
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
      <div className={`bofficials-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <main id="main" class="main">
          <section class="section">
            <div class="row">
              <div class="col-lg-12">

                <div class="card">
                  <div class="card-body">
                    <div class="d-md-flex justify-content-between align-items-center">
                      <h5 class="card-title">Barangay Officials</h5>
                      <form class="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                        <button type="submit" title="Search"><i class="bi bi-search"></i></button>
                      </form>
                    </div>

                    <div class="search-bar d-flex justify-content-between pt-2">
                      <p>Edit Barangay Officials</p>
                      {/* ToggleForm BUTTON */}
                      <button className="btn btn-primary float-end" onClick={toggleForm}>Add New Officials</button>
                    </div>

                    <table class="table caption-top">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Position</th>
                          <th scope="col">Name</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Address</th>
                          <th scope="col">Start of Term</th>
                          <th scope="col">End of Term</th>
                          <th scope="col">Option</th>

                        </tr>
                      </thead>
                      <tbody>
                        {/* {bOfficialTable.map((val) => {
                          const parsedStartTerm = parse(val.starTerm, 'yyyy-MM-dd', new Date());
                          const parsedEndTerm = parse(val.endTerm, 'yyyy-MM-dd', new Date());
                          return (

                            <tr key={val.id}>
                              <th scope="row">{val.id}</th>
                              <td>{val.position}</td>
                              <td>{val.firstName}</td>
                              <td>{val.lastName}</td>
                              <td>{val.contact}</td>
                              <td>{val.address}</td>
                              <td>{format(parsedStartTerm, 'yyyy-MM-dd')}</td>
                              <td>{format(parsedEndTerm, 'yyyy-MM-dd')}</td>
                              <td>
                                <div class='gap-2 d-md-flex justify-content-start align-items-center'>
                                  <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}> Edit </button>
                                  <form method='post' action=''>
                                    <input type='hidden' name='id' value="" />
                                    <button class='btn btn-outline-danger' type='submit' name='deletePost'>Delete</button>
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

              {/* POP-UP FORMS */}
              {/* {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={submitadd}>
                      <div className="certificate">
                        <h2 className="certificate-title">ADD OFFICALS INFO</h2>
                        <div className="certificate-content">

                          <div className="form-group">
                            <label htmlFor="Position">POSITION</label>
                            <input
                              type="text"
                              id="Position"
                              name="Position"
                              onChange={(e) => {
                                setposition(e.target.value);
                              }}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="name"> FIRST NAME </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              onChange={(e) => {
                                setfirstName(e.target.value);
                              }}
                              className="form-control"
                              required /> </div>

                          <div className="form-group">
                            <label htmlFor="name">  LAST NAME </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              onChange={(e) => {
                                setlastName(e.target.value);
                              }}
                              className="form-control"
                              required /> </div>


                          <div className="form-group">
                            <label htmlFor="Contact">Contact </label>
                            <input
                              type="text"
                              id="Contact"
                              name="Contact"
                              onChange={(e) => {
                                setcontact(e.target.value);
                              }}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input
                              type="text"
                              id="Address"
                              name="Address"
                              onChange={(e) => {
                                setaddress(e.target.value);
                              }}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Image">ADD IMAGE </label>
                            <input
                              type="file"
                              id="Image"
                              name="Image"
                              onChange={(e) => {
                                setimage(e.target.value);
                              }}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Start-Term">START TERM </label>
                            <input
                              type="date"
                              id="Start-Term"
                              name="Start-Term"
                              value={format(editstartTerm, 'yyyy-MM-dd')}  // Format for the input
                              onChange={(e) => setEditstartTerm(e.target.value)}
                              className="form-control"
                              required
                            /></div>



                          <div className="form-group">
                            <label htmlFor="End-Term">END TERM </label>
                            <input
                              type="date"
                              id="End-Term"
                              name="End-Term"
                              value={format(editendTerm, 'yyyy-MM-dd')}  // Format for the input
                              onChange={(e) => setEditendTerm(e.target.value)}
                              className="form-control"
                              required /></div>

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
                    <form onSubmit={updateRowData}>
                      <div className='certificate'>
                        <h2 className="certificate-title">EDIT OFFICIALS INFO</h2>
                        <div className="certificate-content">

                          <div className="form-group">
                            <label htmlFor="Position"> Position </label>
                            <input
                              type="text"
                              id="Position"
                              name="Position"
                              value={editposition} onChange={(e) => setEditposition(e.target.value)}
                              className="form-control" required /></div>

                          <div className="form-group">
                            <label htmlFor="Name">  FIRST NAME </label>
                            <input
                              type="text"
                              id="Name"
                              name="Name"
                              value={editfirstName} onChange={(e) => setEditfirstName(e.target.value)}
                              className="form-control" required /> </div>


                          <div className="form-group">
                            <label htmlFor="Name">  LAST NAME </label>
                            <input
                              type="text"
                              id="Name"
                              name="Name"
                              value={editlastName} onChange={(e) => setEditlastName(e.target.value)}
                              className="form-control" required /> </div>

                          <div className="form-group">
                            <label htmlFor="Contact">Contact </label>
                            <input
                              type="text"
                              id="Contact"
                              name="Contact"
                              value={editcontact} onChange={(e) => setEditcontact(e.target.value)}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input
                              type="text"
                              id="Address"
                              name="Address"
                              value={editaddress} onChange={(e) => setEditaddress(e.target.value)}
                              className="form-control"
                              required /></div>

                          <div className="form-group">
                            <label htmlFor="Image">Add Image</label>
                            <input
                              type="file"
                              id="Image"
                              name="Image"
                              value={editImage} onChange={(e) => setEditImage(e.target.value)}
                              className='form-control' required />
                          </div>

                          <div className='form-group'>
                            <label htmlFor='Start-Term'>Start Term</label>
                            <input
                              type='date'
                              id='Start-Term'
                              name='Start-Term'
                              value={editstartTerm}
                              onChange={setEditstartTerm}
                              className='form-control'
                              required
                            />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='End-Term'>End Term</label>
                            <input
                              type='date'
                              id='End-Term'
                              name='End-Term'
                              value={editendTerm}
                              onChange={setEditendTerm}
                              className='form-control'
                              required
                            />
                          </div>

                          <div className="form-buttons">
                            <button type='submit' className='btn btn-primary' onClick={updateRowData}> Submit  </button>
                            <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}> Discard </button>
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
  );
}






export default BofficialsAdmin;