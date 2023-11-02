import React, { useState, useContext } from 'react';
import './assets/css/user-style.css';
import { RecoveryContext } from "../App";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { email, otp, setOTP } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [disable, setDisable] = useState(true);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0, 0]);
  const navigate = useNavigate();

  // Resend email
  const resendEmail = async (e) => {
    if (disable) return;
    const OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(OTP);
    setOTP(OTP);
    await axios.post('https://dbarangay.onrender.com/forgotpass', { OTP, email })
      .then(() => setDisable(true))
      .then(() => alert("A new otp has been sent successfully."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  // Verify OTP input
  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate('/recoveredpass')
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="container-fluid forgotpass-background-image">
      <div className="forgotpass-login-container">
        <div className="forgotpass-login-box">
          <h2 className="text-center pb-3 pt-3">OTP Input</h2>
          <p>Please check your email and put the OTP below.</p>
          <form>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row items-center justify-between mx-auto w-100 pb-3">
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                        OTPinput[4],
                        OTPinput[5],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                        OTPinput[4],
                        OTPinput[5],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                        OTPinput[4],
                        OTPinput[5],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                        OTPinput[4],
                        OTPinput[5],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                        e.target.value,
                        OTPinput[5],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-25 p-2">
                  <input
                    maxLength="1"
                    className="w-100 rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                        OTPinput[4],
                        e.target.value,
                      ])
                    }
                  ></input>
                </div>
              </div>

              <div className="d-flex flex-column pb-3">
                <div className="pb-3">
                  <a
                    onClick={() => verifyOTP()}
                    className="btn btn-primary w-100"
                  >
                    Verify Account
                  </a>
                </div>

                <div className="d-flex flex-row items-center justify-center text-center">
                  <p className="w-50">Didn't receive code?</p>{" "}
                  <a
                    className="text-center w-50"
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={() => resendEmail()}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
