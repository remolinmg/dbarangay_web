import React, { useState } from 'react';
import '../user-components/assets/css/user-style.css';

const Faq = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const [showCurfewTime, setShowCurfewTime] = useState(false);
  const [showRequestDocument, setShowRequestDocument] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleWorkingHours = () => {
    setShowWorkingHours(!showWorkingHours);
  };

  const toggleCurfewTime = () => {
    setShowCurfewTime(!showCurfewTime);
  };

  const toggleRequestDocument = () => {
    setShowRequestDocument(!showRequestDocument);
  };

  return (
    <div className="faq-popup-container">
      <button onClick={togglePopup} className="faq-popup-button d-flex align-items-center justify-content-center">
        FAQ
      </button>


      {showPopup && (
        <div className="faq-popup">
          <div className="faq-header">
            <button onClick={togglePopup} className="close-button">
              X
            </button>
          </div>
          <h3>FAQs</h3>

          {showWorkingHours ? (
            <div className="faqcontainer">
              <p>Our working hours:</p>
              <p>10am - 10pm</p>
            </div>
          ) : (
            <button onClick={toggleWorkingHours} className="faqbutton">
              What are your working hours?
            </button>

          )}
          {showCurfewTime ? (
            <div className="faqcontainer">
              <p>Our curfew starts at:</p>
              <p>10pm</p>
            </div>
          ) : (
            <button onClick={toggleCurfewTime} className="faqbutton">
              What time is the curfew?
            </button>
          )}

          {showRequestDocument ? (
            <div className="faqcontainer">
              <p>How to request a document:</p>
              <p>You can use our services to request a document online or go to the barangay hall.</p>
            </div>
          ) : (
            <button onClick={toggleRequestDocument} className="faqbutton">
              How to request a document?
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Faq;
