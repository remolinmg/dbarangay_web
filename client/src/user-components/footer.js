import React, { useState, useRef, useEffect} from 'react';
import Axios from 'axios';
import {
  FaTwitter,
  FaFacebook,
  FaInstagramSquare,
  FaHome,
  FaEnvelope
} from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const emailLinkStyle = {
    color: '#0060AD',
    textDecoration: 'none',
  };

  // Database Feedback
  const [date, setDate] = useState('');
  const [feedback, setFeedback] = useState('');
  const [inputValues, setInputValues] = useState({
    residentsName: '',
    Address: '',
    reasonOfRequest: '',
    issuedDate: '',
  });

  const submitFeedback = () => {
    Axios.post('http://localhost:3001/api/insert/userfeedback', {
      date: date,
      feedback: feedback
    })
  };

  const handleDiscard = () => {
    setInputValues({
      residentsName: '',
      Address: '',
      reasonOfRequest: '',
      issuedDate: '',
    });
  };

  return (


    <footer
      class="text-center text-lg-start text-white container-fluid col-sm-12"
      style={{ backgroundColor: "#fffff" }}
    >

      <div class="container">

        <section class="text-dark">
          <div class="row">
            <div class="col-12 col-md-7 mx-auto mt-3">
              <div className='feedback' id='feedback'>
                <form onSubmit={submitFeedback}>
                  <div className="pb-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold text-center">Suggestions and Feedbacks</h6>
                    <div className="feedback-content w-100 d-flex flex-column justify-content-center">
                      <div className="form-group w-75  m-auto">
                        <label htmlFor="issuedDate">Issued Date:</label>
                        <input
                          type="date"
                          id="issuedDate"
                          name="issuedDate"
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          className="form-control"
                          required />
                      </div>
                      <div className="form-group  w-75  m-auto">
                        <label htmlFor="suggestion">Your Suggestion/Feedback:</label>
                        <textarea
                          id="suggestion"
                          name="suggestion"
                          onChange={(e) => {
                            setFeedback(e.target.value);
                          }}
                          className="form-control" rows="4" required  ></textarea> </div>
                      <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">  Submit  </button>
                        <button type="button" className="btn btn-secondary" onClick={handleDiscard}> Discard </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-6 col-md-2 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
              <p class="mb-1">
                <Link className="text-decoration-none" to="/announcement">
                  <a>Announcement</a>
                </Link>
              </p>

              <p class="mb-1 ">
                <Link className="text-decoration-none" to="/business">
                  <a >Businesses</a>
                </Link>
              </p>
              <p class="mb-1">
                <Link className="text-decoration-none" to="/evacuation">
                  <a >Evacuation</a>
                </Link>
              </p>
              <p class="mb-1">
                <Link className="text-decoration-none" to="/livelihood">
                  <a >Livelihood</a>
                </Link>
              </p>
              <p class="mb-3">
                <Link className="text-decoration-none" to="/service">
                  <a >Services</a>
                </Link>
              </p>
            </div>

            <div class="col-6 col-md-3 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i class="mr-3"><FaHome /></i> 204 Daang Bakal Street, Harapin Ang Bukas, Mandaluyong City</p>
              <p><i class="mr-3"><FaEnvelope /></i>  <a href="mailto:harapinangbukas@gmail.com" style={emailLinkStyle}>
                harapinangbukas@gmail.com
              </a></p>

                <h6 class="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                <a
                   class="btn btn-primary btn-floating m-1"
                   style={{backgroundColor: "#3b5998"}}
                   href="https://www.facebook.com/harapinangbukas"
                   target="_blank"
                   role="button"
                   ><i><FaFacebook /></i
                  ></a>
            </div>
          </div>

        </section>

      </div>





    </footer>



  );
};

export default Footer;