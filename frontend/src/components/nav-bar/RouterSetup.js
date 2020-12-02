import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBarMain from "./index";
import Home from "../home";

const RouterSetup = () => {
  return (
    <Router>
      <NavBarMain />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterSetup;
