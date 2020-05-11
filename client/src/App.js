import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Routes from './components/routing/Routes'




const App = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route component={Routes}/>
        </Switch>
      </Fragment>
    </Router>
)};


export default App;
