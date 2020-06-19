import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <div>1</div>
          </Route>
          <Route path="/about">
            <div>2</div>
          </Route>
          <Route path="/dashboard">
            <div>3</div>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
