import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/js/dist/dropdown';
// import './assets/css/user-style.css';
import bhall from './assets/img/Rooftop.jpg'
import bhall1 from './assets/img/bhall1.png'
import bhall2 from './assets/img/bhall2.png'
import bhall3 from './assets/img/bhall3.png'
import court from './assets/img/MagalonaCourt.jpg'
import playground from './assets/img/BarangayPlayground.png'
import map1 from './assets/img/evac-map1.png'
import sample from './assets/img/evac-map-1.png'
import map2 from './assets/img/evac-map2.png'
import map3 from './assets/img/evac-map3.png'
import { auto } from '@popperjs/core';
import Footer from "./footer"
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot"
import React, { useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";

function UserEvacuation() {

    const [showBHall, setShowBHall] = useState(false);
    const [showCourt, setShowCourt] = useState(false);
    const [showPlayground, setShowPlayground] = useState(false);
    const [showBHallCont, setShowBHallCont] = useState(false);

    const toggleBHall = () => {
        setShowBHall(!showBHall);
    };
    const toggleBHallCont = () => {
        setShowBHallCont(!showBHallCont);
    };

    const toggleCourt = () => {
        setShowCourt(!showCourt);
    };

    const togglePlayground = () => {
        setShowPlayground(!showPlayground);
    };

    const [evacIsPressed, setEvacIsPressed] = useState(false);

    const handleEvacIsPressed = () => {
        setEvacIsPressed(!evacIsPressed);
    }

    const showEvacImages = () => {
        if (evacIsPressed) {
            return <div className="bhallCont">
                <span><img src={bhall1} /></span>
                <span><img src={bhall2} /></span>
                <span><img src={bhall3} /></span>
            </div>
        }
    }
    return (
        <>
            <UserNav />
            <section className="container-fluid evacuation-section pt-5 pb-5">
                <div className="row section-title text-center p-5 text-white">
                    <h1>EVACUATION CENTERS</h1>
                </div>
                <div className="row section-content">
                    <button className="col-12 col-md-4 card evacuation-center p-0" onClick={toggleBHall}>
                        <div className="evac-content-container">
                            <img src={bhall} className="card-img-top evac-icon" alt="Evacuation Center Icon" />
                        </div>
                        <div className="card-body evac-content-container">
                            <h5 className="card-title">Brgy. Hall 3rd Floor</h5>
                            <p className="card-text">Hotline: 8-533-66-11</p>
                        </div>
                    </button>
                    {showBHall && (
                        <div className="popup-overlay">
                            <div className="popup-content w-100 h-100 d-flex flex-column justify-content-center align-content-center">
                                {/* <img
                                    src={sample}
                                    alt="Popup"
                                    className="popup-image w-75 h-75 m-auto mb-0"
                                /> */}
                                <div className="popup-image image-1 w-75 h-75 m-auto mb-0">
                                    <div className="bhall-content w-100 h-100 d-flex justify-content-center align-items-center">
                                        {/* <a className="location"> */}
                                        <FaLocationDot className="loc-marker text-danger " onClick={handleEvacIsPressed} />
                                        {/* <span><img src={bhall1} /></span>
                                        <span><img src={bhall2} /></span>
                                        <span><img src={bhall3} /></span></a> */}


                                    </div>
                                    {showEvacImages}
                                </div>
                                <div className="w-50 h-auto m-auto mt-0" >
                                    <button className="btn btn-secondary w-50" onClick={toggleBHall}>Close</button>
                                    <a href="https://goo.gl/maps/poebPHS6bGWGfmWL7" target="_blank"><button className="btn btn-primary w-50">Get Directions</button></a>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="col-12 col-md-4 card evacuation-center p-0" onClick={toggleCourt}>
                        <div className="evac-content-container">
                            <img src={court} className="card-img-top evac-icon" alt="Evacuation Center Icon" />
                        </div>
                        <div className="card-body evac-content-container">
                            <h5 className="card-title">Magalona Court</h5>
                            <p className="card-text">Hotline: N/A</p>
                        </div>
                    </button>
                    {showCourt && (
                        <div className="popup-overlay">
                            <div className="popup-content w-100 h-100 d-flex flex-column justify-content-center align-content-center">
                                <img
                                    src={map2}
                                    alt="Popup"
                                    className="popup-image w-75 h-75 m-auto mb-0"
                                />
                                <div className="w-50 h-auto m-auto mt-0" >
                                    <button className="btn btn-secondary w-50" onClick={toggleCourt}>Close</button>
                                    <a href="https://goo.gl/maps/2q1h6wGWvMSZJ9Ct9" target="_blank"><button className="btn btn-primary w-50">Get Directions</button></a>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="col-12 col-md-4 card evacuation-center p-0" onClick={togglePlayground}>
                        <div className="evac-content-container">
                            <img src={playground} className="card-img-top evac-icon" alt="Evacuation Center Icon" />
                        </div>
                        <div className="card-body evac-content-container">
                            <h5 className="card-title">Brgy. Playground</h5>
                            <p className="card-text">Hotline: N/A</p>
                        </div>
                    </button>
                    {showPlayground && (
                        <div className="popup-overlay">
                            <div className="popup-content w-100 h-100 d-flex flex-column justify-content-center align-content-center">
                                <img
                                    src={map3}
                                    alt="Popup"
                                    className="popup-image w-75 h-75 m-auto mb-0"
                                />
                                <div className="w-50 h-auto m-auto mt-0" >
                                    <button className="btn btn-secondary w-50" onClick={togglePlayground}>Close</button>
                                    <a href="https://goo.gl/maps/erZZXYRf7JTRF4LQ6" target="_blank"><button className="btn btn-primary w-50">Get Directions</button></a>
                                </div>
                            </div>
                        </div>
                    )}

                    {showBHallCont && (
                        <div className="popup-overlay">
                            <div className="popup-content w-100 h-100 d-flex justify-content-center align-content-end">
                                <span><img src={bhall1} /></span>
                                <span><img src={bhall2} /></span>
                                <span><img src={bhall3} /></span>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            <section className="container-fluid emergency-plan">
                <div className="row text-center section-title p-5">
                    <h1>EMERGENCY PLAN</h1>
                </div>
                <div className="row emergency-section-content early-warning">
                    <div class="col-12 card contingency-card">
                        <h3 class="card-header">CONTINGENCY PLAN</h3>

                        <div class="card-body bg-light pt-3 pb-3">
                            <h5 class="card-title mb-4">ALERT LEVEL 0</h5>
                            <p class="card-text"><b>Situation: </b> <br />Rainy season, may low pressure, may parating na malakas na bagyo, o walang tigil na ulan.</p>

                            <p class="card-text"><b>Warning Signal: </b><br />Balita mula sa PAGASA, Public Announcement.</p>

                            <p class="card-text"><b>Dapat Gawin ng Bawat Pamilya: </b><br />Maging alerto at making sa mga announcement. Maghanda at magimpake ng mga pagkain, damit, gamot, flashlight, pito at iba pa, na tatagal mula 3-5 days. Itaas ang mga gamit na maaring bahain.</p>

                        </div>
                        <hr />
                        <div class="card-body bg-success pt-3 pb-3" style={{ "--bs-bg-opacity": .2 }}>
                            <h5 class="card-title mb-4 ">Alert Level 1</h5>
                            <p class="card-text"><b>Situation: </b><br />Malakas na ulan sa loob ng isang oras, may high tide, may bagyo, may habagat, o tumataas ang tubig mula bukong-bukong.</p>

                            <p class="card-text"><b>Warning Signal: </b> <br />Paggamit ng megaphone, Pag announce ng alert level sa Paging System ng aming Barangay.</p>

                            <p class="card-text"><b>Dapat Gawin ng Bawat Pamilya: </b><br />Ready to pick up ang mga pamilya sa mababang lugar o sa high risk, pumupunta na sa evacuation center. </p>

                        </div>
                        <hr />
                        <div class="card-body bg-warning  pt-3 pb-3" style={{ "--bs-bg-opacity": .2 }}>
                            <h5 class="card-title mb-4">Alert Level 2</h5>
                            <p class="card-text"><b>Situation: </b><br />2ft Flood-level</p>

                            <p class="card-text"><b>Warning Signal: </b><br />Umiikot ang barangay patrol sa mga low-risk areas, nag aannounce sa paging system</p>

                            <p class="card-text"><b>Dapat Gawin ng Bawat Pamilya: </b><br />Tumutulong sa pag-aayos ng evacuation center</p>

                        </div>
                        <hr />
                        <div class="card-body  bg-danger pt-3 pb-3" style={{ "--bs-bg-opacity": .2 }}>
                            <h5 class="card-title mb-4">Alert Level 3</h5>
                            <p class="card-text"><b>Situation: </b><br />4ft Flood-level</p>

                            <p class="card-text"><b>Warning Signal: </b><br />Megaphone, Text, o Pagbabahay-bahay.</p>

                            <p class="card-text"><b>Dapat Gawin ng Bawat Pamilya: </b><br />Nakaantabay pa rin ang mga pamilya sa evacuation center, naghihintay ng go signal from
                                Brgy. Kapitan na ligtas ng bumalik sa kani-kaniyang tahanan.</p>

                        </div>
                    </div>

                    <h1 className="mt-5 mb-5 text-center">EARLY WARNING SYSTEM</h1>

                    <table class="table ps-5 pe-5">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={4}>Hazard/Disaster: Flood</th>
                            </tr>
                            <tr>
                                <th scope="col">ALERT LEVEL</th>
                                <th scope="col">Situation Signs</th>
                                <th scope="col">Warning Signal</th>
                                <th scope="col">Actions by Families/Residents</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <th scope="row">1</th>
                                <td>Continuous rain</td>
                                <td>Public paging system</td>
                                <td>Prepare clothes, food and first aid kit</td>
                            </tr>
                            <tr className="table-warning">
                                <th scope="row">2</th>
                                <td>Rising water level</td>
                                <td>Public paging system</td>
                                <td>Move to evacuation area</td>
                            </tr>
                            <tr className="table-danger">
                                <th scope="row">3</th>
                                <td>High water level with current</td>
                                <td>House to house visit</td>
                                <td>Stay and maintain order in the evacuation area</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={4}>Hazard/Disaster: Fire</th>
                            </tr>
                            <tr>
                                <th scope="col">ALERT LEVEL</th>
                                <th scope="col">Situation Signs</th>
                                <th scope="col">Warning Signal</th>
                                <th scope="col">Actions by Families/Residents</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <th scope="row">1</th>
                                <td>First Alarm</td>
                                <td>Public paging system</td>
                                <td>Secure important documents</td>
                            </tr>
                            <tr className="table-warning">
                                <th scope="row">2</th>
                                <td>Alpha Bravo</td>
                                <td>Public paging system</td>
                                <td>Move to evacuation area</td>
                            </tr>
                            <tr className="table-danger">
                                <th scope="row">3</th>
                                <td>General Alarm</td>
                                <td>Public paging system</td>
                                <td>Move to evacuation area</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={4}>Hazard/Disaster: Earthquake</th>
                            </tr>
                            <tr>
                                <th scope="col">ALERT LEVEL</th>
                                <th scope="col">Situation Signs</th>
                                <th scope="col">Warning Signal</th>
                                <th scope="col">Actions by Families/Residents</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-success">
                                <th scope="row">1</th>
                                <td>Intensity level I to III</td>
                                <td>Public paging system</td>
                                <td>Proceed to open area</td>
                            </tr>
                            <tr className="table-warning">
                                <th scope="row">2</th>
                                <td>Intensity level IV to VI</td>
                                <td>Public paging system</td>
                                <td>Proceed to open area</td>
                            </tr>
                            <tr className="table-danger">
                                <th scope="row">3</th>
                                <td>Intensity level VII to XI</td>
                                <td>Public paging system</td>
                                <td>Proceed to open area</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>

            <ScrollToTopButton />
            <Footer />
            <Bot />
        </>
    );
}

export default UserEvacuation;
