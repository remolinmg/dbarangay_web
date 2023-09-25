import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationComponent = () => {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [householdMember, setHouseholdMember] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8000/signup", {
        firstName, middleName, lastName, gender, religion, civilStatus, employmentStatus, highestEducation, nationality, address, householdMember, dateOfBirth, phoneNumber, email, password
      })
        .then(res => {
          if (res.data == "exist") {
            alert("User Already Exist!");
          }
          else if (res.data == "notexist") {
            navigate("/login");
          }
        })
        .catch(e => {
          alert("Registration Failed!")
          console.log(e);
        })

    }
    catch (e) {
      console.log(e);

    }

  }


  // const [isSelected, setIsSelected] = useState(false);
  // const handleOptionSelect = () => {
  //   setIsSelected(!isSelected);
  // };

  // const renderInputTextboxes = () => {
  //   if (isSelected) {
  //     return (
  //       <div>
  //         <div className="form-group">
  //           <label htmlFor="companyName">GCash Reference No.</label>
  //           <input
  //             type="text"
  //             id="companyName"
  //             name="companyName"
  //             className="form-control"
  //             required />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="position">Position</label>
  //           <input
  //             type="text"
  //             id="position"
  //             name="position"
  //             className="form-control"
  //             required />
  //         </div>
  //       </div>
  //     )
  //   }
  //   return null;
  // };

  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const handleOptionSelect = (e) => {
    const selectedValue = e.target.value;
    setShowInputBoxes(selectedValue === "employed");
  };


  return (
    <div className="container-fluid main-reg">
      <div className="row">
        <div className="col-12 col-md-8 left-side-reg">
          <div className="registration-container" id="registration-container">
            <form id="register">

              <h2 className="registration-heading"> REGISTRATION</h2>

              <div className="container form-container d-flex flex-column">
                {/*--------------- BASIC INFORMATION --------------- */}
                <div className="row justify-content-around">
                  {/* FIRST COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row1 p-3">
                    {/* FIRST NAME */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="first-name">First Name</label>
                      <input
                        type="text" className="input-field"
                        id="first-name"

                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    {/* MIDDLE INITIAL */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="middle-name">Middle Initial</label>
                      <input
                        type="text" className="input-field"
                        id="middle-name"

                        onChange={(e) => setMiddleName(e.target.value)}
                        required
                      />
                    </div>

                    {/* LAST NAME */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="last-name">Last Name</label>
                      <input
                        type="text" className="input-field"
                        id="last-name"

                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    {/* SUFFIX */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="last-name">Suffix</label>
                      <input
                        type="text" className="input-field"
                        id="last-name"

                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    {/* House Number */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">House No. / Street</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    {/* Barangay */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">Barangay</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    {/* District */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">District</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    {/* City/Municipality */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">City/Municipality</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    {/* Province */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">Province</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* SECOND COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row2 p-3">

                    {/* REgion */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="region">Region</label>
                      <input
                        type="text" className="input-field"
                        id="region"

                        onChange={(e) => setNationality(e.target.value)}
                        required
                      />
                    </div>

                    {/* EMAIL ADDRESS*/}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="email">Email Address</label>
                      <input
                        type="email" className="input-field"
                        id="email"

                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel" className="input-field"
                        id="phoneNumber"

                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>

                    {/* NATIONALITY */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="nationality">Nationality</label>
                      <input
                        type="text" className="input-field"
                        id="nationality"

                        onChange={(e) => setNationality(e.target.value)}
                        required
                      />
                    </div>

                    {/* GENDER */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        onChange={(e) => setGender(e.target.value)}
                        className="option" style={{ fontSize: '14px', marginBottom: '10px' }}

                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="secret">Secret</option>
                      </select>
                    </div>

                    {/* CIVIL STATUS */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="civilStatus">Civil Status</label>
                      <select
                        id="civilStatuss"
                        value={civilStatus}
                        onChange={(e) => setCivilStatus(e.target.value)}
                        className="option" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Civil Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="separated">Separated</option>
                      </select>
                    </div>

                    {/* Employment Status */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="employmentStatus"> Employment Status</label>
                      <select
                        id="employmentStatus"
                        className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Employment Status</option>
                        <option value="employed" >Employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                    </div>

                    {/* {renderInputTextboxes} */}
                    {showInputBoxes && (
                      <div>
                        <div className="form-group">
                          <label htmlFor="companyName">GCash Reference No.</label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="position">Position</label>
                          <input
                            type="text"
                            id="position"
                            name="position"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* THIRD COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row3 p-3">
                    {/* Home Ownership */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="HomeOwnership">Home Ownership</label>
                      <select
                        id="HomeOwnership"
                        onChange={(e) => setGender(e.target.value)}
                        className="option" style={{ fontSize: '14px', marginBottom: '10px' }}

                      >
                        <option value="">Select Ownership</option>
                        <option value="female">Owner</option>
                        <option value="secret">Renting</option>
                      </select>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date" className="input-field"
                        id="dateOfBirth"

                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                      />
                    </div>

                    {/* PLACE OF BIRTH */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="placeofbirth">Place of Birth</label>
                      <input
                        type="text" className="input-field"
                        id="placeofbirth"

                        onChange={(e) => setHouseholdMember(e.target.value)}
                        required
                      />
                    </div>

                    {/* Age */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="Age">Age</label>
                      <input
                        type="text" className="input-field"
                        id="Age"

                        onChange={(e) => setHouseholdMember(e.target.value)}
                        required
                      />
                    </div>

                    {/* Educational Attaintment */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="H-Educational-A">Educational Attainment</label>
                      <select
                        id="h-educational-a"

                        onChange={(e) => setHighestEducation(e.target.value)}
                        className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Highest Educational Attaintment</option>
                        <option value="undergrad">Undergraduate (Bachelor's Degree)</option>
                        <option value="postgrad">Postgraduate (Master's Degree)</option>
                        <option value="doctoral">Doctoral (PhD)</option>
                      </select>
                    </div>

                    {/* Residence Class */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="residenceClass"> Residence Class</label>
                      <select
                        id="residenceClass"

                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Residence Class</option>
                        <option value="worker">Person with Disability (PWD)</option>
                        <option value="employee">Solo Parent</option>
                        <option value="self-employed">Out of School Youth</option>
                      </select>
                    </div>

                    {/*Picture*/}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="profile">Profile Picture</label>
                      <input
                        type="file" className="input-field ps-2 pe-2"
                        id="profile" accept=".jpeg"

                        // onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    {/*PASSWORD*/}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="password">Password</label>
                      <input
                        type="password" className="input-field"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="cpassword">Confirm Password</label>
                      <input
                        type="password" className="input-field"
                        id="cpassword"
                      />
                    </div>
                  </div>
                  {/*------------------------------------------------------------------------------ */}
                </div>
                <div className="form-column">
                  <button type="submit" onClick={register}>Submit</button>
                  <p className="register-link text-center text-dark">
                    Already have an account? <a href="login">Log-in here</a>
                  </p>
                </div>
              </div>
            </form>
          </div >
        </div>
        <div className="col-12 col-md-4 right-side-reg text-light p-3">
          <div className="reg-desc p-5">
            <h3>Disclaimer:</h3>
            <p className="reg-p">This website (or organization) takes your privacy seriously. Any information collected through this platform will be treated with the utmost confidentiality and care. We are committed to ensuring that your personal information is kept secure and used only for the purposes of verification, as stated in our Privacy Policy.</p>
            <h5>Privacy Assurance:</h5>
            <p className="reg-p"><b>1. Non-Public Sharing: </b> We do not share your collected information publicly or with any third parties, unless required by law or for verification purposes explicitly agreed upon.</p>
            <p className="reg-p"><b>2. Verification: </b> The information collected may be used exclusively for identity verification, authentication, or internal processes that ensure the security and integrity of our services.</p>
            <p className="reg-p"><b>3. Data Security: </b> Your data will be stored securely, employing industry-standard security measures and protocols to protect it from unauthorized access, disclosure, or alteration.</p>
            <p className="reg-p"><b>4. Consent: </b> By using our services, you consent to the collection, storage, and use of your information for the specified purposes as outlined in our Privacy Policy.</p>
            <p className="reg-p"><b>5. Transparency: </b>  Our Privacy Policy provides detailed information on how your data is handled, including the types of data collected, the purposes for which it is used, and your rights regarding your personal information.</p>
          </div>
        </div>
      </div>



    </div>


  );
};


export default RegistrationComponent;