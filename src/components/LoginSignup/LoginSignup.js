import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

import LoginSignupStyles from './LoginSignup.module.css';

function LoginSignup(props) {
  const [login, setLogin] = useState(true);

  return (
    <div className={LoginSignupStyles.Container}>
      {login ? (
        <Login history={props.history} />
      ) : (
        <Signup history={props.history} />
      )}
      <div>
        <button
          className={LoginSignupStyles.QuestionButton}
          onClick={() => setLogin(!login)}
        >
          {login ? 'Need a new account ?' : 'Already signed up ?'}
        </button>
      </div>
    </div>
  );
}

export default LoginSignup;
