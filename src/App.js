import React, { Component } from "react";
import "./App.css";
import SignUp from "./signup";
import Login from "./login";
import Home from "./home";
import AuthDemo from "./authdemo";

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    user: {},
    loggedIn: false,
  };

  setCurrentUser = (user) => {
    this.setState({
      user: user,
      loggedIn: true,
    });
  };

  logOut = () => {
    this.setState({ user: {}, loggedIn: false });
    localStorage.token = "";
  };

  displayGreeting = () => {
    if (this.state.loggedIn) {
      return (
        <h1 className="greeting-text">
          Welcome back {this.state.user.username}!
        </h1>
      );
    } else {
      return (
        <div className="please-log-in">
          <h2>I'm sorry, I don't know who you are...</h2>
          <h3>Please log in below!</h3>
        </div>
      );
    }
  };

  componentDidMount = () => {
    let token = localStorage.token;
    if (typeof token !== "undefined" && token.length > 1) {
      this.tokenLogin(token);
    } else {
      console.log("No token found, try logging in!");
    }
  };

  tokenLogin = (token) => {
    fetch("http://localhost:3000/auto_login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((r) => r.json())
      .then((user) => this.setCurrentUser(user));
  };

  render() {
    return (
      <div className="main-div">
        {this.displayGreeting()}
        <BrowserRouter>
          <Link className="pretty-link" to="/login">
            Login
          </Link>
          <span className="pretty-link">---||||---</span>
          <Link className="pretty-link" to="/signup">
            SignUp
          </Link>
          <br />
          {this.state.loggedIn ? (
            <span className="pretty-link">
              <br />
              <button onClick={this.logOut}>Log Out</button>
            </span>
          ) : null}
          <br />
          <Link className="pretty-link" to="/">
            Home (Click here if you are lost)
          </Link>
          <br />
          <Link className="pretty-link" to="/auth">
            Auth Check{" "}
            {!this.state.loggedIn
              ? "(Works better if you're logged in!)"
              : "(Try it now you're logged in!)"}
          </Link>{" "}
          <br />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login setCurrentUser={this.setCurrentUser} />
              )}
            </Route>

            <Route exact path="/signup">
              {this.state.loggedIn ? <Redirect to="/" /> : <SignUp />}
            </Route>

            <Route exact path="/auth">
              <AuthDemo loggedIn={this.state.loggedIn} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
