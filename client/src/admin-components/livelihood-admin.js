import React, { useState, useRef, useEffect } from "react";
import './assets/css/style.css';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import Axios from 'axios';
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
import { FaUserCircle } from "react-icons/fa";

function LivelihoodAdmin() {
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
      a_what_1: "Sample Event 1",
      a_description_1: "Description of Event 1",
      a_when_1: "2023-09-20",
      a_where_1: "Location 1",
      a_who_1: "Organizer 1",
    },
    {
      id: 2,
      a_what_1: "Sample Event 2",
      a_description_1: "Description of Event 2",
      a_when_1: "2023-09-21",
      a_where_1: "Location 2",
      a_who_1: "Organizer 2",
    },
    {
      id: 3,
      a_what_1: "Sample Event 3",
      a_description_1: "Description of Event 3",
      a_when_1: "2023-09-22",
      a_where_1: "Location 3",
      a_who_1: "Organizer 3",
    },
    {
      id: 4,
      a_what_1: "Sample Event 4",
      a_description_1: "Description of Event 4",
      a_when_1: "2023-09-23",
      a_where_1: "Location 4",
      a_who_1: "Organizer 4",
    },
    {
      id: 5,
      a_what_1: "Sample Event 5",
      a_description_1: "Description of Event 5",
      a_when_1: "2023-09-24",
      a_where_1: "Location 5",
      a_who_1: "Organizer 5",
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



  // Forms --------------------------------

  // DELETE--------------------------------------------
  const deleteRow = (row) => { Axios.delete(`http://localhost:3001/api/delete/bpermit/${row}`); }

  // Database
  const [id, setId] = useState('');
  const [b_owner, setOwner] = useState('');
  const [b_name, setName] = useState('');
  const [b_address, setAddress] = useState('');
  const [type_business, setTypeBusiness] = useState('');
  const [bPermitTbl, setBPermitTbl] = useState([])

  // ADD FORM STATES
  const [showForm, setShowForm] = useState(false);
  const [What, setWhat] = useState(''); // Add this line
  const [Description, setDescription] = useState(''); // Add this line
  const [When, setWhen] = useState(''); // Add this line
  const [Where, setWhere] = useState(''); // Add this line
  const [Who, setWho] = useState(''); // Add this line

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleDiscard = () => {
    setShowForm(false);
  };
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/bpermit').then((response) => {
      setBPermitTbl(response.data.map((item) => ({
        id: item.id,
        a_what_1: item.b_owner,
        a_description_1: item.b_name,
        a_when_1: item.b_address,
        a_where_1: item.type_business,
        a_who_1: item.status, // Assuming 'status' corresponds to 'Who' in your table
      })));
    });
  }, []);

  const submitReq = () => {
    Axios.post('http://localhost:3001/api/insert/bpermit', {
      b_owner: b_owner,
      b_name: b_name,
      b_address: b_address,
      type_business: type_business,
      status: "New", // Set the default status to "New" or use an appropriate default value
    }).then((response) => {
      // Assuming the response contains the new record's ID
      const newId = response.data.id;
      setBPermitTbl((prevData) => [
        ...prevData,
        {
          id: newId,
          a_what_1: b_owner,
          a_description_1: b_name,
          a_when_1: b_address,
          a_where_1: type_business,
          a_who_1: "New", // Set the default status to "New" or use an appropriate default value
        },
      ]);
    });
  };


  // EDIT FORM STATES (ShowEditForm)
  const [showEditForm, setShowEditForm] = useState(false);
  const [editWhat, setEditWhat] = useState(''); // Add this line
  const [editDescription, setEditDescription] = useState(''); // Add this line
  const [editWhen, setEditWhen] = useState(''); // Add this line
  const [editWhere, setEditWhere] = useState(''); // Add this line
  const [editWho, setEditWho] = useState(''); // Add this line
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleEditDiscard = () => {
    setShowEditForm(false);
  };

  // Function to show the edit form with the default data of the selected row
  const showEditFormHandler = (rowData) => {
    setSelectedRowData(rowData);
    setEditWhat(rowData.What); // Add this line
    setEditDescription(rowData.Description); // Add this line
    setEditWhen(rowData.When); // Add this line
    setEditWhere(rowData.Where); // Add this line
    setEditWho(rowData.Who); // Add this line
    setShowEditForm(true);
  };

  const updateRowData = () => {
    Axios.put(`http://localhost:3001/api/update/bpermit/${selectedRowData.id}`, {
      a_what_1: editWhat,
      a_description_1: editDescription,
      a_when_1: editWhen,
      a_where_1: editWhere,
      a_who_1: editWho,
    }).then((response) => {

      const updatedTableData = bPermitTbl.map((rowData) => {
        if (rowData.id === selectedRowData.id) {
          return {
            ...rowData,
            a_what_1: editWhat,
            a_description_1: editDescription,
            a_when_1: editWhen,
            a_where_1: editWhere,
            a_who_1: editWho,
          };
        } else {
          return rowData;
        }
      });

      // Update the state with the new table data
      setBPermitTbl(updatedTableData);

      // Clear the selectedRowData and close the edit form
      setSelectedRowData(null);
      setShowEditForm(false);
    });
  };

  const handleEdit = (item) => {
    // Implement your edit logic here using the 'item' data
    console.log("Edit clicked:", item);
  };

  const handleDelete = (item) => {
    // Implement your delete logic here using the 'item' data
    console.log("Delete clicked:", item);
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
      <div className={`business-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
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
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button>
                <ul className="dropdown-menu">
                  <li><Link to="/announcement-admin">General</Link></li>
                  <li><Link to="/livelihood-admin">Livelihood</Link></li>
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
        {/* TABLE STARTS */}
        <main id="main" className="main">
          <div className="pagetitle"><h1> Livelihood  </h1> </div>
          <section className="section">
            <div className="row"></div>
            <div className="table-container d-flex justify-content-center align-items-center">
              <div className="col-12 border rounded p-3">
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
                    <table className="table">
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
                        {filteredData.slice(startIndex, endIndex).map((item) => (
                          <tr key={item.id}>
                            <th className="small-text" scope="row">{item.id}</th>
                            <td className="small-text">{item.a_what_1}</td>
                            <td className="small-text">{item.a_description_1}</td>
                            <td className="small-text">{item.a_when_1}</td>
                            <td className="small-text">{item.a_where_1}</td>
                            <td className="small-text">{item.a_who_1}</td>
                            <td>
                              <div className='gap-2 d-md-flex justify-content-start align-items-center'>
                                <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(item)}>Edit</button>
                                <form method='post' action=''>
                                  <input type='hidden' name='id' value={item.id} />
                                  <button
                                    className="btn btn-outline-danger"
                                    type="submit"
                                    name="deleteRow"
                                    onClick={() => { deleteRow(item.id); }}>Delete</button>
                                </form>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* ------------------------------------------------------------ ADD POP-UP FORMS  ------------------------------------------------------------*/}
              {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={submitReq}>
                      <div className="certificate">
                        <h2 className="certificate-title">ADD RESIDENTS INFO</h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="a_what_1">What</label>
                            <input
                              type="text"
                              id="a_what_1"
                              name="a_what_1"
                              onChange={(e) => { setWhat(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_description_1">Description</label>
                            <input
                              type="text"
                              id="a_description_1"
                              name="a_description_1"
                              onChange={(e) => { setDescription(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_when_1">When</label>
                            <input
                              type="text"
                              id="a_when_1"
                              name="a_when_1"
                              onChange={(e) => { setWhen(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_where_1">Where</label>
                            <input
                              type="text"
                              id="a_where_1"
                              name="a_where_1"
                              onChange={(e) => { setWhere(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_who_1">Who</label>
                            <input
                              type="text"
                              id="a_who_1"
                              name="a_who_1"
                              onChange={(e) => { setWho(e.target.value); }}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------- EDIT FORM --------------------------------------------------------- */}
              {showEditForm && selectedRowData && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={updateRowData}>
                      <div className="certificate">
                        <h2 className="certificate-title">EDIT RESIDENTS INFO</h2>
                        <div className="certificate-content">
                          <div className="form-group">
                            <label htmlFor="a_what_1">What</label>
                            <input
                              type="text"
                              id="a_what_1"
                              name="a_what_1"
                              value={editWhat}
                              onChange={(e) => setEditWhat(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_description_1">Description</label>
                            <input
                              type="text"
                              id="a_description_1"
                              name="a_description_1"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_when_1">When</label>
                            <input
                              type="text"
                              id="a_when_1"
                              name="a_when_1"
                              value={editWhen}
                              onChange={(e) => setEditWhen(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_where_1">Where</label>
                            <input
                              type="text"
                              id="a_where_1"
                              name="a_where_1"
                              value={editWhere}
                              onChange={(e) => setEditWhere(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="a_who_1">Who</label>
                            <input
                              type="text"
                              id="a_who_1"
                              name="a_who_1"
                              value={editWho}
                              onChange={(e) => setEditWho(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="form-buttons">
                            <button type="submit" className="btn btn-primary" onClick={updateRowData}>Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={handleEditDiscard}>Discard</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}


            </div>
          </section>
        </main>
      </div >
    </>
  );
}

export default LivelihoodAdmin;
