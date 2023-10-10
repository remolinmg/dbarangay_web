import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationComponent = () => {

  const [userProfile, setuserProfile] = useState('');


  async function register(e) {
    e.preventDefault();

    try {

      await axios.post("http://localhost:8000/signup", {
        firstName, middleName, lastName, gender, region, civilStatus, employmentStatus, highestEducation, nationality, dateOfBirth, phoneNumber, email, password
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


  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const handleOptionSelect = (e) => {
    const selectedValue = e.target.value;
    setShowInputBoxes(selectedValue === "employed");
  };

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [barangay, setBarangay] = useState('');
  const [district, setDistrict] = useState('');
  const [cityMunicipality, setCityMunicipality] = useState('');
  const [province, setProvince] = useState('');

  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [gender, setGender] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [homeOwnership, setHomeOwnership] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [age, setAge] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [residenceClass, setresidenceClass] = useState('');
  const [voterRegistration, setVoterRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [middleNameValid, setMiddleNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [houseNumberValid, setHouseNumberValid] = useState(true);
  const [barangayValid, setBarangayValid] = useState(true);
  const [districtValid, setDistrictValid] = useState(true);
  const [cityMunicipalityValid, setCityMunicipalityValid] = useState(true);
  const [provinceValid, setProvinceValid] = useState(true);

  const [emailValid, setEmailValid] = useState(true);
  const [regionValid, setRegionValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [nationalityValid, setNationalityValid] = useState(true);
  const [civilStatusValid, setCivilStatusValid] = useState(true);
  const [genderValid, setGenderValid] = useState(true);
  const [employmentStatusValid, setEmploymentStatusValid] = useState(true);
  const [positionValid, setPositionValid] = useState(true);
  const [companyNameValid, setCompanyNameValid] = useState(true);

  const [homeOwnershipValid, setHomeOwnershipValid] = useState(true);
  const [dateOfBirthValid, setDateOfBirthValid] = useState(true);
  const [birthPlaceValid, setBirthPlaceValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [highestEducationValid, setHighestEducationValid] = useState(true);
  const [residenceClassValid, setResidenceClassValid] = useState(true);
  const [voterRegistrationValid, setVoterRegistrationValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);


  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    // Validate the first name
    if (firstName.trim() === '') {
      setFirstNameValid(false);
      return;
    }

    // Validate the middle name
    if (middleName.trim() === '') {
      setMiddleNameValid(false);
      return;
    }

    // Validate the last name
    if (lastName.trim() === '') {
      setLastNameValid(false);
      return;
    }

    // Validate the House No. / Street
    if (houseNumber.trim() === '') {
      setHouseNumberValid(false);
      return;
    }

    // Validate Barangay
    if (barangay.trim() === '') {
      setBarangayValid(false);
      return;
    }

    // Validate District
    if (district.trim() === '') {
      setDistrictValid(false);
      return;
    }

    // Validate City/Municipality
    if (cityMunicipality.trim() === '') {
      setCityMunicipalityValid(false);
      return;
    }

    // Validate Province
    if (province.trim() === '') {
      setProvinceValid(false);
      return;
    }



    if (region.trim() === '') {
      setRegionValid(false);
      return;
    }
    if (email.trim() === '') {
      setEmailValid(false);
      return;
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberValid(false);
      return;
    }
    if (nationality.trim() === '') {
      setNationalityValid(false);
      return;
    }
    if (gender.trim() === '') {
      setGenderValid(false);
      return;
    }
    if (civilStatus.trim() === '') {
      setCivilStatusValid(false);
      return;
    }
    if (employmentStatus.trim() === '') {
      setEmploymentStatusValid(false);
      return;
    }





    if (homeOwnership.trim() === '') {
      setHomeOwnershipValid(false);
      return;
    }
    if (dateOfBirth.trim() === '') {
      setDateOfBirthValid(false);
      return;
    }

    if (birthPlace.trim() === '') {
      setBirthPlaceValid(false);
      return;
    }
    if (age.trim() === '') {
      setAgeValid(false);
      return;
    }
    if (highestEducation.trim() === '') {
      setHighestEducationValid(false);
      return;
    }
    if (residenceClass.trim() === '') {
      setResidenceClassValid(false);
      return;
    }
    if (voterRegistration.trim() === '') {
      setVoterRegistrationValid(false);
      return;
    }
    if (password.trim() === '') {
      setPasswordValid(false);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      return;
    }


    try {

      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("Registration Failed!");
    }
  }

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameValid(value.trim() !== '');
  };

  const handleMiddleNameChange = (e) => {
    const value = e.target.value;
    setMiddleName(value);
    setMiddleNameValid(value.trim() !== '');
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameValid(value.trim() !== '');
  };

  const handleHouseNumberChange = (e) => {
    const value = e.target.value;
    setHouseNumber(value);
    setHouseNumberValid(value.trim() !== '');
  };

  const handleBarangayChange = (e) => {
    const value = e.target.value;
    setBarangay(value);
    setBarangayValid(value.trim() !== '');
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setDistrictValid(value.trim() !== '');
  };

  const handleCityMunicipalityChange = (e) => {
    const value = e.target.value;
    setCityMunicipality(value);
    setCityMunicipalityValid(value.trim() !== '');
  };

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value);
    setProvinceValid(value.trim() !== '');
  };



  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value);
    setRegionValid(value.trim() !== '');
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(value.trim() !== '');
  };
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneNumberValid(value.trim() !== '');
  };
  const handleNationalityChange = (e) => {
    const value = e.target.value;
    setNationality(value);
    setNationalityValid(value.trim() !== '');
  };
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderValid(value.trim() !== '');
  };
  const handleCivilStatusChange = (e) => {
    const value = e.target.value;
    setCivilStatus(value);
    setCivilStatusValid(value.trim() !== '');
  };

  const isCompanyNameValid = (value) => {
    return value.trim() !== '';
  };

  // Validation function for Position (You can customize the validation logic)
  const isPositionValid = (value) => {
    return value.trim() !== '';
  };

  // Validation function for Employment Status
  const isEmploymentStatusValid = (value) => {
    return value.trim() !== '';
  };

  // Change handler for Company Name
  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);
    setCompanyNameValid(isCompanyNameValid(value));
  };

  // Change handler for Position
  const handlePositionChange = (e) => {
    const value = e.target.value;
    setPosition(value);
    setPositionValid(isPositionValid(value));
  };

  // Change handler for Employment Status
  const handleEmploymentStatusChange = (e) => {
    const value = e.target.value;
    setEmploymentStatus(value);

    // Validate the employment status
    const isValid = value.trim() !== '';
    setEmploymentStatusValid(isValid);

    // If not "Unemployed," proceed with other validations
    if (value !== "Unemployed") {
      const isPositionValid = position.trim() !== ''; // Example validation for position
      setPositionValid(isPositionValid);
      const isCompanyNameValid = companyName.trim() !== ''; // Example validation for company name
      setCompanyNameValid(isCompanyNameValid);
    } else {
      setPositionValid(true);
      setCompanyNameValid(true);
    }
  };




  const handleHomeOwnershipChange = (e) => {
    const value = e.target.value;
    setHomeOwnership(value);
    setHomeOwnershipValid(value.trim() !== '');
  };
  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
    setDateOfBirthValid(value.trim() !== '');
  };
  const handleBirthPlaceChange = (e) => {
    const value = e.target.value;
    setBirthPlace(value);
    setBirthPlaceValid(value.trim() !== '');
  };
  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    setAgeValid(value.trim() !== '');
  };
  const handleHighestEducationChange = (e) => {
    const value = e.target.value;
    setHighestEducation(value);
    setHighestEducationValid(value.trim() !== '');
  };
  const handleResidenceClassChange = (e) => {
    const value = e.target.value;
    setresidenceClass(value);
    setResidenceClassValid(value.trim() !== '');
  };
  
  const handleVoterRegistrationChange = (e) => {
    const value = e.target.value;
    setVoterRegistration(value);
    const isValid = value.trim() !== '';
    setVoterRegistrationValid(isValid);
  };



  //PASSWORD VALIDATION----------------------------------------------------
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(isPasswordValid(value));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordValid(value === password);
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
                    <div className={`form-group d-flex flex-column ${!firstNameValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="first-name">First Name</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!firstNameValid ? 'is-invalid' : ''}`}
                        id="first-name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                      />
                    </div>

                    {/* MIDDLE NAME */}
                    <div className={`form-group d-flex flex-column ${!middleNameValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="middle-name">Middle Initial</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!middleNameValid ? 'is-invalid' : ''}`}
                        id="middle-name"
                        value={middleName}
                        onChange={handleMiddleNameChange}
                        required
                      />
                    </div>

                    {/* LAST NAME */}
                    <div className={`form-group d-flex flex-column ${!lastNameValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="last-name">Last Name</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!lastNameValid ? 'is-invalid' : ''}`}
                        id="last-name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                      />
                    </div>

                    {/* SUFFIX */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="last-name">Suffix</label>
                      <input
                        type="text" className="input-field"
                        id="last-name"

                        // onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    {/* HOUSE NO. / STREET */}
                    <div className={`form-group d-flex flex-column ${!houseNumberValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="house-no-street">House No. / Street</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!houseNumberValid ? 'is-invalid' : ''}`}
                        id="house-no-street"
                        value={houseNumber}
                        onChange={handleHouseNumberChange}
                        required
                      />
                    </div>

                    {/* BARANGAY */}
                    <div className={`form-group d-flex flex-column ${!barangayValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="barangay">Barangay</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!barangayValid ? 'is-invalid' : ''}`}
                        id="barangay"
                        value={barangay}
                        onChange={handleBarangayChange}
                        required
                      />
                    </div>

                    {/* DISTRICT */}
                    <div className={`form-group d-flex flex-column ${!districtValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="district">District</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!districtValid ? 'is-invalid' : ''}`}
                        id="district"
                        value={district}
                        onChange={handleDistrictChange}
                        required
                      />
                    </div>

                    {/* CITY/MUNICIPALITY */}
                    <div className={`form-group d-flex flex-column ${!cityMunicipalityValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="city-municipality">City/Municipality</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!cityMunicipalityValid ? 'is-invalid' : ''}`}
                        id="city-municipality"
                        value={cityMunicipality}
                        onChange={handleCityMunicipalityChange}
                        required
                      />
                    </div>

                    {/* PROVINCE */}
                    <div className={`form-group d-flex flex-column ${!provinceValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="province">Province</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!provinceValid ? 'is-invalid' : ''}`}
                        id="province"
                        value={province}
                        onChange={handleProvinceChange}
                        required
                      />
                    </div>
                  </div>

                  {/* SECOND COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row2 p-3">

                    {/* REgion */}
                    <div className={`form-group d-flex flex-column ${!regionValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="region">Region</label>
                      <input
                        type="text" className={`input-field form-control ${!regionValid ? 'is-invalid' : ''}`}
                        id="region"
                        value={region}
                        onChange={handleRegionChange}
                        required
                      />
                    </div>

                    {/* EMAIL ADDRESS*/}
                    <div className={`form-group d-flex flex-column ${!emailValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="email">Email Address</label>
                      <input
                        type="email" className={`input-field form-control ${!emailValid ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className={`form-group d-flex flex-column ${!phoneNumberValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel" className={`input-field form-control ${!phoneNumberValid ? 'is-invalid' : ''}`}
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                      />
                    </div>

                    {/* NATIONALITY */}
                    <div className={`form-group d-flex flex-column ${!nationalityValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="nationality">Nationality</label>
                      <input
                        type="text" className={`input-field form-control ${!nationalityValid ? 'is-invalid' : ''}`}
                        id="nationality"
                        value={nationality}
                        onChange={handleNationalityChange}
                        required
                      />
                    </div>

                    {/* GENDER */}
                    <div className={`form-group d-flex flex-column ${!genderValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        onChange={handleGenderChange}
                        className={`option form-control ${!genderValid ? 'is-invalid' : ''}`}
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    {/* CIVIL STATUS */}
                    <div className={`form-group d-flex flex-column ${!civilStatusValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="civilStatus">Civil Status</label>
                      <select
                        id="civilStatuss"
                        value={civilStatus}
                        onChange={handleCivilStatusChange}
                        className={`option form-control ${!civilStatusValid ? 'is-invalid' : ''}`}
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Civil Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="widow">Widow/er</option>
                        <option value="separated">Separated</option>
                      </select>
                    </div>
                    {/* EMPLOYMENT STATUS */}
                    <div className={`form-group d-flex flex-column ${!employmentStatusValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="employmentStatus">
                        Employment Status
                      </label>
                      <select
                        id="employmentStatus"
                        onChange={handleEmploymentStatusChange}
                        className={`input-field form-control ${!employmentStatusValid ? 'is-invalid' : ''}`}
                        value={employmentStatus}
                        required
                      >
                        <option value="">Select Employment Status</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                      </select>
                    </div>

                    {employmentStatus === 'Employed' && (
                      <>
                        <div className={`form-group d-flex flex-column ${!companyNameValid ? 'has-error' : ''}`}>
                          <label className="label" htmlFor="companyName">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className={`input-field form-control ${!companyNameValid ? 'is-invalid' : ''}`}
                            id="companyName"
                            value={companyName}
                            onChange={handleCompanyNameChange}
                            required
                          />
                        </div>
                        <div className={`form-group d-flex flex-column ${!positionValid ? 'has-error' : ''}`}>
                          <label className="label" htmlFor="position">
                            Position
                          </label>
                          <input
                            type="text"
                            className={`input-field form-control ${!positionValid ? 'is-invalid' : ''}`}
                            id="position"
                            value={position}
                            onChange={handlePositionChange}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* THIRD COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row3 p-3">
                    {/* Home Ownership */}
                    <div className={`form-group d-flex flex-column ${!homeOwnershipValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="homeOwnership">Home Ownership</label>
                      <select
                        id="homeOwnership"
                        onChange={handleHomeOwnershipChange}
                        className={`option form-control ${!homeOwnershipValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Ownership</option>
                        <option value="owner">Owner</option>
                        <option value="renting">Renting</option>
                      </select>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className={`form-group d-flex flex-column ${!dateOfBirthValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date" className={`input-field form-control ${!dateOfBirthValid ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        required
                      />
                    </div>

                    {/* PLACE OF BIRTH */}
                    <div className={`form-group d-flex flex-column ${!birthPlaceValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="placeofbirth">Place of Birth</label>
                      <input
                        type="text" className={`input-field form-control ${!birthPlaceValid ? 'is-invalid' : ''}`}
                        id="placeofbirth"
                        value={birthPlace}
                        onChange={handleBirthPlaceChange}
                        required
                      />
                    </div>

                    {/* Age */}
                    <div className={`form-group d-flex flex-column ${!ageValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="Age">Age</label>
                      <input
                        type="text" className={`input-field form-control ${!ageValid ? 'is-invalid' : ''}`}
                        id="Age"
                        value={age}
                        onChange={handleAgeChange}
                        required
                      />
                    </div>

                    {/* Educational Attainment */}
                    <div className={`form-group d-flex flex-column ${!highestEducationValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="H-Educational-A">Educational Attainment</label>
                      <select
                        id="h-educational-a"
                        onChange={handleHighestEducationChange}
                        className={`option2 form-control ${!highestEducationValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Highest Educational Attainment</option>
                        <option value="undergrad">Undergraduate (Bachelor's Degree)</option>
                        <option value="postgrad">Postgraduate (Master's Degree)</option>
                        <option value="doctoral">Doctoral (PhD)</option>
                      </select>
                    </div>

                    {/* Residence Class */}
                    <div className={`form-group d-flex flex-column ${!residenceClassValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="residenceClass"> Residence Class</label>
                      <select
                        id="residenceClass"
                        onChange={handleResidenceClassChange}
                        className={`option2 form-control ${!residenceClassValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Residence Class</option>
                        <option value="PWD">Person with Disability (PWD)</option>
                        <option value="soloParent">Solo Parent</option>
                        <option value="outOfSchoolYouth">Out of School Youth</option>
                        <option value="student">Student</option>
                      </select>
                    </div>


                    {/* Voter's Registration */}
                    <div className={`form-group d-flex flex-column ${!voterRegistrationValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="voterRegistration">Voter's Registration</label>
                      <select
                        id="voterRegistration"
                        onChange={handleVoterRegistrationChange}
                        className={`option2 form-control ${!voterRegistrationValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Voter's Registration</option>
                        <option value="registeredvoter">Registered</option>
                        <option value="unregisteredvoter">Not Registered</option>
                      </select>
                    </div>


                    {/* Password */}
                    <div className={`form-group d-flex flex-column ${!passwordValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className={`input-field form-control ${!passwordValid ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className={`form-group d-flex flex-column ${!confirmPasswordValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="cpassword">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className={`input-field form-control ${!confirmPasswordValid ? 'is-invalid' : ''}`}
                        id="cpassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
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
            <p className="reg-p"><b>Data Collection: </b> When you register on the Barangay Harapin ang Bukas App, we collect certain personal information to facilitate your access and usage of our services. This includes, but is not limited to, your name, address, contact information, and other relevant details required for registration.</p>
            <p className="reg-p"><b>Data Usage: </b> We use the information you provide during registration solely for the purpose of enabling you to access and use the features and services offered by the app. Your data will not be used for any other purpose without your explicit consent.</p>
            <p className="reg-p"><b>Data Security: </b> We implement robust security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include data encryption, access controls, and regular security assessments.</p>
            <p className="reg-p"><b>Data Retention: </b> Your personal data will be retained for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws and regulations. We will delete your data when it is no longer needed.</p>
            <p className="reg-p"><b>User Rights: </b>  You have the right to access, correct, delete, or export your personal data stored on our app. If you have any such requests or inquiries, please contact us through the provided channels.</p>
            <p className="reg-p"><b>Consent Mechanism: </b> By registering on the BARANGAY HARAPIN ANG BUKAS App, you give your informed consent for the collection and use of your personal information as outlined in this statement.n</p>
            <p className="reg-p"><b>User Rights: </b>  You have the right to access, correct, delete, or export your personal data stored on our app. If you have any such requests or inquiries, please contact us through the provided channels.</p>
            <p className="reg-p"><b>User Rights: </b>  You have the right to access, correct, delete, or export your personal data stored on our app. If you have any such requests or inquiries, please contact us through the provided channels.</p>
          </div>
        </div>
      </div>
    </div>


  );
};


export default RegistrationComponent;