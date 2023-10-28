import 'bootstrap/dist/css/bootstrap.css';
import '../user-components/assets/css/user-style.css';
import './assets/css/style.css';
import { useRef, useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';


function Admindetails() {
   
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

    const [ProfilesubmenuVisible, setProfileSubmenuVisible] = useState(false);
    const toggleProfileSubmenu = () => {
        setProfileSubmenuVisible(!ProfilesubmenuVisible);
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // DATA FETCHING
    const [data, setData] = useState([]);
    useEffect(() => {
      fetchData(); // Fetch initial data when the component mounts
    }, []);
   
    const fetchData = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) { 
        const decoded = jwt_decode(token);
          const _id = decoded.id;
          const response = await axios.get(`http://localhost:8000/get/userprofile/${_id}`);
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <>
        
            <div className="user-profile">
                <div className="container user-profile-container pt-5 pe-3 ps-3 pb-5">            
                    <div className="card user-profile-card p-4 m-5">

                    {Array.isArray(data) ? (
                            data.map((item, index) => (
                                <div key={index}>
                        <section>
                            <div className="profile-pic-container ps-3 m-0">
                                <img src={profilePicSrc} alt="Profile Picture" className="profile-pic" id="profile-pic" />
                            </div>
                            <div className="p-3 m-0">
                                <input type="file" accept="image/*" id="file-input" className="file-input" onChange={handleFileChange} />
                                <label htmlFor="file-input" className="upload-button">Upload Profile</label>
                            </div>
                        </section>
                        <section>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" onClick={() => showContent(1)} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={activeContent === 1} />
                                <label className="btn btn-outline-primary" id="settings_btn" htmlFor="btnradio1">Settings</label>

                                <input type="radio" onClick={() => showContent(2)} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={activeContent === 2} />
                                <label className="btn btn-outline-primary" id="viewrequest_btn" htmlFor="btnradio2">View Requests</label>
                            </div>
                            <div id="line"></div>
                        </section>
                        <section>
                            <div id="content1" className={`settings content ${activeContent === 1 ? 'active' : ''}`}>
                                {/* Residence Profile Section */}
                                <section className="residence-profile m-3">
                                    <h3><b>Residence Profile</b></h3>
                                    <form class="form1">
                                        <h2 id="form_name">FULL NAME</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="lastName" class="form-label">Last Name:</label>
                                                <input type="text" id="lastName" class="form-control" value={item.lastName} aria-label="LAST NAME"  />
                                            </div>
                                            <div class="col">
                                                <label for="firstName" class="form-label">First Name:</label>
                                                <input type="text" id="firstName" class="form-control" value={item.firstName} aria-label="FIRST NAME"  />
                                            </div>
                                            <div class="col">
                                                <label for="midName" class="form-label">Middle Name:</label>
                                                <input type="text" id="midName" class="form-control" value={item.middleName} aria-label="MIDDLE NAME"  />
                                            </div>
                                            <div class="col">
                                                <label for="midName" class="form-label">Suffix:</label>
                                                <input type="text" id="suffix" class="form-control" value={item.suffix} aria-label="SUFFIX"  />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form2">
                                        <h2 id="form_name">COMPLETE ADDRESS</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="house&streetName" class="form-label">House no., Street:</label>
                                                <input type="text" id="house&streetName" class="form-control" value={item.houseNumber}  aria-label="House no. & Street"  />
                                            </div>
                                            <div class="col">
                                                <label for="brgyName" class="form-label">Barangay:</label>
                                                <input type="text" id="brgyName" class="form-control" value={item.barangay} aria-label="Barangay"  />
                                            </div>
                                            <div class="col">
                                                <label for="districtName" class="form-label">District:</label>
                                                <input type="text" id="districtName" class="form-control" value={item.district}  aria-label="District"  />
                                            </div>
                                        </div>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="cityName" class="form-label">City/Municipality:</label>
                                                <input type="text" id="cityName" class="form-control" value={item.cityMunicipality} aria-label="House no. & Street"  />
                                            </div>
                                            <div class="col">
                                                <label for="provinceName" class="form-label">Province:</label>
                                                <input type="text" id="provinceName" class="form-control" value={item.province}  aria-label="Barangay"  />
                                            </div>
                                            <div class="col">
                                                <label for="regionName" class="form-label">Region:</label>
                                                <input type="text" id="regionName" class="form-control" value={item.region}  aria-label="District"  />
                                            </div>
                                        </div>
                                    </form>

                                    <form class="form3">
                                        <h2 id="form_name">MAILING ADDRESS</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="emailName" class="form-label">Email/FB Account:</label>
                                                <input type="text" id="emailName" class="form-control" value={item.email} aria-label="House no. & Street"  />
                                            </div>
                                            <div class="col">
                                                <label for="contactName" class="form-label">Contact:</label>
                                                <input type="text" id="contactName" value={item.phoneNumber} class="form-control" aria-label="Barangay"  />
                                            </div>
                                            <div class="col">
                                                <label for="nationalityName" class="form-label">Nationality:</label>
                                                <input type="text" id="nationalityName" value={item.nationality} class="form-control" aria-label="District"  />
                                            </div>
                                        </div>
                                    </form>
                                </section>

                                {/* Personal Information Section */}
                                <section className="personal-information m-3">
                                    <h3><b>Personal Information</b></h3>
                                    <form class="form4 mt-3">
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="sex" class="form-label">Sex:</label>
                                                <input type="text" id="sex" class="form-control" value={item.sex} aria-label="SEX"  />
                                            </div>
                                            <div class="col">
                                                <label for="civilstatus" class="form-label">Civil Status:</label>
                                                <input type="text" id="civilstatus" class="form-control" value={item.civilStatus}  aria-label="CIVIL STATUS"  />
                                            </div>
                                            <div class="col">
                                                <label for="homeownership" class="form-label">Home Ownership: </label>
                                                <select
                        id="homeOwnership"
                        value={item.homeOwnership}
                        className={` form-control`}
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
                        value={item.employmentStatus}
                        className={` form-control`}
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
                                                <input type="text" id="companyName" class="form-control" value={item.companyName} aria-label="House no. & Street"  />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Position:</label>
                                                <input type="text" id="positionName" class="form-control" value={item.position} aria-label="Barangay"  />
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form6 mt-3">
                                        <h2 id="form_name">Birthdate/Birthplace</h2>
                                        <div class="row g-3">
                                            <div class="col">
                                                <label for="companyName" class="form-label">Birthdate:</label>
                                                <input
                                                    type="date" className="form-control"
                                                    id="dateOfBirth"
                                                    value={item.dateOfBirth}
                                                />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">City/Municipality:</label>
                                                <input type="text" id="positionName" class="form-control" value={item.birthPlace}aria-label="Barangay"  />
                                            </div>
                                            <div class="col">
                                                <label for="positionName" class="form-label">Age:</label>
                                                <input type="text" id="positionName" class="form-control" aria-label="Barangay" value={item.age} />
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
                       value={item.highestEducation}
                        className={`form-control `}
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
                        id="h-residence"
                       value={item.residenceClass}
                        className={`form-control `}
                        required
                      >
                        <option value="">Select Residence Class</option>
                        <option value="PWD">Person with Disability (PWD)</option>
                        <option value="soloParent">Solo Parent</option>
                        <option value="outOfSchoolYouth">Out of School Youth</option>
                      </select>
                                            </div>
                                        </div>
                                     
                                    </form>
                                </section>
                                <div id="save_btn" className="save_btn">
                                    <input type="checkbox" className="btn-check" id="btn-check-3" />
                                    <label className="btn btn-primary" htmlFor="btn-check-3">
                                        Save Changes
                                    </label>
                                </div>
                            </div>


                            <div id="content2" className={`viewreq content ${activeContent === 2 ? 'active' : ''}`}>
                                <section className="request-summary flex-column m-3">
                                    <h3><b>Request</b></h3>
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
                                                <td>aaa</td>
                                                <td>bbbbb</td>
                                                <td>ccccccccc</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>dddddddd</td>
                                                <td>eeeeeeeeee</td>
                                                <td>fffffffff</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>gggggggggg</td>
                                                <td>hhhhhhhhhh</td>
                                                <td>iiiiiiii</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </section>
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

export default Admindetails;