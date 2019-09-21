// @flow

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Trainer from "./pages/Trainer";
import Trainee from "./pages/Trainee";

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/trainer/" component={Trainer} />
    <Route path="/trainee/" component={Trainee} />
  </Router>
);

export default App;
