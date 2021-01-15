import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBarMain from "./index";
import Home from "../image";
import ImageForm from "../image/ImageForm";
import Image from "../image/Image";

const RouterSetup = ({ token }) => {
  return (
    <Router>
      <NavBarMain token={token} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/upload">
          <ImageForm token={token} />
        </Route>
        <Route path="/images/:_id" children={<Image token={token} />}></Route>
      </Switch>
    </Router>
  );
};

export default RouterSetup;
