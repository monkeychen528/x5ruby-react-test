import React from 'react';
import './App.css';
import 'bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Content from './components/Content';
import Contacts from './components/Contacts';
import RamenMap from './components/RamenMap';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/ramenMap" component={RamenMap} />

      </Switch>
    </Router>
  );
}

export default App;
