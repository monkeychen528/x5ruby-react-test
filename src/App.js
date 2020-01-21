import React from "react";
import "./App.css";
import "bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Content from "./components/Content";
import Contacts from "./components/Contacts";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Content}></Route>
        <Route exact path="/contacts" component={Contacts}></Route>
        <Route exact path="/onlineLesson"></Route>
        <Route exact path="/camping"></Route>
        <Route exact path="/quickstartLesson"></Route>
        <Route exact path="/projectDev"></Route>
        <Route exact path="/componyTrain"></Route>
        <Route exact path="/buySpace"></Route>
        <Route exact path="/news"></Route>
      </Switch>
    </Router>
  );
}

export default App;
