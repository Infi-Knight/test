import React, { useState, useContext } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import AuthContext from '../Auth';

const REVIEWER_LOGIN_QUERY = gql`
  query reviewerLoginQuery($input: ReviewerWhereUniqueInput!) {
    reviewer(where: $input) {
      password
      id
    }
  }
`;

const ADMIN_LOGIN_QUERY = gql`
  query adminLoginQuery($input: AdminWhereUniqueInput!) {
    admin(where: $input) {
      password
      id
    }
  }
`;

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [adminChecked, setAdminChecked] = useState(false);
  const { setAuthenticated, setScope } = useContext(AuthContext);

  const _handleSubmit = (e, client) => {
    e.preventDefault();
    setLoggingIn(true);
    // ApolloConsumer doesn't provide any error handling
    client
      .query({
        query: adminChecked ? ADMIN_LOGIN_QUERY : REVIEWER_LOGIN_QUERY,
        variables: { input: { username } },
      })
      .then(queryResult => _handleLogin(queryResult))
      .catch(() => _handleLoginError());
  };

  const _handleLogin = queryResult => {
    const { loading, data } = queryResult;
    if (loading) {
      setLoggingIn(true);
    } else {
      if (data) {
        setLoggingIn(false);
        const user = adminChecked ? data.admin : data.reviewer;
        const returnedPassword = user.password;
        if (returnedPassword === password) {
          setAuthenticated(user.id);
          setScope(adminChecked ? 'admin' : 'reviewer');
          props.history.push('/dashboard');
        } else {
          setError('Invalid credentials');
          setUsername('');
          setPassword('');
        }
      }
    }
  };

  const _handleLoginError = () => {
    setLoggingIn(false);
    setError('Error logging in: check your credentials and network connection');
    setPassword('');
  };

  return (
    <div>
      <ApolloConsumer>
        {client => (
          <div>
            <h1>Login</h1>
            {loggingIn && <h4>Logging...</h4>}
            <h4>{error}</h4>
            <form onSubmit={e => _handleSubmit(e, client)}>
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

              <div>
                <label htmlFor="scope">Login as admin?</label>
                <input
                  onChange={() => setAdminChecked(!adminChecked)}
                  type="checkbox"
                  id="scope"
                  checked={adminChecked ? true : false}
                />
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </ApolloConsumer>
    </div>
  );
};

export default Login;
