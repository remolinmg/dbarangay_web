import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './assets/css/user-style.css';
import Footer from './footer';
import UserNav from './user-navbar';
import ScrollToTopButton from './scrolltotop';
import Bot from './faqbot';

const UserBusiness = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get/promotebusiness')
      .then((response) => {
        setBusiness(response.data);
      })
      .catch((error) => {
        console.error('Error fetching business data:', error);
      });
  }, []);

  return (
    <>
      <UserNav />

      <div className="livelihood-container pt-5">
        <div className="container-fluid text-white text-center pt-5">
          <h3><b>Businesses</b></h3>
        </div>
        {business.map((post) => (
          <div key={post._id} className="pt-5 d-flex flex-column w-100">
            <div className="livelihood-card card mb-5 align-self-center">
              <img
                //style={{ width: "300px", height: "300px" }}
                src={require(`../../../server/uploads/promotebusiness/${post.filename}`)}
                alt=""
                className="livelihood-img card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title"><b>{post.businessName}</b></h5>
                <h5 className="card-title"><b>Category: </b>{post.category}</h5>
                <h5 className="card-title"><b>Address: </b>{post.address}</h5>
                <h5 className="card-title"><b>Contact Number: </b>{post.contact}</h5>
                <h5 className="card-title"><b>Open Hours: </b>{post.hours}</h5>
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

export default UserBusiness;