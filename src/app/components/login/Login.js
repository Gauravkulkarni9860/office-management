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
    isValid: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      userName: this.state.username,
      password: this.state.password,
    };
    if (this.state.username !== null && this.state.password !== null) {
      this.props.onLogin(credentials);
      // alert("Error: Login Failed...! Incorrect id or password");
    }
    else {
      alert("Please enter username & password");
    }
      
  };

  render() {
    let token = localStorage.getItem("token");
    if (this.props.loginStatus) {
      const generateRandomString = (length = 30) => {
        return Math.random().toString(20).substr(2, length);
      };
      localStorage.setItem("token", JSON.stringify(generateRandomString()));
      return <Redirect to="/dashboard" />;
    } else if (token !== null) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container>
        <Row className="Login">
          <Col sm={4} lg={4}></Col>
          <Col sm={4} lg={4}>
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
                    style={{ marginBottom: "40px" }}
                    name="password"
                    onChange={this.handleChange}
                    error={this.props.isError}
                    helperText={
                      this.props.isError
                        ? "Incorrect username or password"
                        : null
                    }
                  />
                </form>
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
    loginStatus: state.loggedIn,
    isError: state.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (credentials) => dispatch(actionCreator.loginRequest(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
