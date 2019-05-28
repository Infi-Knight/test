import React, { useState, useContext } from 'react';
import AuthContext from '../Auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [login, setLogin] = useState(true);
  const [error, setError] = useState('');

  const { authenticated, setAuthenticated } = useContext(AuthContext);

  async function _handleSubmit(e) {
    e.preventDefault();
    if (!login) {
      if (password !== password2) {
        setError('Passwords do not match');
      }
      // TODO: Signup logic
    } else {
      // TODO login logic
    }
  }

  return (
    <div>
      <h4>{login ? 'Login' : 'Signup'}</h4>
      <h5>{error}</h5>
      <form onSubmit={_handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={e => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </div>

        {!login && (
          <div>
            <label htmlFor="password2">Confirm Password:</label>
            <input
              onChange={e => setPassword2(e.target.value)}
              type="password"
              id="password2"
              name="password2"
            />
          </div>
        )}

        <button onClick={e => setLogin(!login)}>
          {login ? 'Need a new account ?' : 'Already signed up ?'}
        </button>
        <button type="submit"> {login ? 'Login' : 'Signup'} </button>
      </form>
    </div>
  );
}

export default Login;
