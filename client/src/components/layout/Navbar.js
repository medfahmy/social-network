import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
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
                <Link to="profiles"> Developers</Link>
              </li>
            </ul>

            <ul>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
