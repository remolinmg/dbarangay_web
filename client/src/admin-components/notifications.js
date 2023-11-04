import React, { Component } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      emergencyData: [],
    };
  }

  componentDidMount() {
    axios.get('https://dbarangay.onrender.com/get/emergency')
      .then((response) => {
        const extractedData = response.data.map((item) => ({
          emergencyType: item.emergencyType,
          status: item.status,
        }));
        this.setState({ emergencyData: extractedData });

        // Filter new data with a status of "new"
        const newData = extractedData.filter((item) => item.status === 'NEW');

        if (newData.length > 0 && !this.state.notificationShown) {
          // Show a toast notification when new data with status "new" arrives
          toast.info('New emergency data received!', {
            position: "top-right",
            autoClose: 5000,
          });

          // Set the state to indicate that the notification has been shown
          this.setState({ notificationShown: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  }

  render() {
    const { showDropdown, emergencyData } = this.state;

    return (
      <div className="notification-container">
        <button className="notification-button" onClick={this.toggleDropdown}>
          <FaBell />
        </button>
        {showDropdown && (
          <div className="notification-dropdown">
            <h3 className="notification-title">Emergency Notifications</h3>
            <ul className="notification-list">
              {emergencyData.map((item, index) => (
                <li key={index}>
                  <strong>Emergency Type:</strong> {item.emergencyType}, <strong>Status:</strong> {item.status}
                </li>
              ))}
            </ul>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={5000} /> {/* Toast container for notifications */}
      </div>
    );
  }
}

export default Notification;
