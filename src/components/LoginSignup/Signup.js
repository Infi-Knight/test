import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FormControl } from 'baseui/form-control';
import { StatefulInput, SIZE } from 'baseui/input';
import { Notification, KIND } from 'baseui/notification';

import SignupStyles from './LoginSignup.module.css';
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
      {error && (
        <Notification closeable kind={KIND.negative}>
          {error}
        </Notification>
      )}
      <form className={SignupStyles.Form}>
        <FormControl label="Username">
          <StatefulInput
            autoFocus
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

        <FormControl label="Confirm password">
          <StatefulInput
            startEnhancer="$"
            type="password"
            onChange={e => setPassword2(e.target.value)}
            value={password2}
            size={SIZE.compact}
          />
        </FormControl>

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
              <i
                style={{ marginRight: '0.5rem' }}
                className="fa fa-user-plus"
                aria-hidden="true"
              />
              Signup
            </button>
          )}
        </Mutation>
      </form>
    </div>
  );
};

export default Signup;
