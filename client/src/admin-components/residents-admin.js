import React, { useState, useEffect, useRef } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { format } from 'date-fns';
import { RiFolderWarningFill, } from "react-icons/ri";
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
import 'bootstrap/dist/css/bootstrap.css';
import { FaUserCircle } from "react-icons/fa";



function ResidentsAdmin() {
  //  ------------------------------ SIDEBAR TOPBAR ------------------------------
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

  // NUMBER OF ROWS DISPLAYED -----------------------------------------------
  const [rowCount, setRowCount] = useState(10);

  // PAGE NUMBER --------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);

  // SEARCH QUERY --------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // SAMPLE DATA ---------------------------------------------------------------
  const data = [
    {
      id: 1,
      r_lastname: "Doe",
      r_firstname: "John",
      r_age: 30,
      r_sex: "Male",
      r_dateregistered: "2023-09-20",
    },
    {
      id: 2,
      r_lastname: "Doe",
      r_firstname: "John",
      r_age: 40,
      r_sex: "Male",
      r_dateregistered: "2023-09-20",
    },
  ];

  // Event handler for dropdown change ----------------------------------------
  const handleRowCountChange = (e) => {
    const selectedRowCount = parseInt(e.target.value);
    setRowCount(selectedRowCount);
    setCurrentPage(1); // Reset current page to 1 when row count changes
  };

  // Event handler for search input change -------------------------------------
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when search query changes
  };

  // Function to get the current page data using slice
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowCount;
    const endIndex = startIndex + rowCount;
    return filteredData.slice(startIndex, endIndex);
  };

  // Function to go to the next page ------------------------------------------
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowCount)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page --------------------------------------
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the starting and ending indices for the current page -------------
  const startIndex = (currentPage - 1) * rowCount;
  const endIndex = startIndex + rowCount;

  // Function to filter data based on search query -----------------------------
  const filteredData = data.filter((item) => {
    const itemValues = Object.values(item).map((value) =>
      value.toString().toLowerCase()
    );
    return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
  });

  // Forms ----------------------------------------------
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => { setShowForm(!showForm); }; // SHOW FORMS
  const handleDiscard = () => { setShowForm(false); }; // DISCARD FUNCTION

  // DELETE
  const deleteRow = (row) => { Axios.delete(`http://localhost:3001/api/delete/bpermit/${row}`); }

  //------------------------------------------------ Database ----------------------------
  const [id, setId] = useState('');
  const [r_lastname, setRLastname] = useState('');
  const [r_firstname, setRFirstname] = useState('');
  const [r_age, setRAge] = useState('');
  const [r_sex, setRSex] = useState('');
  const [r_dateregistered, setRDateRegistered] = useState('');
  const [residentTable, setResidentTable] = useState([])

  //-------------------------- ADD FUNCTION -----------------------------------

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/bpermit').then((response) => { setResidentTable(response.data); });
  }, [])

  const submitReq = () => {
    Axios.post('http://localhost:3001/api/insert/bpermit', {
      r_lastname: r_lastname,
      r_firstname: r_firstname,
      r_age: r_age,
      r_sex: r_sex,
      r_dateregistered: r_dateregistered,
    })

    setResidentTable([
      ...residentTable,
      {
        id: id,
        r_lastname: r_lastname,
        r_firstname: r_firstname,
        r_age: r_age,
        r_sex: r_sex,
        r_dateregistered: r_dateregistered,
      }
    ]);
  };

  // ------------------------------ EDIT FORM STATES (ShowForms) ------------------------------
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editLastname, setEditLastname] = useState('');
  const [editFirstname, setEditFirstname] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editSex, setEditSex] = useState('');
  const [editDateRegistered, setEditDateRegistered] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditDiscard = () => { setShowEditForm(false); };

  // ---------------------------------- Function to show the edit form with the default data of the selected row ----------------------------------
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditLastname(rowData.r_lastname);
    setEditFirstname(rowData.r_firstname);
    setEditAge(rowData.r_age);
    setEditSex(rowData.r_sex);
    setEditDateRegistered(rowData.r_dateregistered);
    setSelectedRowId(rowData.id);
    setShowEditForm(true);
  };

  const updateRowData = () => {
    Axios.put(`http://localhost:3001/api/update/bpermit/${selectedRowData.id}`, {
      r_lastname: editLastname,
      r_firstname: editFirstname,
      r_age: editAge,
      r_sex: editSex,
      r_dateregistered: editDateRegistered,
    }).then((response) => {
      const updatedTableData = residentTable.map((rowData) => {
        if (rowData.id === selectedRowData.id) {
          return {
            ...rowData,
            r_lastname: editLastname,
            r_firstname: editFirstname,
            r_age: editAge,
            r_sex: editSex,
            r_dateregistered: editDateRegistered,
          };
        } else {
          return rowData;
        }
      });

      // Update the state with the new table data
      setResidentTable(updatedTableData);

      // Clear the selectedRowData and close the edit form
      setSelectedRowData(null);
      setShowEditForm(false);
    });
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
      <div className={`container-documents vh-100 h-100 ${isSidebarCollapsed ? 'expanded' : ''}`}>

        <div className="document-body w-100 pt-5 mt-0 d-flex justify-content-center">
          <div className="toppart-table border row w-75 d-flex align-items-center">
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Enter search keyword"
                  name="query"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="tabsz dropdown-center">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                <ul className="dropdown-menu dropdown-topcategory">
                  <Link to="/residents-admin">
                    <li><a class="dropdown-item" className="dropdown-item text-center">Active Residents</a></li></Link>
                  <Link to="/resident-inactiveadmin">
                    <li><a class="dropdown-item" className="dropdown-item text-center">Inactive Residents</a></li></Link>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown-tablenumbers">
                <select className="Table-numbers form-control" value={rowCount} onChange={handleRowCountChange}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="pagetitle">
          <h1> Residents Information  </h1>
        </div>


        {/* --------------------------------------------------------- TABLE STARTS --------------------------------------- */}
        <main id="main" class="main">

          <div className="table-container d-flex justify-content-center align-items-center">
            <div className="col border rounded p-3">
              <div className="row p-2 d-flex justify-content-between">
                <div className="col-4">
                  <div className="table-pages">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}>
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        {Array.from({ length: Math.ceil(filteredData.length / rowCount) }, (_, i) => (
                          <li className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
                            <a className="page-link" href="#" onClick={() => setCurrentPage(i + 1)}>
                              {i + 1}
                            </a>
                          </li>
                        ))}
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-4 text-end ">
                  <button className="btn btn-primary float-end" onClick={toggleForm}>Add</button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <table className="table m-auto">
                    <thead>
                      <tr>
                        <th scope="col">Resident No.</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Date Registerd</th>
                        <th scope="col">Action</th>

                      </tr>
                    </thead>

                    <tbody>
                      {getCurrentPageData().map((item, index) => (
                        <tr key={item.id} onClick={() => { window.location.href = `/admin-details/${item.id}` }}>
                          <td>{item.id}</td>
                          <td>{item.r_lastname}</td>
                          <td>{item.r_firstname}</td>
                          <td>{item.r_age}</td>
                          <td>{item.r_sex}</td>
                          <td>{format(new Date(item.r_dateregistered), "MM/dd/yyyy")}</td>
                          <td>
                            <button className="btn btn-primary btn-sm me-2">Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteRow(item.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>





                  </table>
                </div>
              </div>
            </div>

            {/* POP-UP FORMS */}
            {/* ADD FORM */}
            {showForm && (
              <div className="popup-overlay">
                <div className="popup-form">
                  <form onSubmit={submitReq}>
                    <div className="certificate">
                      <h2 className="certificate-title">ADD RESIDENT</h2>
                      <div className="certificate-content">
                        <div className="form-group">
                          <label htmlFor="ResidentLastName">Last Name</label>
                          <input
                            type="text"
                            id="ResidentLastName"
                            name="ResidentLastName"
                            onChange={(e) => {
                              setRLastname(e.target.value);
                            }}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="ResidentFirstName">First Name</label>
                          <input
                            type="text"
                            id="ResidentFirstName"
                            name="ResidentFirstName"
                            onChange={(e) => {
                              setRFirstname(e.target.value);
                            }}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="ResidentAge">Age</label>
                          <input
                            type="text"
                            id="ResidentAge"
                            name="ResidentAge"
                            onChange={(e) => {
                              setRAge(e.target.value);
                            }}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="ResidentSex">Sex</label>
                          <input
                            type="text"
                            id="ResidentSex"
                            name="ResidentSex"
                            onChange={(e) => {
                              setRSex(e.target.value);
                            }}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="ResidentDateRegistered">Date Registered:</label>
                          <input
                            type="date"
                            id="ResidentDateRegistered"
                            name="ResidentDateRegistered"
                            onChange={(e) => {
                              setRDateRegistered(e.target.value);
                            }}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary">Submit</button>
                      <button type="button" className="btn btn-danger" onClick={handleDiscard}>Discard</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* EDIT FORM */}
            {showEditForm && (
              <div className="popup-overlay">
                <div className="popup-form">
                  <form>
                    <div className="certificate">
                      <h2 className="certificate-title">EDIT RESIDENT</h2>
                      <div className="certificate-content">
                        <div className="form-group">
                          <label htmlFor="EditResidentLastName">Last Name</label>
                          <input
                            type="text"
                            id="EditResidentLastName"
                            name="EditResidentLastName"
                            value={editLastname}
                            onChange={(e) => setEditLastname(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="EditResidentFirstName">First Name</label>
                          <input
                            type="text"
                            id="EditResidentFirstName"
                            name="EditResidentFirstName"
                            value={editFirstname}
                            onChange={(e) => setEditFirstname(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="EditResidentAge">Age</label>
                          <input
                            type="text"
                            id="EditResidentAge"
                            name="EditResidentAge"
                            value={editAge}
                            onChange={(e) => setEditAge(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="EditResidentSex">Sex</label>
                          <input
                            type="text"
                            id="EditResidentSex"
                            name="EditResidentSex"
                            value={editSex}
                            onChange={(e) => setEditSex(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="EditResidentDateRegistered">Date Registered:</label>
                          <input
                            type="date"
                            id="EditResidentDateRegistered"
                            name="EditResidentDateRegistered"
                            value={editDateRegistered}
                            onChange={(e) => setEditDateRegistered(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <button type="button" className="btn btn-primary" onClick={updateRowData}>Save</button>
                      <button type="button" className="btn btn-danger" onClick={handleEditDiscard}>Discard</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>

      </div>

    </>
  );
}

export default ResidentsAdmin;