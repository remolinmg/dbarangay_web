import React, { Component } from 'react';
import axios from 'axios';
import Official1 from "../user-components/assets/img/Official1.jpg";
import Official2 from "../user-components/assets/img/Official2.jpg";
import Official3 from "../user-components/assets/img/Official3.jpg";
import Official4 from "../user-components/assets/img/Official4.jpg";
import Official5 from "../user-components/assets/img/Official5.jpg";
import Official6 from "../user-components/assets/img/Official6.jpg";
import Official7 from "../user-components/assets/img/Official7.jpg";
import Official8 from "../user-components/assets/img/Official8.jpg";
import Official9 from "../user-components/assets/img/Official9.jpg";
import Official10 from "../user-components/assets/img/Official10.jpg";
import Official11 from "../user-components/assets/img/Official11.jpg";



class BrgyOfficial extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    // Fetch posts from your API using Axios
    axios.get('http://localhost:8000/get/official') // Update the endpoint
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  render() {
    return (
      <div className='officials' id='officials'>

        <div style={{ padding: '20px' }}>
          <h2 style={{ textAlign: 'center', color: '#0060AD', fontWeight: 'bold' }}>
            BARANGAY HARAPIN ANG BUKAS COUNCIL
          </h2>
          <p style={{ textAlign: 'center', color: '#0060AD', fontWeight: 'bold' }}>
            Description about barangay officials goes here.
          </p>


          {/* <div className="d-flex flex-wrap justify-content-evenly">
            {this.state.posts.map((post, index) => (
              <div key={post._id} className={`official-lists text-center ${index === 0 ? 'first-row' : 'other-rows'}`}>
                <img className="rounded-circle official-list" src={require(`../../../server/uploads/official/${post.filename}`)} />
                <h4 className="official-name">{post.firstName} {post.middleName} {post.lastName}</h4>
                <p className="official-title">{post.position}</p>
              </div>
            ))}
          </div> */}

        </div>
      </div>
    );
  }
};

export default BrgyOfficial;