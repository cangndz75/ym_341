import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Admin from "./components/pages/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Add from "./components/meetings/Add";
import Edit from "./components/meetings/Edit";
import View from "./components/meetings/View";
import User from "./components/pages/User";
import Login from "./components/pages/Login";
import Privateroute from "./private";
import Adminroute from "./admin";

import Register from "./components/pages/Register";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Privateroute path="/user" exact component={User} />
        <Adminroute path="/admin" exact component={Admin} sensitive />
        <Adminroute path="/admin/Add" exact component={Add} />
        <Adminroute path="/admin/Edit/:id" exact component={Edit} />
        <Adminroute path="/admin/View/:id" exact component={View} />
      </Switch>
    </Router>
  );
}

export default App;
