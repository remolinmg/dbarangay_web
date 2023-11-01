import React, { Component } from 'react';
import axios from 'axios';
import './assets/css/user-style.css';
import Footer from "./footer";
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Faq from './faq'

class Announcement extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      search: '', // State for the search input
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/get/announcement')
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
    const reversedPosts = posts.slice().reverse(); // Create a reversed copy of the posts array

    // Filter posts based on the search input
    const filteredPosts = reversedPosts.filter(post => {
      return post.what.toLowerCase().includes(search.toLowerCase()) ||
        post.where.toLowerCase().includes(search.toLowerCase()) ||
        post.when.toLowerCase().includes(search.toLowerCase()) ||
        post.who.toLowerCase().includes(search.toLowerCase());
    });

    return (
      <>
        <UserNav />
        <div className="user-announcement-background pt-5">
          <div className="container-fluid text-white text-center pt-5">
            <h3><b>General Announcement</b></h3>
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
          {filteredPosts.map((post) => ( // Map over the reversed array
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
                      <h5 className="card-title"><b>{post.what}</b></h5>
                      <p className="card-text pt-5"><b>Where:</b> {post.where}</p>
                      <p className="card-text"><b>When:</b> {post.when}</p>
                      <p className="card-text"><b>Who:</b> {post.who}</p>
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

export default Announcement;
