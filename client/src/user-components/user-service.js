import React, { useState, useEffect } from 'react';
import './assets/css/user-style.css';
import { IoMdFiling } from "react-icons/io";
import { MdConstruction, MdOutlineInstallDesktop, MdOutlineFactCheck, MdOutlineAddBusiness } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import UserNav from './user-navbar';
import Faq from './faq'
import axios from 'axios';
import Footer from "./footer"
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';


function UserService() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', inputValues);
    setInputValues({
      residentsName: '',
      Address: '',
      reasonOfRequest: '',
      issuedDate: '',
    });
    setIsSubmitted(true);
    setShowPopup(false);
  };



  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        handleCheckboxChangeCash();
        setIsGCashChecked(false);
        setIsCOPChecked(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const [residentName, setResidentName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [reasonOfRequest, setReasonOfRequest] = useState('');
  const [natureofBusiness, setNatureofBusiness] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [type, setType] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [reference, setReference] = useState('');

  // gcash reference
  const [isGCashChecked, setIsGCashChecked] = useState(false);
  const [isCOPChecked, setIsCOPChecked] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValues, setInputValues] = useState({
  });
  const handleServiceClick = (service) => {
    setCurrentService(service);
    setShowPopup(true);
  };

  //Success pop up timer-----------------------
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        handleCheckboxChangeCash();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  // Discard --------------------------------
  const handleDiscard = () => {
    // Reset the state for business permit form fields
    setBusinessName('');
    setAddress('');
    setResidentName('');
    setType('');
    setNatureofBusiness('');
    setPickUpDate('');
    setModeOfPayment('');
    setReference('');
    setIsGCashChecked(false);
    setIsCOPChecked(false);

    // Hide the popup
    setShowPopup(false);
  };


  //MODE OF PAYMENT ----------------------------------------

  const handleCheckboxChangeGcash = () => {
    setIsGCashChecked(!isGCashChecked);
    setModeOfPayment('G-Cash');
    setIsCOPChecked(false);
  };
  const handleCheckboxChangeCash = () => {
    setIsCOPChecked(!isCOPChecked);
    setModeOfPayment('Cash On Pick-up');
    setIsGCashChecked(false);
  };

  const renderInputTextboxes = () => {
    if (isGCashChecked) {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="gcashref">GCash Reference No.:</label>
            <input
              type="text"
              id="gcashRefNo"
              name="gcashRef"
              className="form-control"
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>
        </div>
      )
    }
    return (null);
  };

  //barangay certificate connection & validation
  const [validationErrors, setValidationErrors] = useState({});
  async function barangayCertificate(e) {
    e.preventDefault();

    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!residentName) {
      isValid = false;

    }

    if (!address) {
      isValid = false;

    }

    if (!reasonOfRequest) {
      isValid = false;

    }

    if (!pickUpDate) {
      isValid = false;

    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = 'Mode of payment is required.';
    }

    if (modeOfPayment === 'G-Cash' && !reference) {
      isValid = false;

    }

    if (!isValid) {
      setValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }

    // If validation passes, proceed with the API request
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);
        const userId = decoded.id;

        const response = await axios.post("http://localhost:8000/barangaycertificate", {
          residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference
        });

        if (response.data === "exist") {
          alert("You already sent the same request!");
        } else if (response.data === "notexist") {
          setIsSubmitted(true);
          setShowPopup(false);
          setIsGCashChecked(false);
          setIsCOPChecked(false);
        }
      }
    } catch (error) {
      alert("Failed!");
      console.error(error);
    }

  }

  //business clearance connection & validation
  const [businessValidationErrors, setBusinessValidationErrors] = useState({});
  async function businessClearance(e) {
    e.preventDefault();

    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!businessName) {
      isValid = false;

    }

    if (!address) {
      isValid = false;

    }

    if (!residentName) {
      isValid = false;

    }

    if (!type) {
      isValid = false;
      newValidationErrors.type = 'Ownership type is required.';
    }

    if (type === '????') {
      isValid = false;

    }

    if (!reasonOfRequest) {
      isValid = false;

    }

    if (!pickUpDate) {
      isValid = false;

    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = 'Mode of payment is required.';
    }

    if (modeOfPayment === 'G-Cash' && !reference) {
      isValid = false;

    }

    if (!isValid) {
      setBusinessValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }

    // If validation passes, proceed with the API request
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);
        const userId = decoded.id;
        await axios.post("http://localhost:8000/businessclearance", {
          businessName, address, residentName, userId, type, reasonOfRequest, pickUpDate, modeOfPayment, reference
        })
          .then(res => {
            if (res.data === "exist") {
              alert("You already sent the same request!");
            } else if (res.data === "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
              setIsGCashChecked(false);
              setIsCOPChecked(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          });
      }
    } catch (error) {
      alert("Failed!");
      console.error(error);
    }
  }

  //barangayid connection & validation
  const [barangayIdValidationErrors, setBarangayIdValidationErrors] = useState({});
  async function barangayID(e) {
    e.preventDefault();

    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!residentName) {
      isValid = false;
      newValidationErrors.residentName = "Resident's Name is required.";
    }

    if (!address) {
      isValid = false;
      newValidationErrors.address = "Address is required.";
    }

    if (!pickUpDate) {
      isValid = false;
      newValidationErrors.pickUpDate = "Pick-up Date is required.";
    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = "Mode of Payment is required.";
    }

    if (modeOfPayment === "G-Cash" && !reference) {
      isValid = false;
      newValidationErrors.reference = "GCash Reference No. is required.";
    }

    if (!isValid) {
      setBarangayIdValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }

    // If validation passes, proceed with the API request
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);
        const userId = decoded.id;

        await axios.post("http://localhost:8000/barangayid", {
          residentName,
          userId,
          address,
          pickUpDate,
          modeOfPayment,
          reference,
        })
          .then((res) => {
            if (res.data === "exist") {
              alert("You already sent the same request!");
            } else if (res.data === "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch((e) => {
            alert("Failed!");
            console.log(e);
          });
      }
    } catch (error) {
      alert("Failed!");
      console.error(error);
    }
  }

  //installation connection & validation
  const [installationValidationErrors, setInstallationValidationErrors] = useState({});
  async function installation(e) {
    e.preventDefault();

    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!residentName) {
      isValid = false;

    }

    if (!address) {
      isValid = false;

    }

    if (!reasonOfRequest) {
      isValid = false;

    }

    if (!pickUpDate) {
      isValid = false;

    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = 'Mode of payment is required.';
    }

    if (modeOfPayment === 'G-Cash' && !reference) {
      isValid = false;
      newValidationErrors.reference = 'GCash Reference No. is required for G-Cash payment.';
    }

    if (!isValid) {
      setInstallationValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);

        const userId = decoded.id;
        await axios.post("http://localhost:8000/installation", {
          residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference
        })
          .then(res => {
            if (res.data === "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data === "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
              setIsGCashChecked(false);
              setIsCOPChecked(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })

      }
    }
    catch (e) {
      console.log(e);

    }
  }
  //construction connection & validation
  const [constructionValidationErrors, setConstructionValidationErrors] = useState({});
  async function construction(e) {
    e.preventDefault();
    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!residentName) {
      isValid = false;
      newValidationErrors.residentName = "Resident's Name is required.";
    }

    if (!address) {
      isValid = false;
      newValidationErrors.address = "Address is required.";
    }

    if (!reasonOfRequest) {
      isValid = false;
      newValidationErrors.reasonOfRequest = "Reason of Request is required.";
    }

    if (!pickUpDate) {
      isValid = false;
      newValidationErrors.pickUpDate = "Pick-up Date is required.";
    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = "Mode of Payment is required.";
    }

    if (modeOfPayment === "GCash" && !reference) {
      isValid = false;
      newValidationErrors.reference = "GCash Reference No. is required.";
    }

    if (!isValid) {
      setConstructionValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);
        const userId = decoded.id;
        await axios.post("http://localhost:8000/construction", {
          residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference
        })
          .then(res => {
            if (res.data === "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data === "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
              setIsGCashChecked(false);
              setIsCOPChecked(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })

      }
    }
    catch (e) {
      console.log(e);

    }

  }

  //indigency connection & validation
  const [barangayIndigencyValidationErrors, setBarangayIndigencyValidationErrors] = useState({});
  async function barangayIndigency(e) {
    e.preventDefault();
    // Validation logic
    let isValid = true;
    const newValidationErrors = {};

    if (!residentName) {
      isValid = false;
      newValidationErrors.residentName = "Resident's Name is required.";
    }

    if (!address) {
      isValid = false;
      newValidationErrors.address = "Address is required.";
    }

    if (!reasonOfRequest) {
      isValid = false;
      newValidationErrors.reasonOfRequest = "Reason of Request is required.";
    }

    if (!pickUpDate) {
      isValid = false;
      newValidationErrors.pickUpDate = "Pick-up Date is required.";
    }

    if (!modeOfPayment) {
      isValid = false;
      newValidationErrors.modeOfPayment = "Mode of Payment is required.";
    }

    if (modeOfPayment === "GCash" && !reference) {
      isValid = false;
      newValidationErrors.reference = "GCash Reference No. is required.";
    }

    if (!isValid) {
      setBarangayIndigencyValidationErrors(newValidationErrors);
      return; // Prevent form submission.
    }
    try {
      const token = Cookies.get('access_token');
      if (token) {
        const decoded =jwtDecode(token);
        const userId = decoded.id;

        await axios.post("http://localhost:8000/barangayindigency", {
          residentName, userId, address, reasonOfRequest, pickUpDate, modeOfPayment, reference
        })
          .then(res => {
            if (res.data === "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data === "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
              setIsGCashChecked(false);
              setIsCOPChecked(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })

      }
    }
    catch (e) {
      console.log(e);

    }

  }

  return (
    <body>
      <UserNav />
      {/* <div className="blue-box" style={{ background: '#003c7de7', height: '90px' }}></div> */}
      <div className="service container-fluid component__space" id="Services">
        <div className="heading"><h1 className="heading">OFFERED SERVICES </h1> </div>
        <div className="container">
          <div class="row">
            {/* ------------------- BARANGAY CERT --------------------------- */}

            <div className=" col-4 col__3" onClick={() => handleServiceClick('barangayClearance')}>
              <div className="service__box pointer">
                <div className="icon">
                  <MdOutlineFactCheck size={52} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">BARANGAY CERTIFICATE </h1>
                  <p className="p service__text p__color">
                    A document to certify the residency and good conduct of an individual within the barangay.</p>
                </div>
              </div>
            </div>

            {/* ------------------- BUSINESS CLEARANCE --------------------------- */}

            <div className="service-right col-4 col__3" onClick={() => handleServiceClick('businessPermit')}>
              <div className="service__box pointer">
                <div className="icon">
                  <MdOutlineAddBusiness size={52} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">BUSINESS CLEARANCE</h1>
                  <p className="p service__text p__color">
                    An official document or license that grants permission to individuals or organizations to conduct business within a jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------- BARANGAY ID --------------------------- */}
          <div class="row">
            <div className="col-4 col__3" onClick={() => handleServiceClick('barangayID')}>
              <div className="service__box pointer">
                <div className="icon">
                  <HiOutlineIdentification size={52} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">BARANGAY ID</h1>
                  <p className="p service__text p__color">
                    A government-issued identification card that serves as proof of residence and provides access to local barangay services.</p>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------- 2nd ROW ----------------------------------------------------  */}

            {/* ---------------------- INSTALLATION PERMIT  --------------------------- */}

            <div className="service-right col-4 col__3" onClick={() => handleServiceClick('installation')}>
              <div className="service__box pointer">
                <div className="icon">
                  <MdOutlineInstallDesktop size={32} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">INSTALLATION PERMIT</h1>
                  <p className="p service__text p__color">
                    A document required for obtaining legal permission to install or make changes to certain structures, equipment, or facilities within the jurisdiction of a Barangay.</p>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------- CONSTRUCTION PERMIT  --------------------------- */}
          <div class="row">
            <div className="col-4 col__3" onClick={() => handleServiceClick('constructionPermit')}>
              <div className="service__box pointer">
                <div className="icon">
                  <MdConstruction size={32} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">CONSTRUCTION PERMIT</h1>
                  <p className="p service__text p__color">
                    A government-issued authorization allowing individuals or organizations to legally undertake construction activities within the Barangay.</p></div>                            </div>
            </div>

            {/* ----------------------- BRGY INDIGENCY FORM ---------------------------- */}

            <div className="service-right col-4 col__3" onClick={() => handleServiceClick('barangayIndigency')}>
              <div className="service__box pointer">
                <div className="icon">
                  <MdOutlineFactCheck size={52} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">BARANGAY INDIGENCY </h1>
                  <p className="p service__text p__color">
                    A document issued to less fortunate resident who desires to avail assistance such as Scholarship, Medical Services, and the likes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------------------------------- barangayClearance forms  --------------------------------------------------------- */}
        {showPopup && currentService === 'barangayClearance' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={barangayCertificate}>
                <div className="certificate">
                  <h2 className="certificate-title">Certificate Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Residents Name:</label>
                      <input
                        type="text"
                        id="residentName"
                        name="residentName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className="form-control"
                        required // Use the required attribute
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        required // Use the required attribute
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        onChange={(e) => setReasonOfRequest(e.target.value)}
                        className="form-control"
                        required // Use the required attribute
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="pickUpDate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="pickUpDate"
                        name="pickUpDate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className="form-control"
                        required // Use the required attribute
                      />
                    </div>
                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{validationErrors.modeOfPayment || ' '}</div>
                    </div>
                    {renderInputTextboxes()}

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

        {/* BUSINESS PERMIT */}
        {showPopup && currentService === 'businessPermit' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={businessClearance}>
                <div className="certificate">
                  <h2 className="certificate-title">Business Clearance Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="businessPermitField1">Business Name:</label>
                      <input
                        type="text"
                        id="businessPermitField1"
                        name="businessPermitField1"
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">{businessValidationErrors.businessName || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Address"> Address:</label>
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">{businessValidationErrors.address || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="residentsName">Owner's Name:</label>
                      <input
                        type="text"
                        id="residentName"
                        name="residentName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">{businessValidationErrors.residentName || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="ownertype">Ownership type:</label>
                      <select
                        id="ownertype"
                        className="form-control"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        style={{ fontSize: '20px', marginBottom: '10px' }}
                        required
                      >
                        <option value="????" ></option>
                        <option value="sole">Sole Proprietorship</option>
                        <option value="partnership">Partnership/Corporation</option>
                      </select>
                      <div className="error-message">{businessValidationErrors.type || ' '}</div>
                    </div>


                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Nature of Business</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        onChange={(e) => setReasonOfRequest(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">{businessValidationErrors.reasonOfRequest || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="issuedDate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="issuedDate"
                        name="issuedDate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">{businessValidationErrors.pickUpDate || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{businessValidationErrors.modeOfPayment || ' '}</div>
                    </div>
                    {renderInputTextboxes()}

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

        {/* BARANGAY ID */}
        {showPopup && currentService === 'barangayID' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={barangayID}>
                <div className="certificate">
                  <h2 className="barangay-id-title">Barangay ID Request Form</h2>
                  <div className="barangay-id-content certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Resident's Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">
                        {barangayIdValidationErrors.residentName || ' '}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">
                        {barangayIdValidationErrors.address || ' '}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="issueddate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="issueddate"
                        name="issueddate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className="form-control"
                        required
                      />
                      <div className="error-message">
                        {barangayIdValidationErrors.pickUpDate || ' '}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{barangayIdValidationErrors.modeOfPayment || ' '}</div>
                    </div>
                    {renderInputTextboxes()}

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

        {/* INSTALLATION PERMIT */}
        {showPopup && currentService === 'installation' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={installation}>
                <div className="certificate">
                  <h2 className="installation-permit-title">Installation Permit Form</h2>
                  <div className="installation-permit-content certificate-content">
                    <div className="form-group">
                      <label htmlFor="applicantName">Resident's Name:</label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className={`form-control ${installationValidationErrors.residentName ? 'is-invalid' : ''}`}
                        required
                      />
                      {installationValidationErrors.residentName && (
                        <div className="invalid-feedback">
                          {installationValidationErrors.residentName}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationAddress">Address:</label>
                      <input
                        type="text"
                        id="installationAddress"
                        name="installationAddress"
                        onChange={(e) => setAddress(e.target.value)}
                        className={`form-control ${installationValidationErrors.address ? 'is-invalid' : ''}`}
                        required
                      />
                      {installationValidationErrors.address && (
                        <div className="invalid-feedback">
                          {installationValidationErrors.address}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationType">Reason of Request:</label>
                      <input
                        type="text"
                        id="installationType"
                        name="installationType"
                        onChange={(e) => setReasonOfRequest(e.target.value)}
                        className={`form-control ${installationValidationErrors.reasonOfRequest ? 'is-invalid' : ''}`}
                        required
                      />
                      {installationValidationErrors.reasonOfRequest && (
                        <div className="invalid-feedback">
                          {installationValidationErrors.reasonOfRequest}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationDate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="pickUpDate"
                        name="pickUpDate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className={`form-control ${installationValidationErrors.pickUpDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {installationValidationErrors.pickUpDate && (
                        <div className="invalid-feedback">
                          {installationValidationErrors.pickUpDate}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{installationValidationErrors.modeOfPayment || ' '}</div>
                    </div>
                    {renderInputTextboxes()}
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

        {/* CONSTRUCTION PERMIT */}
        {showPopup && currentService === 'constructionPermit' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={construction}>
                <div className="certificate">
                  <h2 className="certificate-title">Construction Permit Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Residents Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className={`form-control ${constructionValidationErrors.residentName ? 'is-invalid' : ''}`}
                        required
                      />
                      {constructionValidationErrors.residentName && (
                        <div className="invalid-feedback">
                          {constructionValidationErrors.residentName}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="Address">Address</label>
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className={`form-control ${constructionValidationErrors.address ? 'is-invalid' : ''}`}
                        required
                      />
                      {constructionValidationErrors.address && (
                        <div className="invalid-feedback">
                          {constructionValidationErrors.address}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        onChange={(e) => setReasonOfRequest(e.target.value)}
                        className={`form-control ${constructionValidationErrors.reasonOfRequest ? 'is-invalid' : ''}`}
                        required
                      />
                      {constructionValidationErrors.reasonOfRequest && (
                        <div className="invalid-feedback">
                          {constructionValidationErrors.reasonOfRequest}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="issuedDate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="issuedDate"
                        name="issuedDate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className={`form-control ${constructionValidationErrors.pickUpDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {constructionValidationErrors.pickUpDate && (
                        <div className="invalid-feedback">
                          {constructionValidationErrors.pickUpDate}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{constructionValidationErrors.modeOfPayment || ' '}</div>
                    </div>
                    {renderInputTextboxes()}
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

        {/* Brgy Indigency Form */}
        {showPopup && currentService === 'barangayIndigency' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={barangayIndigency}>
                <div className="certificate">
                  <h2 className="certificate-title">Indigency Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentName">Resident's Name:</label>
                      <input
                        type="text"
                        id="residentName"
                        name="residentName"
                        onChange={(e) => setResidentName(e.target.value)}
                        className={`form-control ${barangayIndigencyValidationErrors.residentName ? 'is-invalid' : ''}`}
                        required
                      />
                      <div className="error-message">{barangayIndigencyValidationErrors.residentName || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        className={`form-control ${barangayIndigencyValidationErrors.address ? 'is-invalid' : ''}`}
                        required
                      />
                      <div className="error-message">{barangayIndigencyValidationErrors.address || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request:</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        onChange={(e) => setReasonOfRequest(e.target.value)}
                        className={`form-control ${barangayIndigencyValidationErrors.reasonOfRequest ? 'is-invalid' : ''}`}
                        required
                      />
                      <div className="error-message">{barangayIndigencyValidationErrors.reasonOfRequest || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="pickUpDate">Pick-up Date:</label>
                      <input
                        type="date"
                        id="pickUpDate"
                        name="pickUpDate"
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className={`form-control ${barangayIndigencyValidationErrors.pickUpDate ? 'is-invalid' : ''}`}
                        required
                      />
                      <div className="error-message">{barangayIndigencyValidationErrors.pickUpDate || ' '}</div>
                    </div>

                    <div className="form-group">
                      <label>Mode of Payment:</label>
                      <div>
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isCOPChecked}
                          onChange={handleCheckboxChangeCash}
                        />
                        Cash on Pick-up
                      </div>

                      <div className="">
                        <input
                          className="ms-1 me-1"
                          type="checkbox"
                          checked={isGCashChecked}
                          onChange={handleCheckboxChangeGcash}
                        />
                        GCash
                      </div>
                      <div className="error-message">{barangayIndigencyValidationErrors.modeOfPayment || ' '}</div>
                    </div>

                    {renderInputTextboxes()}

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


        {isSubmitted && (
          <div className="success-message">
            <p>You have successfully submitted a request!</p>
          </div>
        )}
      </div>
      <Faq/>
      <Footer />
    </body >


  )
}

export default UserService;
