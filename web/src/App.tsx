import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile/ProfileForm";
import Profiles from "./profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/post/Posts";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user data and expiration date
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // clear current profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={ProfileForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={ProfileForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              {/* <Route exact path ="not-found" component={NotFound}/> */}
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
