import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

const Navbar = ({ clearCurrentProfile, logoutUser, auth }) => {
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    clearCurrentProfile();
    logoutUser();
    history.push("/login");
  };

  const { isAuthenticated, user } = auth;

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">dashboard</Link>
      </li>
      <li>
        <Link to="/feed">post feed</Link>
      </li>
      <li>
        <a href="a" onClick={handleLogout}>
          Log out
        </a>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: "25px", marginRight: "5px" }}
        ></img>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <div>
        <Link to="/">Social Network</Link>
        <button>
          <span />
        </button>

        <div>
          <ul>
            <li>
              <Link to="profiles"> Profiles</Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
