import React from 'react';
import './App.css';
import 'bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Content from './components/Content';
import Contacts from './components/Contacts';
import MapIndex from './components/MapIndex';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/ramenMap" component={MapIndex} />

      </Switch>
    </Router>
  );
}

export default App;
