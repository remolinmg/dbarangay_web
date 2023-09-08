import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './assets/css/style.css';


const RegisterA = () => {
    return (
        <>

            <div className="form-container">
                <div className="Register-form-container">
                    <div className="row mb-3">
                        <div className="col">
                            <label for="FirstName">First Name</label>
                            <input type="FirstName" className="form-control" id="FirstName" placeholder="Enter FirstName" />
                        </div>

                        <div className="col">
                            <label for="LastName">Last Name</label>
                            <input type="LastName" className="form-control" id="LastName" placeholder="Enter LastName" />
                        </div>
                        <div className="col">
                            <label for="Suffix">Suffix</label>
                            <input type="Suffix" className="form-control" id="Suffix" placeholder="Enter Suffix" />
                        </div>
                    </div>
                    <div className="register-age row mb-3">
                    <div className="col">
                            <label For="Age">Age</label>
                            <input type="Age" className="form-control" id="Age" placeholder="Enter Age" />
                        </div>
                        <div className="register-birth col">
                            <label className="col-container" for="date">Date of Birth:</label>
                            <input type="date" id="date" name="date" required />
                        </div>
                        <div className="register-gender col">
                            <label className="col-container" for="gender">Gender:</label>
                            <select id="gender" name="gender" required >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>


                    <div className="mb-3">
                        <label for="formGridAddress1">Address</label>
                        <input type="text" className="form-control" id="formGridAddress1" placeholder="1234 Main St" />
                    </div>

                    <div className="mb-3">
                        <label for="formGridAddress2">Address 2</label>
                        <input type="text" className="form-control" id="formGridAddress2" placeholder="Apartment, studio, or floor" />
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label for="formGridCity">City</label>
                            <input type="text" className="form-control" id="formGridCity" />
                        </div>

                        <div className="col">
                            <label for="formGridState">State</label>
                            <select className="form-select" id="formGridState" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>

                        <div className="col">
                            <label for="formGridZip">Zip</label>
                            <input type="text" className="form-control" id="formGridZip" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="formGridAddress1">Email</label>
                        <input type="Email" className="form-control" id="formGridEmail" placeholder="Enter Email" />
                    </div>

                    <div className="mb-3">
                        <label for="formGridAddress2">Password</label>
                        <input type="Password" className="form-control" id="formGridPassword" placeholder="Enter Password" />
                    </div>
                    <div className="mb-3" id="formGridCheckbox">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="checkMeOut" />
                            <label className="form-check-label" htmlFor="checkMeOut">Check me out</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">login</button>
                </div>
            </div>
        </>
    );

};
export default RegisterA;