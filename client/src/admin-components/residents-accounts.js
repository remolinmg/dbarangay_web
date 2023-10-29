import 'bootstrap/dist/css/bootstrap.css';
import Picture from '../user-components/assets/img/Official1.jpg';
import '../user-components/assets/css/user-style.css';
import './assets/css/style.css';
import Axios from "axios";
import { BsCamera } from "react-icons/bs";
import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from "react-icons/fa";

function Residentsaccounts() {
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
   

   //  ------------------------------ EDIT FORM STATES (ShowForrms) ------------------------------
   const [editFirstName, setEditFirstName] = useState('');
  const [editMiddleName, setEditMiddleName] = useState('');
  const [editLastName, setEditLastName] = useState( '');
  const [editSuffix, setEditSuffix] = useState('');
  const [editHouseNumber, setEditHouseNumber] = useState('');
  const [editBarangay, setEditBarangay] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editCityMunicipality, setEditCityMunicipality] = useState('');
  const [editProvince, setEditProvince] = useState('');

  const [editEmail, setEditEmail] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editNationality, setEditNationality] = useState('');
  const [editCivilStatus, setEditCivilStatus] = useState('');
  const [editSex, setEditSex] = useState('');
  const [editEmploymentStatus, setEditEmploymentStatus] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');

  const [editHomeOwnership, setEditHomeOwnership] = useState('');
  const [editDateOfBirth, setEditDateOfBirth] = useState('');
  const [editBirthPlace, setEditBirthPlace] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editHighestEducation, setEditHighestEducation] = useState('');
  const [editResidenceClass, setEditResidenceClass] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editRoles, setEditRoles] = useState('');
  const [editVoterRegistration, setEditVoterRegistration] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
      fetchData(); // Fetch initial data when the component mounts
  }, []);

  const fetchData = async () => {
      try {
          const accountId = localStorage.getItem('account');
          const response = await axios.get(`http://localhost:8000/get/useredit/${accountId}`);
          setData(response.data);
      } catch (error) {
          console.error(error);
      }
  };


    const updateRowData = async () => {
        try {
         const accountId = localStorage.getItem('account');
          const formData = new FormData();
          formData.append('firstName', editFirstName);
          formData.append('middleName', editMiddleName);
          formData.append('lastName', editLastName);
          formData.append('suffix', editSuffix);
          formData.append('houseNumber', editHouseNumber);
          formData.append('barangay', editBarangay);
          formData.append('district', editDistrict);
          formData.append('cityMunicipality', editCityMunicipality);
          formData.append('province', editProvince);
          formData.append('email', editEmail);
          formData.append('region', editRegion);
          formData.append('phoneNumber', editPhoneNumber);
          formData.append('nationality', editNationality);
          formData.append('civilStatus', editCivilStatus);
          formData.append('sex', editSex);
          formData.append('employmentStatus', editEmploymentStatus);
          formData.append('position', editPosition);
          formData.append('companyName', editCompanyName);
          formData.append('homeOwnership', editHomeOwnership);
          formData.append('dateOfBirth', editDateOfBirth);
          formData.append('birthPlace', editBirthPlace);
          formData.append('age', editAge);
          formData.append('highestEducation', editHighestEducation);
          formData.append('residenceClass', editResidenceClass);
          formData.append('status', editStatus);
          formData.append('roles', editRoles);
          formData.append('voterRegistration', editVoterRegistration);
        //   formData.append('file', editFile);
          const response = await axios.put(
            `http://localhost:8000/update/user/${accountId}`,
            formData
          );
          console.log(response.data);
          fetchData();
        } catch (error) {
          console.error(error);
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

    const navigate = useNavigate();
    const handleSignOut = () => {
        window.localStorage.clear();
        document.cookie = 'access_token= ;';
        localStorage.removeItem('jwtToken');
        navigate('/admin')
    };

    const back = () => {
        window.history.back()
    }

    //EDIT INFORMATION

    const [lastName, setLastName] = useState(''); // Initialize with the current last name
    const [newLastName, setNewLastName] = useState(''); // Initialize with an empty string
    const [changesSaved, setChangesSaved] = useState(false);
    const [loading, setLoading] = useState(true); // To track data loading state

    // Function to handle changes in the last name input
    const handleLastNameChange = (e) => {
        setNewLastName(e.target.value);
        setChangesSaved(false);
    };

    // Function to save changes
    const saveChanges = () => {
        // Update the last name with the new value
        setLastName(newLastName);
        setChangesSaved(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountId = localStorage.getItem('account');
                const response = await axios.get(`http://localhost:8000/get/useredit/${accountId}`);
                const lastNameFromDatabase = response.data.lastName; // Access the lastName from the response

                setLastName(lastNameFromDatabase);
                setNewLastName(lastNameFromDatabase);
                setLoading(false); // Data is now loaded
            } catch (error) {
                console.error(error);
                setLoading(false); // Handle error and set loading to false
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
       
            <div className="topbarsection">
                <div className="topnavbar d-flex justify-content-between align-items-center">
                    <div className="topnavlef adminicon" onClick={back} >

                        <BsFillArrowLeftCircleFill className="return1" />

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
                                            <div onClick={handleSignOut} className="profilebuttons">
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
            <div className="residentsaccount">
                <div className="content_background">
                    <div className="content_container">

                        {Array.isArray(data) ? (
                            data.map((item, index) => (
                                <div key={index}>

                                    <div className="profile-pic-container">
                                        <img src={profilePicSrc} alt="Profile Picture" className="profile-pic" id="profile-pic" />
                                    </div>
                                    <div>
                                        <input type="file" accept="image/*" id="file-input" className="file-input" onChange={handleFileChange} />
                                        <label htmlFor="file-input" className="upload-button">Upload Profile</label>
                                    </div>

                                    <select
                                        id="role"
                                        className="form-control"
                                        required
                                        value={item.type}
                                        onChange={(e) => {
                                            if (item.type === 'superadmin') {
                                                // Handle the change event and update the user's role

                                            }
                                        }}
                                        disabled={item.type !== 'superadmin'}
                                    >
                                        <option value="resident">Resident</option>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>


                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" onClick={() => showContent(1)} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={activeContent === 1} />
                                        <label className="btn btn-outline-primary" id="settings_btn" htmlFor="btnradio1">Settings</label>

                                        <input type="radio" onClick={() => showContent(2)} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={activeContent === 2} />
                                        <label className="btn btn-outline-primary" id="viewrequest_btn" htmlFor="btnradio2">View Requests</label>
                                    </div>
                                    <div id="line"></div>

                                    <h1 id="content_title">Residence Profiling</h1>

                                    <div id="content1" className={`settings content ${activeContent === 1 ? 'active' : ''}`}>
                                        {/* Residence Profile Section */}
                                        <section className="residence_profile">
                                            <h1 id="title">Residence Profile</h1>
                                            <div className="form1">
                                                <h2 id="form_name">{item._id}</h2>
                                                <br></br>
                                                <h2 id="form_name">FULL NAME</h2>
                                                <div class="row g-3">
                                                    <div class="col">
                                                        <label for="lastName" class="form-label">Last Name:</label>
                                                        <input type="text" id="lastName" class="form-control" value={ item.lastName}  onChange={(e) => {
                                setEditLastName(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="firstName" class="form-label">First Name:</label>
                                                        <input type="text" id="firstName" class="form-control" value={item.firstName} aria-label="FIRST NAME"  onChange={(e) => {
                                setEditFirstName(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="midName" class="form-label">Middle Name:</label>
                                                        <input type="text" id="midName" class="form-control" value={item.middleName} aria-label="MIDDLE NAME"  onChange={(e) => {
                                setEditMiddleName(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="suffix" class="form-label">Suffix:</label>
                                                        <input type="text" id="suffix" class="form-control" value={item.suffix} aria-label="SUFFIX"  onChange={(e) => {
                                setEditSuffix(e.target.value);
                              }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Complete Address */}
                                            <div class="form2">
                                                <h2 id="form_name">COMPLETE ADDRESS</h2>
                                                <div class="row g-3">
                                                    <div class="col">
                                                        <label for="house&streetName" class="form-label">House no., Street:</label>
                                                        <input type="text" id="house&streetName" class="form-control" value={item.houseNumber} aria-label="House no. & Street"  onChange={(e) => {
                                setEditHouseNumber(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="brgyName" class="form-label">Barangay:</label>
                                                        <input type="text" id="brgyName" class="form-control" value={item.barangay} aria-label="Barangay"  onChange={(e) => {
                                setEditBarangay(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="districtName" class="form-label">District:</label>
                                                        <input type text id="districtName" class="form-control" value={item.district} aria-label="District"  onChange={(e) => {
                                setEditDistrict(e.target.value);
                              }}/>
                                                    </div>
                                                </div>
                                                <div class="row g-3">
                                                    <div class="col">
                                                        <label for="cityName" class="form-label">City/Municipality:</label>
                                                        <input type="text" id="cityName" class="form-control" value={item.cityMunicipality} aria-label="City"  onChange={(e) => {
                                setEditCityMunicipality(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="provinceName" class="form-label">Province:</label>
                                                        <input type="text" id="provinceName" class="form-control" value={item.province} aria-label="Barangay"  onChange={(e) => {
                                setEditProvince(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="regionName" class="form-label">Region:</label>
                                                        <input type="text" id="regionName" class="form-control" value={item.region} aria-label="District"  onChange={(e) => {
                                setEditRegion(e.target.value);
                              }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mailing Address */}
                                            <div class="form3">
                                                <h2 id="form_name">MAILING ADDRESS</h2>
                                                <div class="row g-3">
                                                    <div class="col">
                                                        <label for="emailName" class="form-label">Email/FB Account:</label>
                                                        <input type="text" id="emailName" class="form-control" value={item.email} aria-label="House no. & Street"  onChange={(e) => {
                                setEditEmail(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="contactName" class="form-label">Contact:</label>
                                                        <input type="text" id="contactName" class="form-control" value={item.phoneNumber} aria-label="Barangay"  onChange={(e) => {
                                setEditPhoneNumber(e.target.value);
                              }}/>
                                                    </div>
                                                    <div class="col">
                                                        <label for="nationalityName" class="form-label">Nationality:</label>
                                                        <input type="text" id="nationalityName" class="form-control" value={item.nationality} aria-label="District"  onChange={(e) => {
                                setEditNationality(e.target.value);
                              }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Personal Information */}
                                            <section className="personal-information m-3">
                                                <h3><b>Personal Information</b></h3>
                                                <form class="form4 mt-3">
                                                    <div class="row g-3">
                                                        <div class="col">
                                                            <label for="sex" class="form-label">Sex:</label>
                                                            <select
                                                                id="sex"
                                                                class="form-control"
                                                                value={item.sex}
                                                                onChange={(e) => {
                                                                    setEditSex(e.target.value);
                                                                  }}
                                                            >
                                                                <option value="">Select Sex</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div class="col">
                                                            <label for="civilstatus" class="form-label">Civil Status:</label>
                                                            <select
                                                                id="civilStatuss"
                                                                class="form-control"
                                                                value={item.civilStatus}
                                                                onChange={(e) => {
                                                                    setEditCivilStatus(e.target.value);
                                                                  }}
                                                            >
                                                                <option value="">Select Civil Status</option>
                                                                <option value="Single">Single</option>
                                                                <option value="Married">Married</option>
                                                                <option value="Widow">Widow/er</option>
                                                                <option value="Separated">Separated</option>
                                                            </select>
                                                        </div>
                                                        <div class="col">
                                                            <label for="homeownership" class="form-label">Home Ownership: </label>
                                                            <select
                                                                id="homeOwnership"
                                                                class="form-control"
                                                                value={item.homeOwnership}
                                                                onChange={(e) => {
                                                                    setEditHomeOwnership(e.target.value);
                                                                  }}
                                                                required
                                                            >
                                                                <option value="">Select Ownership</option>
                                                                <option value="Owner">Owner</option>
                                                                <option value="Renting">Renting</option>
                                                            </select>
                                                        </div>
                                                        <div class="col">
                                                            <label for="employmentstatus" class="form-label">Employment Status:</label>
                                                            <select
                                                                id="employmentStatus"
                                                                class="form-control"
                                                                value={item.employmentStatus}
                                                                onChange={(e) => {
                                                                    setEditEmploymentStatus(e.target.value);
                                                                  }}
                                                                required
                                                            >
                                                                <option value="">Select Employment Status</option>
                                                                <option value="Employed">Employed</option>
                                                                <option value="Unemployed">Unemployed</option>
                                                                <option value="Student">Student</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form class="form5 mt-3">
                                                    <h5 id="form_name">Employment Information</h5>
                                                    <div class="row g-3">
                                                        <div class="col">
                                                            <label for="companyName" class="form-label">Company Name:</label>
                                                            <input type="text" id="companyName" class="form-control" value={item.companyName} aria-label="House no. & Street"  onChange={(e) => {
                                setEditCompanyName(e.target.value);
                              }}/>
                                                        </div>
                                                        <div class="col">
                                                            <label for="positionName" class="form-label">Position:</label>
                                                            <input type="text" id="positionName" class="form-control" value={item.position} aria-label="Barangay"  onChange={(e) => {
                                setEditPosition(e.target.value);
                              }}/>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form class="form6 mt-3">
                                                    <h2 id="form_name">Birthdate/Birthplace</h2>
                                                    <div class="row g-3">
                                                        <div class="col">
                                                            <label for="birthdate" class="form-label">Birthdate:</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="birthdate"
                                                                value={item.dateOfBirth ? new Date(item.dateOfBirth).toISOString().split('T')[0] : ''}
                                                                onChange={(e) => {
                                                                    setEditDateOfBirth(e.target.value);
                                                                  }}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col">
                                                            <label for="birthplace" class="form-label">Birthplace:</label>
                                                            <input type="text" id="birthplace" class="form-control" value={item.birthPlace} aria-label="Barangay"  onChange={(e) => {
                                setEditBirthPlace(e.target.value);
                              }}/>
                                                        </div>
                                                        <div class="col">
                                                            <label for="age" class="form-label">Age:</label>
                                                            <input type="text" id="age" class="form-control" value={item.age} aria-label="Barangay" 
                                                             onChange={(e) => {
                                                                setEditAge(e.target.value);
                                                              }}/>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form class="form7 mt-3">
                                                    <h2 id="form_name">Educational Attainment</h2>
                                                    <div class="row g-3">
                                                        <div class="col">
                                                            <label for="educationalattainment" class="form-label">Highest Educational Attainment:</label>
                                                            <select
                                                                id="h-educational-a"
                                                                class="form-control"
                                                                value={item.highestEducation}
                                                                onChange={(e) => {
                                                                    setEditHighestEducation(e.target.value);
                                                                  }}
                                                                required
                                                            >
                                                                <option value="">Select Highest Educational Attainment</option>
                                                                <option value="Undergraduate">Undergraduate</option>
                                                                <option value="Elementary">Elementary</option>
                                                                <option value="Highschool">High School</option>
                                                                <option value="Bachelor">Bachelor's Degree</option>
                                                                <option value="Postgrad">Postgraduate (Master's Degree)</option>
                                                                <option value="Doctoral">Doctoral (PhD)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form class="form8 mt-3">
                                                    <h2 id="form_name">Residence Class</h2>
                                                    <div class="row g-3">
                                                        <div class="col">
                                                            <label for="residenceclass" class="form-label">Class:</label>
                                                            <select
                                                                id="residenceClass"
                                                                className="form-control"
                                                                value={item.residenceClass}
                                                                onChange={(e) => {
                                                                    setEditResidenceClass(e.target.value);
                                                                  }}
                                                            >
                                                                <option value="">Select Residence Class</option>
                                                                <option value="PWD">Person with Disability (PWD)</option>
                                                                <option value="soloParent">Solo Parent</option>
                                                                <option value="outOfSchoolYouth">Out of School Youth</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <label for="voter" class="form-label">Voter:</label>
                                                        <select
                                                            id="voter"
                                                            class="form-control"
                                                            required
                                                            value={item.voterRegistration
                                                            }
                                                            onChange={(e) => {
                                                                setEditVoterRegistration(e.target.value);
                                                              }}
                                                        >
                                                        <option value="">Select Voter's Registration</option>
                                                        <option value="Registeredvoter">Registered</option>
                                                        <option value="Unregisteredvoter">Not Registered</option>
                                                        </select>
                                                    </div>
                                                    <div class="col">
                                                        <label for="status" class="form-label">Status:</label>
                                                        <select
                                                            id="status"
                                                            class="form-control"
                                                            value={item.status}
                                                            onChange={(e) => {
                                                                setEditStatus(e.target.value);
                                                              }}
                                                            required
                                                        >
                                                            <option value="">Update status</option>
                                                            <option value="active">active</option>
                                                            <option value="inactive">inactive</option>
                                                        </select>
                                                    </div>
                                                    <div class="col">
                                                        <label for="role" class="form-label">Roles:</label>
                                                        <select
                                                            id="role"
                                                            class="form-control"
                                                            required
                                                            value={item.type}
                                                            onChange={(e) => {
                                                                setEditRoles(e.target.value);
                                                              }}
                                                        >
                                                            <option value="">Update role</option>
                                                            <option value="resident">resident</option>
                                                            <option value="admin">admin</option>
                                                            <option value="superadmin">superadmin</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </section>
                                            <div className="save_btn">
                                                <input type="checkbox" className="btn-check" id="btn-check-3" onClick={updateRowData}/>
                                                <label className="btn btn-primary" htmlFor="btn-check-3">
                                                    Save Changes
                                                </label>
                                            </div>
                                        </section>
                                    </div>

                                    {/* View Request */}
                                    <div id="content2" className={`view_request content ${activeContent === 2 ? 'active' : ''}`}>
                                        <h1>Request</h1>

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
                                                    <td>Jakhul</td>
                                                    <td>Salsalani</td>
                                                    <td>Guererro</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Abdhul</td>
                                                    <td>Marie</td>
                                                    <td>Ping</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Hakdugan</td>
                                                    <td>N/A</td>
                                                    <td>Makati</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No data to display.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
export default Residentsaccounts;