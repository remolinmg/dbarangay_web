import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'; // Import Axios
import './assets/css/user-style.css';
import Footer from './footer';
import UserNav from './user-navbar';
import ScrollToTopButton from './scrolltotop';
import Faq from './faq'

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
        <div className="user-announcement-background pt-5">
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
            <div key={post._id} className="d-flex justify-content-center pt-5">
              <div className="card mb-3 announcement-card-item">
                <div className="row g-0">
                  <div className="col-md-4 img-container">
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={post.filename.url}
                      alt=""
                      className="business-picture"
                    />
                     </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title"><b>{post.businessName}</b></h5>
                        <h5 className="card-title"><b>Category: </b>{post.category}</h5>
                        <h5 className="card-title"><b>Address: </b>{post.address}</h5>
                        <h5 className="card-title"><b>Contact Number: </b>{post.contact}</h5>
                        <h5 className="card-title"><b>Open Hours: </b>{post.hours}</h5>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollToTopButton />
        <Footer />
        <Faq/>
      </>
    );
  }
}


export default Promotebusiness;