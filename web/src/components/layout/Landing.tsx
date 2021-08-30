import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("dashboard");
    }
  }

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
