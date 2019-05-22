import React from 'react';
import { AUTH_TOKEN } from '../../constants';

class Login extends React.Component {
  state = {
    login: true,
    username: '',
    password: '',
  };

  componentDidMount() {
    console.log('Login', this.state.login);
  }

  componentDidUpdate() {
    console.log('Login', this.state.login);
  }

  render() {
    const { login, username, password } = this.state;
    return (
      <div>
        <h4>{login ? 'Login' : 'Signup'}</h4>
        <div>
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username"
          />

          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>

        <div>
          <button onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </button>
          <button onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </div>
    );
  }

  _confirm = async () => {
    console.log('confirmed');
    console.log('Login: ', this.state.login);
  };

  _saveUserData = username => {
    localStorage.setItem(AUTH_TOKEN, username);
  };
}

export default Login;
