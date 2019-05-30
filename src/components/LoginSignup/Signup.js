import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import AuthContext from '../Auth';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($input: ReviewerCreateInput!) {
    createReviewer(data: $input) {
      username
      id
    }
  }
`;

const Signup = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const { setAuthenticated } = useContext(AuthContext);

  const _validateForm = signupMutation => {
    if (!password || !password2 || password !== password2) {
      setError('Password error');
      setPassword('');
      setPassword2('');
    } else {
      signupMutation();
    }
  };

  const _handleGraphQlError = () => {
    setError('An error occured during signup, try using a different username');
    setUsername('');
    setPassword('');
    setPassword2('');
  };

  return (
    <div>
      <h1>Signup</h1>
      <h4>{error}</h4>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            autoFocus
            onChange={e => setUsername(e.target.value)}
            type="text"
            id="username"
            value={username}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
          />
        </div>

        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input
            onChange={e => setPassword2(e.target.value)}
            type="password"
            id="password2"
            value={password2}
          />
        </div>

        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={{ input: { username, password, status: 'PUBLISHED' } }}
          onError={() => _handleGraphQlError()}
          onCompleted={data => {
            setAuthenticated(data.createReviewer.id);
            props.history.push('/dashboard');
          }}
        >
          {signupMutation => (
            <button
              type="submit"
              onClick={e => {
                e.preventDefault();
                _validateForm(signupMutation);
              }}
            >
              Signup
            </button>
          )}
        </Mutation>
      </form>
    </div>
  );
};

export default Signup;
