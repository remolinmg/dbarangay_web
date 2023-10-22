import React, { useState, useEffect } from 'react';


const Stats = () => {
  const [voters, setVoters] = useState(0);
  const [population, setPopulation] = useState(0);

  const startCountUpAnimation = () => {
    const targetVoters = 3131;
    const targetPopulation = 3981;

    const increment = Math.ceil(targetVoters / 100);
    let count = 0;

    const interval = setInterval(() => {
      count += increment;

      if (count >= targetVoters) {
        clearInterval(interval);
        count = targetVoters;
      }

      setVoters(count);
    }, 10);

    const increment2 = Math.ceil(targetPopulation / 100);
    let count2 = 0;

    const interval2 = setInterval(() => {
      count2 += increment2;

      if (count2 >= targetPopulation) {
        clearInterval(interval2);
        count2 = targetPopulation;
      }

      setPopulation(count2);
    }, 10);
  };

  useEffect(() => {
    startCountUpAnimation();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0060AD',
    padding: '40px',
    color: 'white',
    height: '200px',
  };
  
  const headerStyle = {
    fontSize: '25px',
    marginBottom: '20px',
    color: 'white',
  };
  
  const statContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const statItemStyle = {
    margin: '0 30px',
  };
  
  const countStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'white',
  };
  
  const landAreaStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'white',
  };
  
  const spanStyle = {
    display: 'block',
    color: 'white',
  };
  

  return (
    <div id="stats-main" className="container-fluid overflow-hidden" style={containerStyle}>
      <h2 class="stats-title" style={headerStyle}>
        Harapin Ang Bukas is a barangay in the city of Mandaluyong,
        <span style={spanStyle}>National Capital Region (NCR), Philippines.</span>
      </h2>
      <div style={statContainerStyle}>
        <div id="stats" style={statItemStyle}>
          <h3 style={countStyle}>{voters}</h3>
          <p>Voters</p>
        </div>
        <div id="stats" style={statItemStyle}>
          <h3 style={countStyle}>{population}</h3>
          <p>Population</p>
        </div>
        <div id="stats" style={statItemStyle}>
          <h3 style={countStyle}>4.89 has</h3>
          <p>Land Area</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;