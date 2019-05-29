import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function LoginSignup(props) {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <button onClick={e => setLogin(!login)}>
        {login ? 'Need a new account ?' : 'Already signed up ?'}
      </button>
      {login ? (
        <Login history={props.history} />
      ) : (
        <Signup history={props.history} />
      )}
    </div>
  );
}

export default LoginSignup;
