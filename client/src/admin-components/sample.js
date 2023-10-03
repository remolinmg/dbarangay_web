import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationComponent = () => {

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


  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const handleOptionSelect = (e) => {
    const selectedValue = e.target.value;
    setShowInputBoxes(selectedValue === "employed");
  };


  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [middleName, setMiddleName] = useState('');
  const [middleNameValid, setMiddleNameValid] = useState(true);
  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(true);
  const [suffix, setSuffix] = useState('');
  const [suffixValid, setSuffixValid] = useState(true);
  const [houseNumber, setHouseNumber] = useState('');
  const [houseNumberValid, setHouseNumberValid] = useState(true);
  const [barangay, setBarangay] = useState('');
  const [barangayValid, setBarangayValid] = useState(true);
  const [district, setDistrict] = useState('');
  const [districtValid, setDistrictValid] = useState(true);
  const [cityMunicipality, setCityMunicipality] = useState('');
  const [cityMunicipalityValid, setCityMunicipalityValid] = useState(true);
  const [province, setProvince] = useState('');
  const [provinceValid, setProvinceValid] = useState(true);
  const [region, setRegion] = useState('');
  const [regionValid, setRegionValid] = useState(true);
  const [religion, setReligion] = useState('');
  const [religionValid, setReligionValid] = useState(true);
  const [civilStatus, setCivilStatus] = useState('');
  const [civilStatusValid, setCivilStatusValid] = useState(true);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [employmentStatusValid, setEmploymentStatusValid] = useState(true);
  const [highestEducation, setHighestEducation] = useState('');
  const [highestEducationValid, setHighestEducationValid] = useState(true);
  const [nationality, setNationality] = useState('');
  const [nationalityValid, setNationalityValid] = useState(true);
  const [gender, setGender] = useState('');
  const [genderValid, setGenderValid] = useState(true);
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState(true);
  const [householdMember, setHouseholdMember] = useState('');
  const [householdMemberValid, setHouseholdMemberValid] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthValid, setDateOfBirthValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePictureValid, setProfilePictureValid] = useState(true);
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [placeOfBirthValid, setPlaceOfBirthValid] = useState(true); // Track place of birth validation
  const [age, setAge] = useState('');
  const [ageValid, setAgeValid] = useState(true); // Track age validation
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true); // Track password confirmation validation


  const navigate = useNavigate();
  // Function to handle changes in the "First Name" field
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameValid(value.trim() !== '');
  };

  // Function to handle changes in the "Middle Name" field
  const handleMiddleNameChange = (e) => {
    const value = e.target.value;
    setMiddleName(value);
    setMiddleNameValid(value.trim() !== '');
  };

  // Function to handle changes in the "Last Name" field
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameValid(value.trim() !== '');
  };

  // Function to handle changes in the "Suffix" field
  const handleSuffixChange = (e) => {
    const value = e.target.value;
    setSuffix(value);
    setSuffixValid(value.trim() !== '');
  };

  // Function to handle changes in the "House Number" field
  const handleHouseNumberChange = (e) => {
    const value = e.target.value;
    setHouseNumber(value);
    setHouseNumberValid(value.trim() !== '');
  };

  // Function to handle changes in the "Barangay" field
  const handleBarangayChange = (e) => {
    const value = e.target.value;
    setBarangay(value);
    setBarangayValid(value.trim() !== '');
  };

  // Function to handle changes in the "District" field
  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setDistrictValid(value.trim() !== '');
  };

  // Function to handle changes in the "City/Municipality" field
  const handleCityMunicipalityChange = (e) => {
    const value = e.target.value;
    setCityMunicipality(value);
    setCityMunicipalityValid(value.trim() !== '');
  };

  // Function to handle changes in the "Province" field
  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value);
    setProvinceValid(value.trim() !== '');
  };

  // Function to handle changes in the "Region" field
  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value);
    setRegionValid(value.trim() !== '');
  };

  // Function to handle changes in the "Religion" field
  const handleReligionChange = (e) => {
    const value = e.target.value;
    setReligion(value);
    setReligionValid(value.trim() !== '');
  };

  // Function to handle changes in the "Civil Status" field
  const handleCivilStatusChange = (e) => {
    const value = e.target.value;
    setCivilStatus(value);
    setCivilStatusValid(value.trim() !== '');
  };

  // Function to handle changes in the "Employment Status" field
  const handleEmploymentStatusChange = (e) => {
    const value = e.target.value;
    setEmploymentStatus(value);
    setEmploymentStatusValid(value.trim() !== '');
  };

  // Function to handle changes in the "Highest Education" field
  const handleHighestEducationChange = (e) => {
    const value = e.target.value;
    setHighestEducation(value);
    setHighestEducationValid(value.trim() !== '');
  };

  // Function to handle changes in the "Nationality" field
  const handleNationalityChange = (e) => {
    const value = e.target.value;
    setNationality(value);
    setNationalityValid(value.trim() !== '');
  };
  // Function to handle changes in the "Gender" field
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderValid(value.trim() !== '');
  };

  // Function to handle changes in the "Address" field
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressValid(value.trim() !== '');
  };

  // Function to handle changes in the "Household Member" field
  const handleHouseholdMemberChange = (e) => {
    const value = e.target.value;
    setHouseholdMember(value);
    setHouseholdMemberValid(value.trim() !== '');
  };

  // Function to handle changes in the "Date of Birth" field
  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
    setDateOfBirthValid(value.trim() !== '');
  };

  // Function to handle changes in the "Phone Number" field
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneNumberValid(value.trim() !== '');
  };

  // Function to handle changes in the "Email" field
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(value.trim() !== '');
  };

  // Function to handle changes in the "Password" field
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.trim() !== '');
  };

  // Function to handle changes in the "Profile Picture" field
  const handleProfilePictureChange = (e) => {
    const value = e.target.value;
    setProfilePicture(value);
    setProfilePictureValid(value.trim() !== '');
  };
    // Function to handle changes in the "Place of Birth" field
    const handlePlaceOfBirthChange = (e) => {
      const value = e.target.value;
      setPlaceOfBirth(value);
      setPlaceOfBirthValid(value.trim() !== '');
    };
  
    // Function to handle changes in the "Age" field
    const handleAgeChange = (e) => {
      const value = e.target.value;
      setAge(value);
      setAgeValid(value.trim() !== '');
    };

  // Function to handle form submission
  const handleSubmit = (e) => {
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

    // Validate the suffix
    if (suffix.trim() === '') {
      setSuffixValid(false);
      return;
    }

    // Validate the house number
    if (houseNumber.trim() === '') {
      setHouseNumberValid(false);
      return;
    }

    // Validate the barangay
    if (barangay.trim() === '') {
      setBarangayValid(false);
      return;
    }

    // Validate the district
    if (district.trim() === '') {
      setDistrictValid(false);
      return;
    }

    // Validate the city/municipality
    if (cityMunicipality.trim() === '') {
      setCityMunicipalityValid(false);
      return;
    }

    // Validate the province
    if (province.trim() === '') {
      setProvinceValid(false);
      return;
    }

    // Validate the region
    if (region.trim() === '') {
      setRegionValid(false);
      return;
    }

    // Validate the religion
    if (religion.trim() === '') {
      setReligionValid(false);
      return;
    }

    // Validate the civil status
    if (civilStatus.trim() === '') {
      setCivilStatusValid(false);
      return;
    }

    // Validate the employment status
    if (employmentStatus.trim() === '') {
      setEmploymentStatusValid(false);
      return;
    }

    // Validate the highest education
    if (highestEducation.trim() === '') {
      setHighestEducationValid(false);
      return;
    }

    // Validate the nationality
    if (nationality.trim() === '') {
      setNationalityValid(false);
      return;
    }

    // Validate the address
    if (address.trim() === '') {
      setAddressValid(false);
      return;
    }

    // Validate the household member
    if (householdMember.trim() === '') {
      setHouseholdMemberValid(false);
      return;
    }

    // Validate the date of birth
    if (dateOfBirth.trim() === '') {
      setDateOfBirthValid(false);
      return;
    }

    // Validate the phone number
    if (phoneNumber.trim() === '') {
      setPhoneNumberValid(false);
      return;
    }

    // Validate the email
    if (email.trim() === '') {
      setEmailValid(false);
      return;
    }

    // Validate the password
    if (password.trim() === '') {
      setPasswordValid(false);
      return;
    }

    // Validate the profile picture (you may have custom validation logic for this)
    if (profilePicture.trim() === '') {
      setProfilePictureValid(false);
      return;
    }

    // If all fields are valid, you can proceed with form submission
    // Your submission logic goes here

    console.log('Form submitted successfully!');
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
                      {!firstNameValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> First name is required.
                        </div>
                      )}
                    </div>

                    {/* MIDDLE INITIAL */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="middle-name">Middle Initial</label>
                      <input
                        type="text" className="input-field"
                        id="middle-name"
                        value={middleName}
                        onChange={handleMiddleNameChange}
                        required
                      />
                      {!middleNameValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Middle name is required.
                        </div>
                      )}
                    </div>

                    {/* LAST NAME */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="last-name">Last Name</label>
                      <input
                        type="text" className="input-field"
                        id="last-name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                      />
                      {!lastNameValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Last name is required.
                        </div>
                      )}
                    </div>

                    {/* SUFFIX */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="suffix">Suffix</label>
                      <input
                        type="text" className="input-field"
                        id="suffix"
                        value={suffix}
                        onChange={handleSuffixChange}
                        required
                      />
                      {!suffixValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Suffix is required.
                        </div>
                      )}
                    </div>

                    {/* House Number */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="houseNumber">House No. / Street</label>
                      <input
                        type="text" className="input-field"
                        id="houseNumber"
                        value={houseNumber}
                        onChange={handleHouseNumberChange}
                        required
                      />
                      {!houseNumberValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> House number is required.
                        </div>
                      )}
                    </div>

                    {/* Barangay */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="barangay">Barangay</label>
                      <input
                        type="text" className="input-field"
                        id="barangay"
                        value={barangay}
                        onChange={handleBarangayChange}
                        required
                      />
                      {!barangayValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Barangay is required.
                        </div>
                      )}
                    </div>

                    {/* District */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="district">District</label>
                      <input
                        type="text" className="input-field"
                        id="district"
                        value={district}
                        onChange={handleDistrictChange}
                        required
                      />
                      {!districtValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> District is required.
                        </div>
                      )}
                    </div>

                    {/* City/Municipality */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="cityMunicipality">City/Municipality</label>
                      <input
                        type="text" className="input-field"
                        id="cityMunicipality"
                        value={cityMunicipality}
                        onChange={handleCityMunicipalityChange}
                        required
                      />
                      {!cityMunicipalityValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> City/Municipality is required.
                        </div>
                      )}
                    </div>

                    {/* Province */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="province">Province</label>
                      <input
                        type="text" className="input-field"
                        id="province"
                        value={province}
                        onChange={handleProvinceChange}
                        required
                      />
                      {!provinceValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Province is required.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECOND COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row2 p-3">
                    {/* Region */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="region">Region</label>
                      <input
                        type="text" className="input-field"
                        id="region"
                        value={region}
                        onChange={handleRegionChange}
                        required
                      />
                      {!regionValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Region is required.
                        </div>
                      )}
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="email">Email Address</label>
                      <input
                        type="email" className="input-field"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      {!emailValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Invalid email address.
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel" className="input-field"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                      />
                      {!phoneNumberValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Invalid phone number.
                        </div>
                      )}
                    </div>

                    {/* Nationality */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="nationality">Nationality</label>
                      <input
                        type="text" className="input-field"
                        id="nationality"
                        value={nationality}
                        onChange={handleNationalityChange}
                        required
                      />
                      {!nationalityValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Nationality is required.
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        onChange={handleGenderChange}
                        className="option"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                        value={gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="secret">Secret</option>
                      </select>
                      {!genderValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Gender is required.
                        </div>
                      )}
                    </div>

                    {/* Civil Status */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="civilStatus">Civil Status</label>
                      <select
                        id="civilStatus"
                        value={civilStatus}
                        onChange={handleCivilStatusChange}
                        className="option"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Civil Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="separated">Separated</option>
                      </select>
                      {!civilStatusValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Civil Status is required.
                        </div>
                      )}
                    </div>

                    {/* Employment Status */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="employmentStatus">Employment Status</label>
                      <select
                        id="employmentStatus"
                        onChange={handleEmploymentStatusChange}
                        className="option2"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                        value={employmentStatus}
                      >
                        <option value="">Select Employment Status</option>
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                      {!employmentStatusValid && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-triangle"></i> Employment Status is required.
                        </div>
                      )}
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
                      <label className="label" htmlFor="homeOwnership">Home Ownership</label>
                      <select
                        id="homeOwnership"
                        className="option"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Ownership</option>
                        <option value="owner">Owner</option>
                        <option value="renting">Renting</option>
                      </select>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date" className="input-field"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                      />
                    </div>

                    {/* PLACE OF BIRTH */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="placeOfBirth">Place of Birth</label>
                      <input
                        type="text" className="input-field"
                        id="placeOfBirth"
                        value={placeOfBirth}
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        required
                      />
                    </div>

                    {/* Age */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="age">Age</label>
                      <input
                        type="text" className="input-field"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>

                    {/* Educational Attainment */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="educationalAttainment">Educational Attainment</label>
                      <select
                        id="educationalAttainment"
                        value={highestEducation}
                        onChange={handleHighestEducationChange}
                        className="option2"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Highest Educational Attainment</option>
                        <option value="undergraduate">Undergraduate (Bachelor's Degree)</option>
                        <option value="postgraduate">Postgraduate (Master's Degree)</option>
                        <option value="doctoral">Doctoral (PhD)</option>
                      </select>
                    </div>

                    {/* Residence Class */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="residenceClass">Residence Class</label>
                      <select
                        id="residenceClass"
                        className="option2"
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Residence Class</option>
                        <option value="personWithDisability">Person with Disability (PWD)</option>
                        <option value="soloParent">Solo Parent</option>
                        <option value="outOfSchoolYouth">Out of School Youth</option>
                      </select>
                    </div>

                    {/* Picture */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="profilePicture">Profile Picture</label>
                      <input
                        type="file" className="input-field ps-2 pe-2"
                        id="profilePicture"
                        accept=".jpeg"
                        onChange={(e) => setProfilePicture(e.target.value)}
                        required
                      />
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="password">Password</label>
                      <input
                        type="password" className="input-field"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password" className="input-field"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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