import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import logo from "./assets/img/brgy.png"
import './assets/css/user-style.css';
import Footer from "./footer"
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot"


function Announcement() {

    return (
        <>
            <UserNav />
            <div className="user-announcement-background pt-5">
                <div className="announcement-container">
                    <div className="d-flex justify-content-center pt-5">
                        <div className="card mb-3 announcement-card-item " >
                            <div className="row g-0">
                                <div className="col-md-4 img-container" >
                                    <img src={logo} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">GENERAL ANNOUNCEMENT</h5>
                                        <p className="card-text">We would like to inform you of an important update regarding our community's safety measures. Effective immediately, a curfew will be implemented starting at 10:00 PM each evening until 5:00 AM the following day. This decision has been made to ensure the security and well-being of our residents.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 15 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Sports Fest</h5>
                                    <p className="card-text">Attention, residents of Barangay Barangay Haraping Ang bukas!

                                        We are thrilled to announce the upcoming Barangay Sports Fest, an exciting event that aims to promote sportsmanship, camaraderie, and a healthy lifestyle within our community. Mark your calendars for 6/25/23 as we prepare for a day filled with thrilling athletic competitions and fun-filled activities.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 30 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Vaccination for Cats and Dogs</h5>
                                    <p className="card-text">Attention, pet owners of Barangay Haraping Ang bukas!

                                        We are pleased to inform you about an upcoming Vaccination Campaign for cats and dogs, organized by the Barangay Veterinary Services. Ensuring the health and well-being of our beloved pets is of utmost importance, and this campaign aims to provide convenient access to essential vaccinations for your furry companions.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 1 hour ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Environmental Cleanup Day Announcement</h5>
                                    <p className="card-text">We are excited to announce our upcoming Environmental Cleanup Day, an opportunity for us to unite as a community and make a positive impact on the environment we live in. Join us on 6/23/2023 as we come together to restore the beauty of our barangay, promote cleanliness, and raise awareness about environmental conservation.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 hours ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">GENERAL ANNOUNCEMENT</h5>
                                    <p className="card-text">**INFORMATION**</p>
                                    <p className="card-text"><small className="text-muted">Last updated 5 hours ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">GENERAL ANNOUNCEMENT</h5>
                                    <p className="card-text">**INFORMATION**</p>
                                    <p className="card-text"><small className="text-muted">Last updated 10 hours ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-3 announcement-card-item " >
                        <div className="row g-0">
                            <div className="col-md-4 img-container" >
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">GENERAL ANNOUNCEMENT</h5>
                                    <p className="card-text">**INFORMATION**</p>
                                    <p className="card-text"><small className="text-muted">Last updated 18 hours ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ScrollToTopButton />
            <Footer />
            <Bot />
        </>

    );
}

export default Announcement;
