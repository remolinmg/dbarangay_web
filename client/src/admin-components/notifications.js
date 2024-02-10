import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationShown: false,
    };
  }

  redirectToEmergencyAdmin = () => {
    // Redirect to the "/emergency-admin" page
    // You can use the Link component, or you can use history.push if this component is rendered within a Route
    // Example using Link:
    window.location.href = '/emergency-admin';
  };

  componentDidMount() {
    axios.get('https://dbarangay.onrender.com/get/emergency')
      .then((response) => {
        const extractedData = response.data.map((item) => ({
          emergencyType: item.emergencyType,
          status: item.status,
        }));

        // Filter new data with a status of "new"
        const newData = extractedData.filter((item) => item.status === 'NEW');

        if (newData.length > 0 && !this.state.notificationShown) {
          // Show a toast notification with a red background, red icon, and red progress bar when new data with status "new" arrives
          toast.info('New emergency received!', {
            position: "top-right",
            autoClose: 5000,
            style: {
              backgroundColor: 'white', // Set the background color to red
              color: 'Red', // Set the text color to white
            },
            icon: '🚨', // Change the icon to a red alert icon (customize as needed)
            progressClassName: 'red-progress-bar', // Apply the custom progress bar class
            progressStyle: {
              background: 'red', // Set the progress bar background to red
            },
            onClick: this.redirectToEmergencyAdmin, // Specify the function to be executed when the notification is clicked
          });

          // Set the state to indicate that the notification has been shown
          this.setState({ notificationShown: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    );
  }
}

export default Notification;
