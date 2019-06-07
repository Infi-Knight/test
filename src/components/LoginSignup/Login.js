import React, { useState, useContext } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { FormControl } from 'baseui/form-control';
import { StatefulInput, SIZE } from 'baseui/input';
import { Notification, KIND } from 'baseui/notification';
import { StatefulCheckbox } from 'baseui/checkbox';
import { Spinner } from 'baseui/spinner';

import LoginStyles from './LoginSignup.module.css';
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
    if (!(password || username)) {
      setError('Invalid credentials');
    } else {
      setLoggingIn(true);
      // ApolloConsumer doesn't provide any error handling
      client
        .query({
          query: adminChecked ? ADMIN_LOGIN_QUERY : REVIEWER_LOGIN_QUERY,
          variables: { input: { username } },
        })
        .then(queryResult => _handleLogin(queryResult))
        .catch(() => _handleLoginError());
    }
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
    setError('User not found');
  };

  return (
    <div>
      <ApolloConsumer>
        {client => (
          <div>
            {loggingIn && <Spinner />}
            {error && (
              <Notification
                autoHideDuration={1000}
                closeable
                kind={KIND.negative}
              >
                {error}
              </Notification>
            )}
            <form
              className={LoginStyles.Form}
              onSubmit={e => _handleSubmit(e, client)}
            >
              <FormControl label="Username">
                <StatefulInput
                  startEnhancer="@"
                  type="text"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  size={SIZE.compact}
                />
              </FormControl>

              <FormControl label="Password">
                <StatefulInput
                  startEnhancer="$"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  size={SIZE.compact}
                />
              </FormControl>

              <FormControl label="Admin ?">
                <StatefulCheckbox
                  checked={adminChecked ? true : false}
                  onChange={() => setAdminChecked(!adminChecked)}
                />
              </FormControl>

              <button type="submit">
                <i
                  style={{ marginRight: '0.5rem' }}
                  className="fa fa-sign-in"
                  aria-hidden="true"
                />{' '}
                Login
              </button>
            </form>
          </div>
        )}
      </ApolloConsumer>
    </div>
  );
};

export default Login;
