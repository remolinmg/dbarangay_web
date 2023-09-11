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

  async function register(e){
    e.preventDefault();

    try{

        await axios.post("http://localhost:8000/signup",{
            firstName,middleName,lastName,gender,religion,civilStatus,employmentStatus,highestEducation,nationality,address,householdMember,dateOfBirth,phoneNumber,email,password
        })  
        .then(res=>{
          if(res.data=="exist"){
            alert("User already exist");
          }
          else if(res.data=="notexist"){
              navigate("/login");
          }
      })
      .catch(e=>{
          alert("wrong details")
          console.log(e);
      })

    }
    catch(e){
        console.log(e);

    }

}

  return (
    <div className="container-fluid main-reg">
      <div className="row">
        <div className="col-12 col-md-8 left-side-reg">
          <div className="registration-container" id="registration-container">
            <form id="register">

              <h2 className="registration-heading"> REGISTRATION</h2>
              <h3 className="heading">BASIC INFORMATION</h3>

              <div className="container form-container d-flex flex-column">
                {/*--------------- BASIC INFORMATION --------------- */}
                <div className="row justify-content-around">
                  <div className="col-12 col-md-6 reg-row1 p-3">
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

                    {/* MIDDLE NAME */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="middle-name">Middle Name</label>
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

                    {/* RELIGION */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="religion">Religion</label>
                      <select
                        id="religion"

                        onChange={(e) => setReligion(e.target.value)}
                        className="option" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Religion</option>
                        <option value="catholic">Roman Catholic</option>
                        <option value="inc">Iglesia ni Cristo</option>
                        <option value="muslim">Muslim</option>
                        <option value="islam">Islam</option>
                        <option value="sda">Seventh Day Adventist</option>
                        <option value="jw">Jehovah's Witness</option>
                        <option value="others">Other religious affiliations</option>
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

                    {/* ADDRESS */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="address">Address</label>
                      <input
                        type="text" className="input-field"
                        id="address"

                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 reg-row2 p-3">
                    {/* Highest Educational Attaintment */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="H-Educational-A">Highest Education</label>
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

                    {/* Employment Status */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="employmentStatus"> Employment Status</label>
                      <select
                        id="employmentStatus"

                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="option2" style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Employment Status</option>
                        <option value="worker">Worker</option>
                        <option value="employee">Employee</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                    </div>


                    {/* hOUSEHOLD MEMBER */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="householdMember">Household Member</label>
                      <input
                        type="text" className="input-field"
                        id="householdMember"

                        onChange={(e) => setHouseholdMember(e.target.value)}
                        required
                      />
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


                    {/*--------------- CONTACT DETAILS --------------- */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel" className="input-field"
                        id="phoneNumber"

                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    {/* 2ND NUMBER*/}
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