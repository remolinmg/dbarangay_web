import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'; // Import Axios
import './assets/css/user-style.css';
import Footer from './footer';
import UserNav from './user-navbar';
import ScrollToTopButton from './scrolltotop';
import Bot from './faqbot';

class Promotebusiness extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      search: '', // State for the search input
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get/promotebusiness')
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value }); // Update the search state as the user types
  }

  render() {
    const { posts, search } = this.state;
    const reversePromotebusiness = posts.slice().reverse(); // Create a reversed copy of the posts array

    // Filter posts based on the search input
    const filteredPosts = reversePromotebusiness.filter(post => {
      return (
        (post.businessName && post.businessName.toLowerCase().includes(search.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(search.toLowerCase())) ||
        (post.address && post.address.toLowerCase().includes(search.toLowerCase())) ||
        (post.contact && post.contact.toLowerCase().includes(search.toLowerCase())) ||
        (post.hours && post.hours.toLowerCase().includes(search.toLowerCase()))
      );
    });

    return (
      <>
        <UserNav />
        <div className="livelihood-container pt-5">
          <div className="container-fluid text-white text-center pt-5">
            <h3><b>Businesses</b></h3>
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
          {filteredPosts.map((post) => (
            <div key={post._id} className="pt-5 d-flex flex-column w-100">
              <div className="livelihood-card card mb-5 align-self-center">
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={post.filename.url}
                  alt=""
                  className="business-picture"
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
  }
}


export default Promotebusiness;