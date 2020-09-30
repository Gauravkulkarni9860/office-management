import React, { Component } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Login.css";
import logo from "../../assests/images.png";
import * as actionCreator from "../../store/actions/index";
import Input from "../../containers/UI/Input/Input";
import Button from "../../containers/UI/Button/Button";
import { checkValidity } from "../../utils/auth";
import { setToken } from "../../utils/token";

class Login extends Component {
  state = {
    controls: {
      username: {
        type: "text",
        placeholder: "Username",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        type: "password",
        placeholder: "Password",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = (e, formId) => {
    const formUpdate = {
      ...this.state.controls,
    };
    const updatedElement = {
      ...formUpdate[formId],
    };
    updatedElement.value = e.target.value;
    updatedElement.touched = true;
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    formUpdate[formId] = updatedElement;
    let formIsValid = true;
    for (let inputIdentifier in formUpdate) {
      formIsValid = formUpdate[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: formUpdate, formIsValid: formIsValid });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {};
    for (let formElementIdentifier in this.state.controls) {
      loginData[formElementIdentifier] = this.state.controls[
        formElementIdentifier
      ].value;
    }
    this.props.onLogin(loginData);
  };

  render() {
    let token = localStorage.getItem("token");
    if (this.props.loginStatus) {
      setToken(this.props.loginDetail.accessToken);
      return <Redirect to="/dashboard" />;
    } else if (token !== null) {
      return <Redirect to="/dashboard" />;
    }

    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.handleSubmit}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            type={formElement.config.type}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            placeholder={formElement.config.placeholder}
            changed={(e) => this.inputChangeHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Login
        </Button>
      </form>
    );

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
                {form}
                <p hidden={!this.props.isError} style={{ color: "red" }}>
                  {this.props.isError ? "Incorrect username or password" : null}
                </p>
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
    loginDetail: state.loginReducer.login,
    loginStatus: state.loginReducer.loggedIn,
    isError: state.loginReducer.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (loginData) => dispatch(actionCreator.loginRequest(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
