import React, { useState, useRef, useEffect} from 'react';
import Map1 from "../user-components/assets/img/MAP.png";
import Map2 from "../user-components/assets/img/MAP2.png";
import Stats from "./stats"
import Community from "./community"
import BrgyOfficials from "./brgy-officials"
import MissionVision from "./mission-vision"
import Footer from "./footer"
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Axios from 'axios';
import bhall from './assets/img/Rooftop.jpg'
import court from './assets/img/MagalonaCourt.jpg'
import playground from './assets/img/BarangayPlayground.png'
import Bot from "./faqbot"

import '../user-components/assets/css/user-style.css';


const Homepage = () => {
  const homeRef = useRef(null);
  const containerStyle = {
    backgroundColor: '#0060AD',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px'

  };

  const textSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: '40px',
  };

  const imageSectionStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  };

  const aboutTextStyle = {
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'left',
  };

  const bigTextStyle = {
    fontSize: '24px',
    textAlign: 'left',
  };

  const carouselItemStyle = {
    width: '50rem',
    height: '50rem'
  }

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
    <>
      <UserNav />

      <div ref={homeRef} className="section1 text-center" id='home'>
        <div id="titlecontainer">
          <h1 id="title" className="text-white">Welcome to Barangay Harapin ang Bukas</h1>
        </div>
        <div id="quotecontainer">
          <blockquote id="quote"><i>Know everything about the barangay and the services available</i></blockquote>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-evenly container-fluid" style={containerStyle}>
        <div id="carouselExampleControls" class="carousel slide w-100" data-bs-ride="carousel">
          <div class="carousel-inner p-5">
            <div class="carousel-item active w-100">
              <div className="d-flex flex-row justify-content-evenly align-self-center">
                <div className="d-flex flex-column align-self-center justify-content-center">
                  <h1>MAP</h1>
                  <p>If you are wondering about the location of the barangay.</p>
                </div>
                <div>
                  <img src={Map1} class="d-block w-100" alt="..." style={{ height: "200px", width: "200px" }} />
                </div>
              </div>
            </div>
            <div class="carousel-item align-self-center">
              <div className="d-flex flex-row justify-content-evenly align-self-center">
                <div className="d-flex flex-column align-self-center justify-content-center">
                  <h1>MAP</h1>
                  <p>If you are wondering about the location of the barangay.</p>
                </div>
                <div>
                  <img src={Map2} class="d-block w-100" alt="..." style={{ height: "200px", width: "200px" }} />
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className="d-flex flex-row justify-content-evenly">
                <Stats />
              </div>
            </div>
            <div class="carousel-item">
              <div className="d-flex flex-row justify-content-evenly">
                <Community />
              </div>
            </div>

          </div>
          <button class="carousel-control-prev justify-content-start" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next justify-content-end" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <BrgyOfficials />
      <MissionVision />

      <div className='feedback' id='feedback'>
        <form onSubmit={submitFeedback}>
          <div className=" p-5">
            <h2 className="feedback-title text-center">Suggestions and Feedbacks</h2>
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
      <Footer />
      <Bot />
    </>

  );
};

export default Homepage;