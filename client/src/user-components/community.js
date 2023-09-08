import React from 'react';

const OurCommunity = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0060AD',
    padding: '40px',
    color: 'white',
  };

  const headingStyle = {
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div className="container-fluid overflow-auto" style={containerStyle}>
      <h2 style={headingStyle}>OUR COMMUNITY</h2>
        <p>
          Every Government Unit in the Philippines is within a Barangay. The municipal hall, city hall, the provincial capitol building, and even the Malacañang Palace where the president resides is within a Barangay.
        </p>
        <p>
          The barangay has power and authority over its domain. The improvement of the barangay rests on the barangay officials. The barangay chairman, the barangay council, and the local businessmen forge the prosperity of the barangay. Not the president of the Philippines, senate, nor congress. Not the governor of the province, not the mayor nor council of the municipality or city. Poor barangays stay poor because of weak and/or ignorant (uninformed) barangay leaders.
        </p>
    </div>
  );
};

export default OurCommunity;
