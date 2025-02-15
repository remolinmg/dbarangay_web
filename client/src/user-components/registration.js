import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';

const RegistrationComponent = () => {

  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const handleOptionSelect = (e) => {
    const selectedValue = e.target.value;
    setShowInputBoxes(selectedValue === "employed");
  };

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
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
  const [sex, setSex] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [homeOwnership, setHomeOwnership] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [age, setAge] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [residenceClass, setresidenceClass] = useState('');
  const [file, setFile] = useState();
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
  const [sexValid, setSexValid] = useState(true);
  const [employmentStatusValid, setEmploymentStatusValid] = useState(true);
  const [positionValid, setPositionValid] = useState(true);
  const [companyNameValid, setCompanyNameValid] = useState(true);

  const [homeOwnershipValid, setHomeOwnershipValid] = useState(true);
  const [dateOfBirthValid, setDateOfBirthValid] = useState(true);
  const [birthPlaceValid, setBirthPlaceValid] = useState(true);
  const [highestEducationValid, setHighestEducationValid] = useState(true);
  const [voterRegistrationValid, setVoterRegistrationValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const navigate = useNavigate();

  const register = () => {


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
    if (sex.trim() === '') {
      setSexValid(false);
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
    if (highestEducation.trim() === '') {
      setHighestEducationValid(false);
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
    const formData = new FormData();
    formData.append('firstName', firstName)
    formData.append('middleName', middleName)
    formData.append('lastName', lastName)
    formData.append('suffix', suffix)
    formData.append('houseNumber', houseNumber)
    formData.append('barangay', barangay)
    formData.append('district', district)
    formData.append('cityMunicipality', cityMunicipality)
    formData.append('province', province)
    formData.append('region', region)
    formData.append('email', email)
    formData.append('phoneNumber', phoneNumber)
    formData.append('nationality', nationality)
    formData.append('sex', sex)
    formData.append('civilStatus', civilStatus)
    formData.append('employmentStatus', employmentStatus)
    formData.append('homeOwnership', homeOwnership)
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('birthPlace', birthPlace)
    formData.append('age', age)
    formData.append('highestEducation', highestEducation)
    formData.append('residentClass', residenceClass)
    formData.append('votersRegistration', voterRegistration)
    formData.append('password', password)
    formData.append('companyName', companyName)
    formData.append('position', position)
    formData.append('file', file)
    axios.post("https://dbarangay.onrender.com/signup", formData)
      .then(res => {
        if (res.data === 'Error saving data to MongoDB and Cloudinary') {
          alert("User Already Exist!");
        } else if (res.data === 'File and text data saved to MongoDB and Cloudinary') {
          // After successful upload to MongoDB, reset the form
          alert("Registered Successfully");
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  };


  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value.charAt(0).toUpperCase() + value.slice(1));
    setFirstNameValid(value.trim() !== '');
  };

  const handleMiddleNameChange = (e) => {
    const value = e.target.value;
    setMiddleName(value.charAt(0).toUpperCase() + value.slice(1));
    setMiddleNameValid(value.trim() !== '');
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value.charAt(0).toUpperCase() + value.slice(1));
    setLastNameValid(value.trim() !== '');
  };

  const handleHouseNumberChange = (e) => {
    const value = e.target.value;
    setHouseNumber(value.charAt(0).toUpperCase() + value.slice(1));
    setHouseNumberValid(value.trim() !== '');
  };

  const handleBarangayChange = (e) => {
    const value = e.target.value;
    setBarangay(value.charAt(0).toUpperCase() + value.slice(1));
    setBarangayValid(value.trim() !== '');
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value.charAt(0).toUpperCase() + value.slice(1));
    setDistrictValid(value.trim() !== '');
  };

  const handleCityMunicipalityChange = (e) => {
    const value = e.target.value;
    setCityMunicipality(value.charAt(0).toUpperCase() + value.slice(1));
    setCityMunicipalityValid(value.trim() !== '');
  };

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvince(value.charAt(0).toUpperCase() + value.slice(1));
    setProvinceValid(value.trim() !== '');
  };



  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(value.charAt(0).toUpperCase() + value.slice(1));
    setRegionValid(value.trim() !== '');
  };
  const handleEmailChange = (e) => {
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const value = e.target.value;

    if (emailRegExp.test(value)) {
      setEmail(value);
      // Clear the email error if it was previously marked as invalid
      setEmailValid(true);
    } else {
      // Invalid email input
      setEmailValid(false);
    }
  };
  const handlePhoneNumberChange = (e) => {
    const phoneRegExp = /^(09\d{9}|[2-9]\d{9})$/; // Allows only digits (numbers)
    const value = e.target.value;
    if (phoneRegExp.test(value)) {
      setPhoneNumber(value);
      // Clear the phone error if it was previously marked as invalid
      setPhoneNumberValid(true);
    } else {
      // Invalid phone number input
      setPhoneNumberValid(false);
    }
  };
  const handleNationalityChange = (e) => {
    const value = e.target.value;
    setNationality(value.charAt(0).toUpperCase() + value.slice(1));
    setNationalityValid(value.trim() !== '');
  };
  const handleSexChange = (e) => {
    const value = e.target.value;
    setSex(value.charAt(0).toUpperCase() + value.slice(1));
    setSexValid(value.trim() !== '');
  };
  const handleCivilStatusChange = (e) => {
    const value = e.target.value;
    setCivilStatus(value.charAt(0).toUpperCase() + value.slice(1));
    setCivilStatusValid(value.trim() !== '');
  };

  const isCompanyNameValid = (value) => {
    return value.trim() !== '';
  };

  // Validation function for Position (You can customize the validation logic)
  const isPositionValid = (value) => {
    return value.trim() !== '';
  };



  // Change handler for Company Name
  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    setCompanyName(value.charAt(0).toUpperCase() + value.slice(1));
    setCompanyNameValid(isCompanyNameValid(value));
  };

  // Change handler for Position
  const handlePositionChange = (e) => {
    const value = e.target.value;
    setPosition(value.charAt(0).toUpperCase() + value.slice(1));
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
    if (value !== "Unemployed" || value !== "Student") {
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
    setHomeOwnership(value.charAt(0).toUpperCase() + value.slice(1));
    setHomeOwnershipValid(value.trim() !== '');
  };
  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    const currentDate = new Date();
    const birthDate = new Date(value);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 12); // 12 years ago from the current date

    // Calculate age
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    if (age <= 12) {
        alert('The user must be 12 years old or above');
        e.target.value = '';
        setAge(null); // or setAge(0) depending on your needs
        setDateOfBirthValid(false);
    } else {
        setDateOfBirthValid(value.trim() !== '');
        setDateOfBirth(value);
        setAge(age);
    }
};

  const handleBirthPlaceChange = (e) => {
    const value = e.target.value;
    setBirthPlace(value.charAt(0).toUpperCase() + value.slice(1));
    setBirthPlaceValid(value.trim() !== '');
  };
  const handleHighestEducationChange = (e) => {
    const value = e.target.value;
    setHighestEducation(value.charAt(0).toUpperCase() + value.slice(1));
    setHighestEducationValid(value.trim() !== '');
  };
  const handleVoterRegistrationChange = (e) => {
    const value = e.target.value;
    setVoterRegistration(value.charAt(0).toUpperCase() + value.slice(1));
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
              <p><b>Note:</b>Put N/A if required information is not applicable. Password must contain a combination of uppercase and lowercase letters, symbols and special characters.</p>

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
                        id="firstName"
                        name="firstName"
                        onChange={handleFirstNameChange}
                        required
                      />
                    </div>

                    {/* MIDDLE NAME */}
                    <div className={`form-group d-flex flex-column ${!middleNameValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="middle-name">Middle Name</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!middleNameValid ? 'is-invalid' : ''}`}
                        id="middleName"
                        name="middleName"
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
                        id="lastName"
                        name="lastName"
                        onChange={handleLastNameChange}
                        required
                      />
                    </div>

                    {/* SUFFIX */}
                    <div className="form-group d-flex flex-column">
                      <label className="label" htmlFor="last-name">Suffix</label>
                      <input
                        type="text" className="input-field"
                        id="suffix"
                        name="suffix"
                        onChange={(e) => setSuffix(e.target.value)}
                      />
                    </div>

                    {/* HOUSE NO. / STREET */}
                    <div className={`form-group d-flex flex-column ${!houseNumberValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="house-no-street">House No. / Street</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!houseNumberValid ? 'is-invalid' : ''}`}
                        id="houseNumber"
                        name="houseNumber"
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
                        name="barangay"
                        onChange={handleBarangayChange}
                        required
                      />
                    </div>

                    {/* REGION AND DISTRICT */}
                    <div className="row">
                      <div className={`form-group d-flex flex-column ${!regionValid ? 'has-error' : ''} col-6`}>
                        <label className="label" htmlFor="region">Region</label>
                        <input
                          type="text" className={`input-field form-control ${!regionValid ? 'is-invalid' : ''}`}
                          id="region"
                          name="region"
                          onChange={handleRegionChange}
                          required
                        />
                      </div>
                      <div className={`form-group d-flex flex-column ${!districtValid ? 'has-error' : ''} col-6`}>
                        <label className="label" htmlFor="district">District</label>
                        <input
                          type="text"
                          className={`input-field form-control ${!districtValid ? 'is-invalid' : ''}`}
                          id="district"
                          name="district"
                          onChange={handleDistrictChange}
                          required
                        />
                      </div>
                    </div>

                    {/* CITY/MUNICIPALITY */}
                    <div className={`form-group d-flex flex-column ${!cityMunicipalityValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="city-municipality">City/Municipality</label>
                      <input
                        type="text"
                        className={`input-field form-control ${!cityMunicipalityValid ? 'is-invalid' : ''}`}
                        id="cityMunicipality"
                        name="cityMunicipality"
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
                        name="province"
                        id="province"
                        onChange={handleProvinceChange}
                        required
                      />
                    </div>
                  </div>

                  {/* SECOND COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row2 p-3">

                    {/* EMAIL ADDRESS*/}
                    <div className={`form-group d-flex flex-column ${!emailValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="email">Email Address</label>
                      <input
                        type="email" className={`input-field form-control ${!emailValid ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
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
                        name="phoneNumber"
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
                        name="nationality"
                        onChange={handleNationalityChange}
                        required
                      />
                    </div>

                    {/* Sex */}
                    <div className={`form-group d-flex flex-column ${!sexValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="sex">Sex</label>
                      <select
                        id="sex"
                        name="sex"
                        onChange={handleSexChange}
                        className={`option form-control ${!sexValid ? 'is-invalid' : ''}`}
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* CIVIL STATUS */}
                    <div className={`form-group d-flex flex-column ${!civilStatusValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="civilStatus">Civil Status</label>
                      <select
                        id="civilStatus"
                        name="civilStatus"
                        onChange={handleCivilStatusChange}
                        className={`option form-control ${!civilStatusValid ? 'is-invalid' : ''}`}
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Civil Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>

                    {/* Home Ownership */}
                    <div className={`form-group d-flex flex-column ${!homeOwnershipValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="homeOwnership">Home Ownership</label>
                      <select
                        id="homeOwnership"
                        name="homeOwnership"
                        onChange={handleHomeOwnershipChange}
                        className={`option form-control ${!homeOwnershipValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Ownership</option>
                        <option value="Own">Owner</option>
                        <option value="Rent">Renting</option>
                      </select>
                    </div>

                    {/* EMPLOYMENT STATUS */}
                    <div className={`form-group d-flex flex-column ${!employmentStatusValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="employmentStatus">
                        Employment Status
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        onChange={handleEmploymentStatusChange}
                        className={`input-field form-control ${!employmentStatusValid ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value="">Select Employment Status</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
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
                            name="companyName"
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
                            name="position"
                            onChange={handlePositionChange}
                            required
                          />
                        </div>

                      </>
                    )}
                  </div>

                  {/* THIRD COLUMN REGISTER PAGE */}
                  <div className="col-12 col-md-4 reg-row3 p-3">

                    {/* DATE OF BIRTH */}
                    <div className={`form-group d-flex flex-column ${!dateOfBirthValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date" className={`input-field form-control ${!dateOfBirthValid ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        onChange={handleDateOfBirthChange}
                        required
                      />
                    </div>

                    {/* PLACE OF BIRTH */}
                    <div className={`form-group d-flex flex-column ${!birthPlaceValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="placeofbirth">Place of Birth</label>
                      <input
                        type="text" className={`input-field form-control ${!birthPlaceValid ? 'is-invalid' : ''}`}
                        id="placeOfBirth"
                        name="placeOfBirth"
                        onChange={handleBirthPlaceChange}
                        required
                      />
                    </div>

                    {/* Educational Attainment */}
                    <div className={`form-group d-flex flex-column ${!highestEducationValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="H-Educational-A">Educational Attainment</label>
                      <select
                        id="highestEducation"
                        name="highestEducation"
                        onChange={handleHighestEducationChange}
                        className={`option2 form-control ${!highestEducationValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Highest Educational Attainment</option>
                        <option value="No Formal Education">No Formal Education</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Highschool">High School</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Postgrad">Postgraduate (Master's Degree)</option>
                        <option value="Doctoral">Doctoral (PhD)</option>
                      </select>
                    </div>

                    {/* Residence Class */}
                    <div className={`form-group d-flex flex-column  'has-error' : ''}`}>
                      <label className="label" htmlFor="residentClass"> Residence Class</label>
                      <select
                        id="residentClass"
                        name="residentClass"
                        onChange={(e) => setresidenceClass(e.target.value)}
                        className={`option2 form-control `}
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Residence Class</option>
                        <option value="PWD">Person with Disability (PWD)</option>
                        <option value="Solo Parent">Solo Parent</option>
                        <option value="OUT OF SCHOOL YOUTH">Out of School Youth</option>
                      </select>
                    </div>


                    {/* Voter's Registration */}
                    <div className={`form-group d-flex flex-column ${!voterRegistrationValid ? 'has-error' : ''}`}>
                      <label className="label" htmlFor="votersRegistration">Voter's Registration</label>
                      <select
                        id="votersRegistration"
                        name="votersRegistration"
                        onChange={handleVoterRegistrationChange}
                        className={`option2 form-control ${!voterRegistrationValid ? 'is-invalid' : ''}`}
                        required
                        style={{ fontSize: '14px', marginBottom: '10px' }}
                      >
                        <option value="">Select Voter's Registration</option>
                        <option value="Registered">Registered</option>
                        <option value="Unregistered">Not Register</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="label" htmlFor="voterRegistration">Profile Picture</label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="form-control"
                        required
                      />
                      {/* Cloudinary upload widget */}
                      <CloudinaryContext cloudName="dwevzsrnz">
                      </CloudinaryContext>
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
                        name="password"
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
                        name="cpassword"
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