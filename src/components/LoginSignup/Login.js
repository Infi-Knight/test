import React, { useState } from 'react';
// import gql from 'graphql-tag';

// const REVIEWER_LOGIN_QUERY = gql`
//   query reviewerLogin($input: ReviewerWhereUniqueInput!) {
//     reviewer(where: $input) {
//       username
//       id
//       posts {
//         title
//         body
//         image
//       }
//     }
//   }
// `;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const _handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <h4>{error}</h4> */}
      <form onSubmit={_handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoFocus
            onChange={e => setUsername(e.target.value)}
            id="username"
            value={username}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="password"
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
