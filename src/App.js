import React, { useEffect, useState } from 'react';
import './App.css';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import AuthDemo from './ZAuthDemo';

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  function setCurrentUser(currentUser) {
    setUser(currentUser);
    setLoggedIn(true);
  }

  function logOut() {
    setUser({});
    setLoggedIn(false);
    localStorage.token = '';
  }

  useEffect(() => {
    const token = localStorage.token;
    if (typeof token !== 'undefined' && token.length > 1
      && token !== 'undefined'
    ) {
      fetch('http://localhost:3000/auto_login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((user) => setCurrentUser(user));
    } else {
      console.log('No token found, try logging in!');
    }
  }, []);

  return (
    <div className="main-div">
      {loggedIn ? (
        <h1 className="greeting-text">Welcome back {user.username}!</h1>
      ) : (
        <div className="please-log-in">
          <h2>I'm sorry, I don't know who you are...</h2>
          <h3>Please log in below!</h3>
        </div>
      )}

      <BrowserRouter>
        <Link to="/login">Login</Link>
        <span>---||||---</span>
        <Link to="/signup">SignUp</Link>
        <br />
        {loggedIn ? (
          <span>
            <br />
            <button onClick={logOut}>Log Out</button>
          </span>
        ) : null}
        <br />
        <Link to="/">Home (Click here if you are lost)</Link>
        <br />
        <Link to="/auth">
          Auth Check{' '}
          {!loggedIn
            ? "(Works better if you're logged in!)"
            : "(Try it now you're logged in!)"}
        </Link>{' '}
        <br />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login setCurrentUser={setCurrentUser} />
            )}
          </Route>

          <Route exact path="/signup">
            {loggedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>

          <Route exact path="/auth">
            <AuthDemo loggedIn={loggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
