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
        <div className="col-12 col-md-6 card m-3">
          <div className="text-sm-small card-body text-center p-4">
            <img src={mis} style={iconStyle} alt="Mission Icon" />
            <h1>Mission</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
        <div className="col-12 col-md-6 card m-3">
          <div className="text-sm-small card-body text-center p-4">
            <img src={vis} style={iconStyle} alt="Vision Icon" />
            <h1>Vision</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
