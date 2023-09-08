import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './assets/css/user-style.css';
import Footer from "./footer"
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot"



const Livelihood = () => {

  return (
    <> <UserNav />

      <div className="livelihood-container pt-5">
        <div className="pt-5 d-flex flex-column w-100">
          <div className="livelihood-card card mb-5 align-self-center">
            <img className="livelihood-img card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Handicrafts and Artisanal Products</h5>
              <p className="card-text">
                Tap into your creativity and craftsmanship by venturing into the world of handicrafts and artisanal products. Showcase your artistic talents through handmade crafts, jewelry, accessories, home dÃ©cor, or textile products. Join our interactive workshop on 6/29/23 at Barangay Court to enhance your skills, learn about market trends, and discover the avenues available for selling your unique creations.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="livelihood-card card mb-3 align-self-center">
            <img className="livelihood-img card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Recycling and Waste Management</h5>
              <p className="card-text">
                Transform waste into wealth through recycling and waste management initiatives. Discover the opportunities in collecting, segregating, and repurposing recyclable materials such as plastics, paper, and glass. Attend our workshop on 6/27/23 at Barangay Hall to understand waste management strategies, recycling techniques, and potential collaborations with recycling centers and organizations. Let's contribute to a cleaner environment while creating livelihood opportunities.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="livelihood-card card mb-3 align-self-center">
            <img className="livelihood-img card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Home-Based Food Business:</h5>
              <p className="card-text">
                Unleash your culinary skills and share your delectable creations with the community. A home-based food business allows you to turn your kitchen into a hub of delicious treats. Whether you specialize in baked goods, traditional cuisine, or unique culinary creations, our entrepreneurship seminar on 6/25/23 at Barangay Court will provide you with valuable insights on starting and managing a successful food business from the comfort of your own home.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
      <Footer />
      <Bot />
    </>


  );
};

export default Livelihood;