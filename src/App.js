import React from "react";

import { Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./app/components/login/Login";
// import Header from "./app/containers/header/Header";
import Dashboard from "./app/components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <div>{/* <Header /> */}</div>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
