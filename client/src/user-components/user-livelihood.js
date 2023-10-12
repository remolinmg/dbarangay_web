import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './assets/css/user-style.css';
import Footer from './footer';
import UserNav from './user-navbar';
import ScrollToTopButton from './scrolltotop';
import Bot from './faqbot';

const Livelihood = () => {
  const [livelihoodData, setLivelihoodData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get/livelihood')
      .then((response) => {
        setLivelihoodData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching livelihood data:', error);
      });
  }, []);

  return (
    <>
      <UserNav />

      <div className="livelihood-container pt-5">
        {livelihoodData.map((livelihoodItem) => (
          <div key={livelihoodItem._id} className="pt-5 d-flex flex-column w-100">
            <div className="livelihood-card card mb-5 align-self-center">
            <img
                        //style={{ width: "300px", height: "300px" }}
                        src={require(`../../../server/uploads/livelihood/${livelihoodItem.filename}`)}
                        alt=""
                        className="livelihood-img card-img-top"
                                />
              <div className="card-body">
                <h5 className="card-title"><b>{livelihoodItem.what}</b></h5>
                <p className="card-text"><b>Where:</b> {livelihoodItem.where}</p>
                <p className="card-text"><b>When:</b> {livelihoodItem.when}</p>
                <p className="card-text"><b>Who:</b> {livelihoodItem.who}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
      <Footer />
      <Bot />
    </>
  );
};

export default Livelihood;
