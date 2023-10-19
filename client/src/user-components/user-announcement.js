import React, { Component } from 'react';
import axios from 'axios'; // Import Axios
import './assets/css/user-style.css';
import Footer from "./footer";
import UserNav from './user-navbar';
import ScrollToTopButton from "./scrolltotop";
import Bot from "./faqbot";

class Announcement extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    // Fetch posts from your API using Axios
    axios.get('http://localhost:8000/get/announcement') // Update the endpoint
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  render() {
    return (
      <>
        <UserNav />
        <div className="user-announcement-background pt-5">
          <div className="container-fluid text-white text-center pt-5">
            <h3><b>General Announcement</b></h3>
          </div>
          {this.state.posts.map((post) => (
            <div key={post._id} className="d-flex justify-content-center pt-5">
              <div className="card mb-3 announcement-card-item">
                <div className="row g-0">
                  <div className="col-md-4 img-container">
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={require(`../../../server/uploads/announcement/${post.filename}`)}
                      alt=""
                      className="img-fluid rounded-start"
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
        <Bot />
      </>
    );
  }
}

export default Announcement;