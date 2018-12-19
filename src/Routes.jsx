import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import ShowTenants from './ShowTenants';
import SearchResults from './SearchResults';


const Routes = (
  <Router>
    <Switch>
      <Route exact={true} path="/" component={ShowTenants}/>
      <Route exact path= "/lease/:id" component={SearchResults} />
    </Switch>
  </Router>
);

export default Routes
