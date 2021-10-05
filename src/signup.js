import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [created, setCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function createUser(event) {
    event.preventDefault();
    event.target.reset();

    let user = {
      username,
      email,
      password,
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.status === 'created') {
          setCreated(true);
          setErrorMessage('');
        }
      })
      .catch((response) =>
        setErrorMessage(
          "Uh-oh! It didn't work...Make sure your server is running!"
        )
      );
  }

  return (
    <div>
      {created ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <div className="please-log-in">
            <p>{errorMessage}</p>
          </div>
          <br />
          <form onSubmit={createUser}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
