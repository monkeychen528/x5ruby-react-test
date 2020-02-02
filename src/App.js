import React from 'react';
import './App.css';
import 'bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Content from './components/Content';
import Contacts from './components/Contacts';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/onlineLesson" />
        <Route exact path="/camping" />
        <Route exact path="/quickstartLesson" />
        <Route exact path="/projectDev" />
        <Route exact path="/componyTrain" />
        <Route exact path="/buySpace" />
        <Route exact path="/news" />
      </Switch>
    </Router>
  );
}

export default App;
