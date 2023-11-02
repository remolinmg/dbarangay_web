import React from 'react';
import mis from "../user-components/assets/img/mission.png";
import vis from "../user-components/assets/img/vision.png";

const MissionVision = () => {
  const containerStyle = {
    backgroundColor: '#0060AD',
    color: 'white'
  };

  const iconStyle = {
    width: '20%',
    height: '50%',
  };

  return (
    <div className="container-fluid p-5" style={containerStyle}>
      <div className="row justify-content-center">
        <div id="mission-vision" className="col-12 col-md-6 card m-3">
          <div className="text-sm-small card-body text-center p-4">
            <img src={mis} style={iconStyle} alt="Mission Icon" />
            <h1>Mission</h1>
            <p>We are committed to delivering efficient and transparent public service, promoting community engagement, and fostering sustainable development for the benefit of all our residents. Through collaboration, innovation, and inclusivity, we strive to create a barangay that is safe, resilient, and offers opportunities for growth and well-being </p>
          </div>
        </div>
        <div id="mission-vision" className="col-12 col-md-6 card m-3">
          <div className="text-sm-small card-body text-center p-4">
            <img  src={vis} style={iconStyle} alt="Vision Icon" />
            <h1>Vision</h1>
            <p>To be a safe, thriving, and inclusive community that empowers our residents to lead happy and fulfilled lives. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;