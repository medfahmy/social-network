import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Login</h1>
              <p>Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
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
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
