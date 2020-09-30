import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../containers/header/Header";

class Dashboard extends Component {
  state = {};

  componentDidMount() {}
  handleSubmit = () => {
    console.log("welcome");
  };

  render() {
    let token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header />
        <form style={{ marginTop: "5%" }}>
          <p>Welcome to Dashboard</p>
        </form>
      </div>
    );
  }
}

export default Dashboard;
