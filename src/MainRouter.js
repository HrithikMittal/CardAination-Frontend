import React from "react";
import { Route, Switch } from "react-router-dom";

import Menu from "./core/Menu";
import Home from "./core/Home";
import Signup from "./User/Signup";
import Signin from "./User/Signin";
import Profile from "./User/Profile";
import Users from "./User/Users";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/users" component={Users}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route path="/user/:userId" component={Profile}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
