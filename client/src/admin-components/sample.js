import { useEffect, useRef, useState } from 'react';
import './assets/css/style.css';
import { Link, NavLink, Route } from 'react-router-dom';
import logo from '../admin-components/assets/img/brgy.png';
import { BiMenu, BiChevronDown, BiLogOut, BiCog } from 'react-icons/bi';
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
      position: "Mayor",
      firstName: "John",
      lastName: "Doe",
      contact: "123-456-7890",
      address: "123 Main St",
      Image: "mayor.jpg",
      startTerm: "2023-01-01",
      endTerm: "2023-12-31",
    },
    {
      id: 2,
      position: "Councilor",
      firstName: "Jane",
      lastName: "Smith",
      contact: "987-654-3210",
      address: "456 Elm St",
      Image: "councilor.jpg",
      startTerm: "2023-01-01",
      endTerm: "2023-12-31",
    },
    // Add more sample data as needed
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
  const toggleForm = () => { setShowForm(!showForm); }; //   SHOW FORMS 
  const handleDiscard = () => { setShowForm(false); }; //   DISCARD FUNCTION

  //  DELETE  
  const deleteRow = (row) => { Axios.delete(`http://localhost:3001/api/delete/bpermit/${row}`); }

  // Database
  const [id, setId] = useState('');
  const [position, setposition] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [contact, setcontact] = useState('');
  const [address, setaddress] = useState('');
  const [Image, setimage] = useState('');
  const [startTerm, setstartTerm] = useState('');
  const [endTerm, setEndTerm] = useState('');
  const [bOfficialTable, setBOfficialTable] = useState([]); // Define bOfficialTable


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/bpermit')
      .then((response) => {
        setBOfficialTable(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const submitReq = () => {
    Axios.post('http://localhost:3001/api/insert/bpermit', {
      position: position,
      firstName: firstName,
      lastName: lastName,
      contact: contact,
      address: address,
      Image: Image,
      startTerm: startTerm,
      endTerm: endTerm,
    })
    setBOfficialTable([
      ...bOfficialTable,
      {
        id: id,
        position: position,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        address: address,
        Image: Image,
        startTerm: startTerm,
        endTerm: endTerm,
      },
    ]);
  };


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

  const [showEditForm, setShowEditForm] = useState(false);
  // EDIT DISCARD FUNCTION
  const handleEditDiscard = () => { setShowEditForm(false); };

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


  const updateRowData = () => {
    Axios.put(`http://localhost:3001/api/update/bpermit/${selectedRowData.id}`, {
      position: editposition,
      firstName: editfirstName,
      lastName: editlastName,
      contact: editcontact,
      address: editaddress,
      Image: editImage,
      startTerm: editstartTerm,
      endTerm: editendTerm,
    }).then((response) => {
      const updatedTableData = bOfficialTable.map((rowData) => {
        if (rowData.id === selectedRowData.id) {
          return {
            ...rowData,
            position: editposition,
            firstName: editfirstName,
            lastName: editlastName,
            contact: editcontact,
            address: editaddress,
            Image: editImage,
            startTerm: editstartTerm,
            endTerm: editendTerm,
          };
        } else {
          return rowData;
        }
      });
      // Update the state with the new table data
      setBOfficialTable(updatedTableData);

      // Clear the selectedRowData and close the edit form
      setSelectedRowData(null);
      setShowEditForm(false);
    });
  };



  return (
    <>

      <div className={`bofficials-body ${isSidebarCollapsed ? 'expanded' : ''}`}>
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
          <div className="pagetitle"><h1> Business Permit  </h1> </div>
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
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
                        <button className="btn btn-primary float-end" onClick={toggleForm}>Add Officials</button>
                      </div>
                    </div>

                    <table className="table caption-top">
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
                        {bOfficialTable.length === 0 ? (
                          <tr>
                            <td colSpan="8">Loading...</td>
                          </tr>
                        ) : (
                          bOfficialTable.map((val) => {
                            const parsedStartTerm = parse(val.startTerm, 'yyyy-MM-dd', new Date());
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
                                  <div className="gap-2 d-md-flex justify-content-start align-items-center">
                                    <button type="button" className="btn btn-primary" onClick={() => showEditFormHandler(val)}>Edit</button>
                                    <form method="post" action="">
                                      <input type="hidden" name="id" value="" />
                                      <button className="btn btn-outline-danger" type="submit" name="deletePost">Delete</button>
                                    </form>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* POP-UP FORMS */}
              {showForm && (
                <div className="popup-overlay">
                  <div className="popup-form">
                    <form onSubmit={submitReq}>
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
                              value={editstartTerm}


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
                              value={editendTerm}

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
              )}


              {/* ------------------------------------------------- EDIT FORMS --------------------------------------------------------- */}
              {showEditForm && selectedRowData && (
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

              )}
            </div>
          </section>
        </main>

      </div>

    </>
  );
}






export default BofficialsAdmin;