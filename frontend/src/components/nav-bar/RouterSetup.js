import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBarMain from "./index";
import Home from "../home";
import Table from "../template/Table";
import Form from "../template/Form";
import Template from "../template/Template";

const RouterSetup = () => {
  return (
    <Router>
      <NavBarMain />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/tables">
          <Table />
        </Route>
        <Route exact path="/form">
          <Form />
        </Route>
        <Route path="/templates/:_id" children={<Template />}></Route>
      </Switch>
    </Router>
  );
};

export default RouterSetup;
