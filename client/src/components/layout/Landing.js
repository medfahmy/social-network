import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="row">
          <h1>Social Network</h1>
          <p>Create a profile, share posts and connect with people.</p>
          <hr />
          <Link to="/register">Sign up</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default Landing;
