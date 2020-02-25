import React from 'react';
import './asset/App.css';
import 'bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ContentIndex from './components/ContentIndex';
import Contacts from './components/Contacts';
import MapIndex from './components/MapIndex';
import Comment from './components/Comment';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContentIndex} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/ramenMap" component={MapIndex} />
        <Route exact path="/comment" component={Comment} />
      </Switch>
    </Router>
  );
}

export default App;
