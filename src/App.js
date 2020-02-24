import React from 'react';
import './asset/App.css';
import 'bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ContentIndex from './components/ContentIndex';
import Contacts from './components/Contacts';
import MapIndex from './components/MapIndex';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContentIndex} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/ramenMap" component={MapIndex} />
      </Switch>
    </Router>
  );
}

export default App;
