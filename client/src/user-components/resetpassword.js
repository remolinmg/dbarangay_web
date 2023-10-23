import React, { useState, createContext } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';


export const RecoveryContext = createContext()

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);



  // Validation
  if (password.trim() === '') {
    setPasswordValid(false);
    return;
  }
  if (password !== confirmPassword) {
    setConfirmPasswordValid(false);
    return;
  }

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
  // backend

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate the first name
  //   if (firstName.trim() === '') {
  //     setFirstNameValid(false);
  //     return;
  //   }

  //   // Validate the middle name
  //   if (middleName.trim() === '') {
  //     setMiddleNameValid(false);
  //     return;
  //   }

  //   // Validate the last name
  //   if (lastName.trim() === '') {
  //     setLastNameValid(false);
  //     return;
  //   }

  //   // Validate the House No. / Street
  //   if (houseNumber.trim() === '') {
  //     setHouseNumberValid(false);
  //     return;
  //   }

  //   // Validate Barangay
  //   if (barangay.trim() === '') {
  //     setBarangayValid(false);
  //     return;
  //   }

  //   // Validate District
  //   if (district.trim() === '') {
  //     setDistrictValid(false);
  //     return;
  //   }

  //   // Validate City/Municipality
  //   if (cityMunicipality.trim() === '') {
  //     setCityMunicipalityValid(false);
  //     return;
  //   }

  //   // Validate Province
  //   if (province.trim() === '') {
  //     setProvinceValid(false);
  //     return;
  //   }

  //   if (region.trim() === '') {
  //     setRegionValid(false);
  //     return;
  //   }
  //   if (email.trim() === '') {
  //     setEmailValid(false);
  //     return;
  //   }

  //   if (phoneNumber.trim() === '') {
  //     setPhoneNumberValid(false);
  //     return;
  //   }
  //   if (nationality.trim() === '') {
  //     setNationalityValid(false);
  //     return;
  //   }
  //   if (sex.trim() === '') {
  //     setSexValid(false);
  //     return;
  //   }
  //   if (civilStatus.trim() === '') {
  //     setCivilStatusValid(false);
  //     return;
  //   }
  //   if (employmentStatus.trim() === '') {
  //     setEmploymentStatusValid(false);
  //     return;
  //   }

  //   if (homeOwnership.trim() === '') {
  //     setHomeOwnershipValid(false);
  //     return;
  //   }
  //   if (dateOfBirth.trim() === '') {
  //     setDateOfBirthValid(false);
  //     return;
  //   }

  //   if (birthPlace.trim() === '') {
  //     setBirthPlaceValid(false);
  //     return;
  //   }
  //   if (age.trim() === '') {
  //     setAgeValid(false);
  //     return;
  //   }
  //   if (highestEducation.trim() === '') {
  //     setHighestEducationValid(false);
  //     return;
  //   }
  //   if (voterRegistration.trim() === '') {
  //     setVoterRegistrationValid(false);
  //     return;
  //   }
  //   if (password.trim() === '') {
  //     setPasswordValid(false);
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     setConfirmPasswordValid(false);
  //     return;
  //   }

  //   try {

  //     const response = await axios.put(
  //       `http://localhost:8000/update/businessclearance/${selectedRowData}`,
  //       updatedData
  //     );
  //     console.log(response.data);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }


  // };


  return (
      <div className="container-fluid forgotpass-background-image">
        <div className="forgotpass-login-container">
          <div className="forgotpass-login-box">
            <h2 className="text-center pb-3 pt-3">Reset Password</h2>

            <h5>{email}</h5>

            <div className={`form-group d-flex flex-column ${!passwordValid ? 'has-error' : ''}`}>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className={`input-field form-control ${!passwordValid ? 'is-invalid' : ''}`}
                id="password"
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className={`form-group d-flex flex-column ${!confirmPasswordValid ? 'has-error' : ''}`}>
              <label className="label" htmlFor="cpassword">
                Confirm Password
              </label>
              <input
                type="password"
                className={`input-field form-control ${!confirmPasswordValid ? 'is-invalid' : ''}`}
                id="cpassword"
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" 
              // onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResetPassword;
