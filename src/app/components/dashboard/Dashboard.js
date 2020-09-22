import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../containers/header/Header";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    
  }

  render() {
    let token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Dashboard;
