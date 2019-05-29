import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../../history';
import Header from '../Header';
import Home from '../Home';
import PrivateRoute from '../Auth/PrivateRoute';
import Dashboard from '../Dashboard';
import LoginSignup from '../LoginSignup';
import Error404 from '../Error404';

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginSignup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={Error404} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
