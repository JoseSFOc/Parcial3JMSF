import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBarMain from "./index";
import Login from "../login";
import Home from "../template";
import Table from "../template/Table";
import Form from "../template/Form";
import Template from "../template/Template";
import Map from "../map";

const RouterSetup = () => {
  return (
    <Router>
      <NavBarMain />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/tables">
          <Table />
        </Route>
        <Route path="/form">
          <Form />
        </Route>
        <Route path="/templates/:_id" children={<Template />}></Route>
        <Route path="/map" children={<Map />} />
      </Switch>
    </Router>
  );
};

export default RouterSetup;
