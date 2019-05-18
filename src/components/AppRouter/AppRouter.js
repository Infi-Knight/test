import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Home from '../Home';
import Error404 from '../Error404';
const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route component={Error404} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
