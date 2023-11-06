import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationShown: false,
    };
  }

  componentDidMount() {
    axios.get('https://dbarangay.onrender.com/get/emergency')
      .then((response) => {
        const extractedData = response.data.map((item) => ({
          emergencyType: item.emergencyType,
          status: item.status,
        }));

        // Filter new data with a status of "new"
        const newData = extractedData.filter((item) => item.status === 'New');

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
