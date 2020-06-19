import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import AddImagePage from '../../pages/AddImagePage/AddImagePage'
import EditImagePage from '../../pages/EditImagePage/EditImagePage'
import ViewImagePage from '../../pages/ViewImagePage/ViewImagePage'
import ListImagePage from '../../pages/ListImagePage/ListImagePage'
import './App.css';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <ListImagePage />
          </Route>
          <Route path="/add">
            <AddImagePage />
          </Route>
          <Route path="/edit/:id">
            <EditImagePage />
          </Route>
          <Route path="/view/:id">
            <ViewImagePage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
