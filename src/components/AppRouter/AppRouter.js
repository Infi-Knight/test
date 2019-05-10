import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import history from '../../utils/history';

import Auth from '../../Auth';

import Home from '../Home';
import Error404 from '../Error404';
import AuthCallback from '../AuthCallback';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const AppRouter = () => (
  <Router history={history}>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/authcallback"
          render={props => {
            handleAuthentication(props);
            return <AuthCallback {...props} />;
          }}
        />
        <Route component={Error404} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
