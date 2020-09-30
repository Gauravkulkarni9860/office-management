import React from "react";

import { Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./app/components/login/Login";
// import Header from "./app/containers/header/Header";
import Dashboard from "./app/components/dashboard/Dashboard";
import AddOfficer from "./app/components/officer/addOfficer/AddOfficer";
import AddOfficerList from "./app/components/officer/OfficerList";

function App() {
  return (
    <div className="App">
      {/* <div><Header /></div> */}
      <Switch>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/officer/list" exact>
          <AddOfficerList />
        </Route>
        <Route path="/officer/create" exact>
          <AddOfficer />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
