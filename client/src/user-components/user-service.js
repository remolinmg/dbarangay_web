import React, { useState, useEffect } from 'react';
import './assets/css/user-style.css';
import { IoMdFiling } from "react-icons/io";
import { MdConstruction, MdOutlineInstallDesktop, MdOutlineFactCheck, MdOutlineAddBusiness } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import UserNav from './user-navbar';
import Bot from "./faqbot"


function UserService() {
  const [currentService, setCurrentService] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValues, setInputValues] = useState({
    residentsName: '',
    Address: '',
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
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);


  return (
    <body>
      <UserNav />
      <div className="blue-box" style={{ background: '#003c7de7', height: '90px' }}></div>
      <div className="service component__space" id="Services">
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
                  <h1 className="service__text">BARANGAY CLEARANCE </h1>
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
                  <h1 className="service__text">BUSINESS PERMIT</h1>
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
          {/* ------------------- FILE COMPLAINT / BLOTTER  --------------------------- */}
          <div className="row">
            <div className="col-4 col__3" onClick={() => handleServiceClick('fileComplaint')}>
              <div className="service__box pointer">
                <div className="icon">
                  <IoMdFiling size={32} />
                </div>
                <div className="service__meta">
                  <h1 className="service__text">FILE COMPLAINT </h1>
                  <p className="p service__text p__color">
                    A barangay complaint is a formal statement made by a resident or group within a barangay to address a specific issue or concern within their community, seeking resolution or intervention from the barangay officials.</p>
                </div>
              </div>
            </div>
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
          </div>
        </div>
        {/* --------------------------------------------------------- barangayClearance forms  --------------------------------------------------------- */}
        {showPopup && currentService === 'barangayClearance' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="certificate-title">Certificate Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Residents Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        value={inputValues.residentsName}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="Address"> Address</label>
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={inputValues.Address}
                        onChange={handleInputChange}
                        className="form-control"
                        required /> </div>

                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        value={inputValues.reasonOfRequest}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="issuedDate">Issued Date:</label>
                      <input
                        type="date"
                        id="issuedDate"
                        name="issuedDate"
                        value={inputValues.issuedDate}
                        onChange={handleInputChange}
                        className="form-control" required /></div>

                    <div className="form-buttons">
                      <button type="submit" className="btn btn-primary">Submit </button>
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
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="certificate-title">Business Permit Request Form</h2>
                  <div className="certificate-content">

                    <div className="form-group">
                      <label htmlFor="businessPermitField1">Business Name:</label>
                      <input
                        type="text"
                        id="businessPermitField1"
                        name="businessPermitField1"
                        value={inputValues.bussinessName}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="Address"> Address</label>
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={inputValues.Address}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        value={inputValues.reasonOfRequest}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="issuedDate">Issued Date:</label>
                      <input
                        type="date"
                        id="issuedDate"
                        name="issuedDate"
                        value={inputValues.issuedDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required /> </div>

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
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="installation-permit-title">Installation Permit Form</h2>
                  <div className="installation-permit-content">
                    <div className="form-group">
                      <label htmlFor="applicantName">N/A</label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={inputValues.applicantName}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationAddress">N/A</label>
                      <input
                        type="text"
                        id="installationAddress"
                        name="installationAddress"
                        value={inputValues.installationAddress}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationType">N/A</label>
                      <input
                        type="text"
                        id="installationType"
                        name="installationType"
                        value={inputValues.installationType}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationDate">N/A</label>
                      <input
                        type="date"
                        id="installationDate"
                        name="installationDate"
                        value={inputValues.installationDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="btn btn-primary"> Submit </button>
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
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="barangay-id-title">Barangay ID Request Form</h2>
                  <div className="barangay-id-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Resident's Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        value={inputValues.residentsName}
                        onChange={handleInputChange}
                        className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={inputValues.address}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthdate">Birthdate:</label>
                      <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={inputValues.birthdate}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="btn btn-primary"> Submit </button>
                      <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FILE COMPLAINT & BLOTTER */}
        {showPopup && currentService === 'fileComplaint' && (
          <div className="popup-overlay">
            <div className="popup-form">
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="ifile-complaint-title">File Complaint/Blotter Form</h2>
                  <div className="ifile-complaint-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Resident's Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        value={inputValues.residentsName}
                        onChange={handleInputChange}
                        className="form-control"
                        required /> </div>

                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={inputValues.address}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="complaintDetails">Complaint Details:</label>
                      <textarea
                        id="complaintDetails"
                        name="complaintDetails"
                        value={inputValues.complaintDetails}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4" required ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="incidentDate">Incident Date:</label>
                      <input
                        type="date"
                        id="incidentDate"
                        name="incidentDate"
                        value={inputValues.incidentDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="witnessName">Witness Name:</label>
                      <input
                        type="text"
                        id="witnessName"
                        name="witnessName"
                        value={inputValues.witnessName}
                        onChange={handleInputChange}
                        className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="witnessStatement">Witness Statement:</label>
                      <textarea
                        id="witnessStatement"
                        name="witnessStatement"
                        value={inputValues.witnessStatement}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4"></textarea>
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={handleDiscard}>
                        Discard
                      </button>
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
              <form onSubmit={handleSubmit}>
                <div className="certificate">
                  <h2 className="certificate-title">Construction Permit Request Form</h2>
                  <div className="certificate-content">
                    <div className="form-group">
                      <label htmlFor="residentsName">Residents Name:</label>
                      <input
                        type="text"
                        id="residentsName"
                        name="residentsName"
                        value={inputValues.residentsName}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Address"> Address</label>
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={inputValues.Address}
                        onChange={handleInputChange}
                        className="form-control"
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reasonOfRequest">Reason Of Request</label>
                      <input
                        type="text"
                        id="reasonOfRequest"
                        name="reasonOfRequest"
                        value={inputValues.reasonOfRequest}
                        onChange={handleInputChange}
                        className="form-control"
                        required /></div>

                    <div className="form-group">
                      <label htmlFor="issuedDate">Issued Date:</label>
                      <input
                        type="date"
                        id="issuedDate"
                        name="issuedDate"
                        value={inputValues.issuedDate}
                        onChange={handleInputChange}
                        className="form-control"
                        required />  </div>

                    <div className="form-buttons">
                      <button type="submit" className="btn btn-primary"> Submit </button>
                      <button type="button" className="btn btn-secondary" onClick={handleDiscard}>Discard </button>
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
      <Bot />
    </body >
    

  )
}

export default UserService;