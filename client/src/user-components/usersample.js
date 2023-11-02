import React, { useState, useEffect } from 'react';

import { IoMdFiling } from "react-icons/io";
import { MdConstruction, MdOutlineInstallDesktop, MdOutlineFactCheck, MdOutlineAddBusiness } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";

import axios from 'axios';



function Usersample() {
    const [currentService, setCurrentService] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [inputValues, setInputValues] = useState({
      residentName: '',
      address: '',
      reasonOfRequest: '',
      issuedDate: '',
    });
  
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const handleServiceClick = (service) => {
      setCurrentService(service);
      setShowPopup(true);
    };
  
  
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
  
    const handleDiscard = () => {
      setInputValues({
        residentsName: '',
        Address: '',
        reasonOfRequest: '',
        issuedDate: '',
      });
      setShowPopup(false);
      handleCheckboxChangeCash();
    };
  
    useEffect(() => {
      if (isSubmitted) {
        const timer = setTimeout(() => {
          setIsSubmitted(false);
          handleCheckboxChangeCash();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [isSubmitted]);
  
    const [residentName, setResidentName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [reasonOfRequest, setReasonOfRequest] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [type, setType] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [reference, setReference] = useState('');
  
    // gcash reference
    const [isGCashChecked, setIsGCashChecked] = useState(false);
    const [isCOPChecked, setIsCOPChecked] = useState(false);
    const [gcashInputValues, setGcashInputValues] = useState([]);
  
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
  
    const handleGcashInputChange = (index, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setGcashInputValues(newInputValues);
    };
  
    const renderInputTextboxes = () => {
      if (isGCashChecked) {
        // return gcashInputValues.map((value, index) => (
        //   <input
        //     key={index}
        //     type="text"
        //     value={value}
        //     onChange={(e) => handleGcashInputChange(index, e.target.value)}
        //     placeholder={`Input ${index + 1}`}
        //   />
        // ));
        return (
          <div>
            <div className="form-group">
              <label htmlFor="gcashref">GCash Reference No.</label>
              <input
                type="text"
                id="gcashRefNo"
                name="gcashRef"
                className="form-control"
                onChange={(e) => setReference(e.target.value)}
                required />
            </div>
          </div>
        )
      }
      return (null);
    };
  
    //certificate connection
    async function barangayCertificate(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/barangaycertificate", {
          residentName, address, reasonOfRequest, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
  
    }
    //business clearance connection
    async function businessClearance(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/businessclearance", {
          businessName, address, residentName, type, reasonOfRequest, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
    }
    //indigency connection
    async function barangayIndigency(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/barangayindigency", {
          residentName, address, reasonOfRequest, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
  
    }
    //barangayid
    async function barangayID(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/barangayid", {
          residentName, address, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
    }
    //installation
    async function installation(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/installation", {
          residentName, address, reasonOfRequest, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
    }
    //construction
    async function construction(e) {
      e.preventDefault();
  
      try {
  
        await axios.post("https://dbarangay.onrender.com/construction", {
          residentName, address, reasonOfRequest, pickUpDate,modeOfPayment,reference
        })
          .then(res => {
            if (res.data == "exist") {
              alert("You already sent the same request!");
            }
            else if (res.data == "notexist") {
              setIsSubmitted(true);
              setShowPopup(false);
            }
          })
          .catch(e => {
            alert("Failed!")
            console.log(e);
          })
  
      }
      catch (e) {
        console.log(e);
  
      }
  
    }
  
    return (
      <body>

        {/* <div className="blue-box" style={{ background: '#003c7de7', height: '90px' }}></div> */}
        <div className="service container-fluid component__space" id="Services">
          <div className="heading"><h1 className="heading">OFFERED SERVICES </h1> </div>
          <div className="container">
            <div className="row">
              {/* ------------------- BARANGAY CLEARANCE --------------------------- */}
              <div className=" col-4 col__3" onClick={() => handleServiceClick('barangayClearance')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <MdOutlineFactCheck size={52} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">BARANGAY CERTIFICATE </h1>
                    <p className="p service__text p__color">
                      A barangay clearance is a document issued by the barangay or local community government in the Philippines to certify the residency and good conduct of an individual within the barangay.</p>
                  </div>
                </div>
              </div>
  
              {/* ------------------- BUSINESS PERMIT --------------------------- */}
              <div className="col-4 col__3" onClick={() => handleServiceClick('businessPermit')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <MdOutlineAddBusiness size={52} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">BUSINESS CLEARANCE</h1>
                    <p className="p service__text p__color">
                      Business Permit is an official document or license issued by the government that grants permission to individuals or organizations to conduct business within a jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
  
              {/* ------------------- BARANGAY ID --------------------------- */}
              <div className="col-4 col__3" onClick={() => handleServiceClick('barangayID')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <HiOutlineIdentification size={52} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">BARANGAY ID</h1>
                    <p className="p service__text p__color">
                      A barangay ID is a government-issued identification card that serves as proof of residence and provides access to local barangay services and benefits within a specific community in the Philippines.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* --------------------------------------------------- 2nd ROW ----------------------------------------------------  */}
            <div className="row">
              {/* ---------------------- INSTALLATION PERMIT  --------------------------- */}
              <div className="col-4 col__3" onClick={() => handleServiceClick('installation')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <MdOutlineInstallDesktop size={32} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">INSTALLATION PERMIT</h1>
                    <p className="p service__text p__color">
                      An installation permit in Barangay is a document required for obtaining legal permission to install or make changes to certain structures, equipment, or facilities within the jurisdiction of a Barangay, ensuring compliance and safety.</p>
                  </div>
                </div>
              </div>
              {/* ---------------------- CONSTRUCTION PERMIT  --------------------------- */}
              <div className="col-4 col__3" onClick={() => handleServiceClick('constructionPermit')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <MdConstruction size={32} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">CONSTRUCTION PERMIT</h1>
                    <p className="p service__text p__color">
                      A Barangay construction permit is a government-issued authorization allowing individuals or organizations to legally undertake construction activities within the Barangay's jurisdictional boundaries.</p></div>                            </div>
              </div>
              {/* ----------------------- BRGY INDIGENCY FORM ---------------------------- */}
              <div className=" col-4 col__3" onClick={() => handleServiceClick('barangayIndigency')}>
                <div className="service__box pointer">
                  <div className="icon">
                    <MdOutlineFactCheck size={52} />
                  </div>
                  <div className="service__meta">
                    <h1 className="service__text">BARANGAY INDIGENCY </h1>
                    <p className="p service__text p__color">
                      The Certificate of Indigency is a document issued to less fortunate resident who desires to avail assistance such as Scholarship, Medical Services, and the likes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------------------------------------------------------- barangayClearance forms  --------------------------------------------------------- */}
          {showPopup && currentService === 'barangayClearance' && (
            <div className="popup-overlay">
              <div className="popup-form">
                <form >
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
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="Address"> Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required /> </div>
  
                      <div className="form-group">
                        <label htmlFor="reasonOfRequest">Reason Of Request</label>
                        <input
                          type="text"
                          id="reasonOfRequest"
                          name="reasonOfRequest"
                          onChange={(e) => setReasonOfRequest(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="pickUpDate">Pick-up Date:</label>
                        <input
                          type="date"
                          id="pickUpDate"
                          name="pickUpDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control" required /></div>
  
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary" onClick={barangayCertificate}>Submit </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
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
                <form>
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
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="Address"> Address</label>
                        <input
                          type="text"
                          id="Address"
                          name="Address"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="residentsName">Owner's Name:</label>
                        <input
                          type="text"
                          id="residentName"
                          name="residentName"
                          onChange={(e) => setResidentName(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="ownertype">Ownership type</label>
                        <select
                          id="ownertype"
                          className="form-control"
                          onChange={(e) => setType(e.target.value)}
                          style={{ fontSize: '20px', marginBottom: '10px' }}
                        >
                         <option value="????" ></option>
                          <option value="sole">Sole Proprietorship</option>
                          <option value="partnership">Partnership/Corporation</option>
                        </select>
                      </div>
  
                      <div className="form-group">
                        <label htmlFor="reasonOfRequest">Nature of Business</label>
                        <input
                          type="text"
                          id="reasonOfRequest"
                          name="reasonOfRequest"
                          onChange={(e) => setReasonOfRequest(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="issuedDate">Pick-up Date:</label>
                        <input
                          type="date"
                          id="issuedDate"
                          name="issuedDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control"
                          required /> </div>
  
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary" onClick={businessClearance}>Submit</button>
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
                <form>
                  <div className="certificate">
                    <h2 className="installation-permit-title">Installation Permit Form</h2>
                    <div className="installation-permit-content certificate-content">
                      <div className="form-group">
                        <label htmlFor="applicantName">Resident's Name</label>
                        <input
                          type="text"
                          id="applicantName"
                          name="applicantName"
                          onChange={(e) => setResidentName(e.target.value)}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="installationAddress">Address</label>
                        <input
                          type="text"
                          id="installationAddress"
                          name="installationAddress"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="installationType">Reason of Request</label>
                        <input
                          type="text"
                          id="installationType"
                          name="installationType"
                          onChange={(e) => setReasonOfRequest(e.target.value)}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="installationDate">Pick-up Date</label>
                        <input
                          type="date"
                          id="pickUpDate"
                          name="pickUpDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control"
                          required />
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary" onClick={installation}> Submit </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
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
                <form>
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
                          className="form-control" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="issueddate">Pick-up Date:</label>
                        <input
                          type="date"
                          id="issueddate"
                          name="issueddate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control"
                          required />
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary" onClick={barangayID}> Submit </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
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
                <form>
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
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Address"> Address</label>
                        <input
                          type="text"
                          id="Address"
                          name="Address"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reasonOfRequest">Reason Of Request</label>
                        <input
                          type="text"
                          id="reasonOfRequest"
                          name="reasonOfRequest"
                          onChange={(e) => setReasonOfRequest(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="issuedDate">Pick-up Date:</label>
                        <input
                          type="date"
                          id="issuedDate"
                          name="issuedDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control"
                          required />
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary" onClick={construction}> Submit </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}>Discard </button>
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
                <form >
                  <div className="certificate">
                    <h2 className="certificate-title">Indigency Request Form</h2>
                    <div className="certificate-content">
                      <div className="form-group">
                        <label htmlFor="residentsName">Residents Name:</label>
                        <input
                          type="text"
                          id="residentName"
                          name="residentName"
                          onChange={(e) => setResidentName(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="Address"> Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          required /> </div>
  
                      <div className="form-group">
                        <label htmlFor="reasonOfRequest">Reason Of Request</label>
                        <input
                          type="text"
                          id="reasonOfRequest"
                          name="reasonOfRequest"
                          onChange={(e) => setReasonOfRequest(e.target.value)}
                          className="form-control"
                          required /></div>
  
                      <div className="form-group">
                        <label htmlFor="pickUpDate">Pick-up Date:</label>
                        <input
                          type="date"
                          id="pickUpDate"
                          name="pickUpDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                          className="form-control" required />
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
  
                        {renderInputTextboxes()}
                      </div>
  
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary"
                         onClick={barangayIndigency}
                        >Submit </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
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

      </body >
  
  
    )
  }
  
export default Usersample;