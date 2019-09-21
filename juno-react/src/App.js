// @flow

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Trainer from "./pages/Trainer";
import Trainee from "./pages/Trainee";
import ARView from "./components/ARView";

export const Paths = {
  HOME: "/",
  ABOUT: "/about",
  TRAINER: "/trainer",
  TRAINEE: "/trainee"
};

const App = () => (
  <Router>
    <Route path={Paths.HOME} exact component={Home} />
    <Route path={Paths.ABOUT} exact component={About} />
    <Route path={Paths.TRAINER} exact component={Trainer} />
    <Route path={Paths.TRAINEE} exact component={Trainee} />
    <Route path="/ar" exact component={ARView} />
  </Router>
);

export default App;
