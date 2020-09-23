import React, { Component } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Login.css";
import logo from "../../assests/images.png";
import * as actionCreator from "../../store/actions/index";

class Login extends Component {
  state = {
    username: null,
    password: null,
    isEmpty: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username !== null && this.state.password !== null) {
      this.props.onLogin(this.state.username, this.state.password);
    } else {
      // alert("Please enter username & password");
      this.props.onLoginFail();
      this.setState({ isEmpty: true });
    }
  };

  render() {
    let token = localStorage.getItem("token");
    if (this.props.loginStatus) {
      localStorage.setItem(
        "token",
        JSON.stringify(this.props.loginDetail.accessToken)
      );
      return <Redirect to="/dashboard" />;
    } else if (token !== null) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container>
        <Row>
          <Col sm={4} lg={4}></Col>
          <Col sm={4} lg={4} className="Login">
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title className="mb-4">
                  Office Management System
                </Card.Title>
                <Card.Subtitle className="mb-4">
                  <Card.Img
                    src={logo}
                    style={{
                      borderRadius: "45%",
                      marginBottom: "40px",
                      height: "100px",
                      width: "100px",
                    }}
                  />
                </Card.Subtitle>
                <form>
                  <TextField
                    type="text"
                    label="Username"
                    style={{ marginBottom: "20px" }}
                    name="username"
                    onChange={this.handleChange}
                    error={this.props.isError}
                  />
                  <TextField
                    type="password"
                    label="Password"
                    style={{ marginBottom: "20px" }}
                    name="password"
                    onChange={this.handleChange}
                    error={this.props.isError}
                  />
                </form>
                <p hidden={!this.props.isError} style={{ color: "red" }}>
                  {this.props.isError && !this.state.isEmpty
                    ? "Incorrect username or password"
                    : "please enter data in fields"}
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "40px" }}
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4} lg={4}></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginDetail: state.login,
    loginStatus: state.loggedIn,
    isError: state.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userName, password) =>
      dispatch(actionCreator.loginRequest(userName, password)),
    onLoginFail: () => dispatch(actionCreator.loginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
