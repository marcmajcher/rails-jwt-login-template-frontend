import React, { useState } from 'react';

const URL = 'http://localhost:3000/things';

export default function AuthDemo({ loggedIn }) {
  const [things, setThings] = useState([]);

  function authorizedFetch() {
    fetch(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((things) => setThings(things));
  }

  function showFetchResponse() {
    if (things.length > 1) {
      return things.map((thing) => {
        return (
          <span key={thing.id}>
            <img alt="thing" src={thing.url} />
          </span>
        );
      });
    } else {
      return (
        <div className="auth-taunt">
          <h2>You need authorization to click that button...</h2>
          <h3>Try all you'd like!</h3>
          {loggedIn ? (
            <h3>Oh wait...You ARE logged in! Give it a whirl!</h3>
          ) : null}
        </div>
      );
    }
  }

  return (
    <div>
      <img alt="authdemo" src="https://i.gifer.com/2Y33.gif" />
      <br />
      <br />
      <button onClick={authorizedFetch}>Click me to fetch</button>
      <br />
      <br />
      {showFetchResponse()}
      {things.length > 1 ? (
        <h1 className="auth-taunt">
          You successfully fetched to an Authorized Path!!
        </h1>
      ) : null}
      <br />
      <br />
    </div>
  );
}
