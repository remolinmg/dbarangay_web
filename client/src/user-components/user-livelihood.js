import React, { Component } from 'react';
import axios from 'axios';
import './assets/css/user-style.css';
import Footer from "./footer";
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot";
class Livelihood extends Component {
  constructor() {
    super();
    this.state = {
      livelihoodData: [],
      search: '', // State for the search input
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get/livelihood')
      .then((response) => {
        this.setState({ livelihoodData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching livelihood data:', error);
      });
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value }); // Update the search state as the user types
  }

  render() {
    const { livelihoodData, search } = this.state;
    const reversedLivelihoodData = livelihoodData.slice().reverse(); // Create a reversed copy of the livelihood data array

    // Filter livelihood data based on the search input
    const filteredLivelihoodData = reversedLivelihoodData.filter(livelihoodItem => {
      return (
        (livelihoodItem.what && livelihoodItem.what.toLowerCase().includes(search.toLowerCase())) ||
        (livelihoodItem.where && livelihoodItem.where.toLowerCase().includes(search.toLowerCase())) ||
        (livelihoodItem.when && livelihoodItem.when.toLowerCase().includes(search.toLowerCase())) ||
        (livelihoodItem.who && livelihoodItem.who.toLowerCase().includes(search.toLowerCase()))
      );
    });

    return (
      <>
        <UserNav />
        <div className="user-announcement-background pt-5">
          <div className="container-fluid text-white text-center pt-5">
            <h3><b>Livelihood Programs</b></h3>
            <div className="search-container-user">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={this.handleSearch}
                className='transparent-user-search'
              />
            </div>
          </div>
          {filteredLivelihoodData.map((livelihoodItem) => (// Map over the reversed array
            <div key={livelihoodItem._id} className="d-flex justify-content-center pt-5">
              <div className="card mb-3 announcement-card-item">
                <div className="row g-0">
                  <div className="col-md-4 img-container">
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={livelihoodItem.filename.url}
                      alt=""
                      className="business-picture"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title"><b>{livelihoodItem.what}</b></h5>
                      <p className="card-text pt-5"><b>Where:</b> {livelihoodItem.where}</p>
                      <p className="card-text"><b>When:</b> {livelihoodItem.when}</p>
                      <p className="card-text"><b>Who:</b> {livelihoodItem.who}</p>
                    </div>
                  </div>
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
  }
}
export default Livelihood;
