import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);

    // console.log(newUser);
    // axios
    //   .post("api/user/register", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => this.setState({ errors: err.response.data }));
  }

  render() {
    // const user = this.props.auth.user;
    const errors = this.state.errors;

    return (
      <div className="register">
        {/* <pre>{user ? JSON.stringify(user, null, 2) : false}</pre> */}
        <pre>{errors ? JSON.stringify(errors, null, 2) : false}</pre>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Sign up</h1>
              <p>Create your account</p>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                ></input>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                ></input>
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
