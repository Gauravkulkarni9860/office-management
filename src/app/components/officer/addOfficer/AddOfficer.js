import React, { Component } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";

import Input from "../../../containers/UI/Input/Input";
import Button from "../../../containers/UI/Button/Button";
import Header from "../../../containers/header/Header";
import "./AddOfficer.css";
import { checkValidity } from "../../../utils/auth";
import * as actionCreator from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

class AddOfficer extends Component {
  state = {
    addOfficerForm: {
      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name",
        },
        value: "",
        validation: {
          required: true,
          isTextOnly: true,
        },
        valid: false,
        touched: false,
      },
      middleName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Middle Name",
        },
        value: "",
        validation: {
          required: false,
          isTextOnly: true,
        },
        valid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Last Name",
        },
        value: "",
        validation: {
          required: true,
          isTextOnly: true,
        },
        valid: false,
        touched: false,
      },
      mobileNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Mobile Number",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 10,
          maxLength: 10,
        },
        valid: false,
        touched: false,
      },
      dateOfBirth: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Date Of Birth",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: false,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      gender: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "Select Gender" },
            { value: "male", displayValue: "Male" },
            { value: "female", displayValue: "Female" },
            { value: "other", displayValue: "Other" },
          ],
          placeholder: "Gender",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      department: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "", displayValue: "Select Department" }],
          placeholder: "Department",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      designation: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Designation",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      cast: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "", displayValue: "Select Cast" }],
          placeholder: "Cast",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      subcast: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "", displayValue: "Select Subcast" }],
          placeholder: "Sub Cast",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSubmit: false,
  };

  inputChangeHandler = (e, formId) => {
    const formUpdate = {
      ...this.state.addOfficerForm,
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

    let subCast = this.props.subCastList.find(
      (item) => item.name === updatedElement.value
    );

    if (subCast !== undefined) {
      let option = subCast.subcast.map((cast) => {
        return { value: cast.name, displayValue: cast.name };
      });
      formUpdate["subcast"].elementConfig.options = [
        { value: "none", displayValue: "Select Subcast" },
      ].concat(option);
    }

    formUpdate[formId] = updatedElement;
    let formIsValid = true;
    for (let inputIdentifier in formUpdate) {
      formIsValid = formUpdate[inputIdentifier].valid && formIsValid;
    }
    this.setState({ addOfficerForm: formUpdate, formIsValid: formIsValid });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    console.log("update");
    const formData = {
      ...this.state.addOfficerForm,
    };

    const subCast = this.props.subCastList.find(
      (item) => item.name === formData.cast.value
    );

    let updatedData = {
      firstName: formData.firstName.value,
      middleName: formData.middleName.value,
      lastName: formData.lastName.value,
      phone: formData.mobileNumber.value,
      dob: formData.dateOfBirth.value,
      email: formData.email.value,
      gender: formData.gender.value,
      department: this.props.departmentList.find(
        (value) => value.name === formData.department.value
      ),
      designation: formData.designation.value,
      cast: this.props.castList.find(
        (value) => value.name === formData.cast.value
      ),
      subcast: subCast.subcast?.find(
        (value) => value.name === formData.subcast.value
      ),
    };
    let token = localStorage.getItem("token");
    this.props.updateData(
      this.props.editData.id,
      JSON.parse(token),
      updatedData
    );
    this.setState({ isSubmit: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...this.state.addOfficerForm,
    };

    const subCast = this.props.subCastList.find(
      (item) => item.name === formData.cast.value
    );

    let officerData = {
      firstName: formData.firstName.value,
      middleName: formData.middleName.value,
      lastName: formData.lastName.value,
      phone: formData.mobileNumber.value,
      dob: formData.dateOfBirth.value,
      email: formData.email.value,
      gender: formData.gender.value,
      department: this.props.departmentList.find(
        (value) => value.name === formData.department.value
      ),
      designation: formData.designation.value,
      cast: this.props.castList.find(
        (value) => value.name === formData.cast.value
      ),
      subcast: subCast.subcast?.find(
        (value) => value.name === formData.subcast.value
      ),
    };

    let token = localStorage.getItem("token");
    this.props.addOfficer(officerData, JSON.parse(token), this.props.isEdit);
    this.setState({ isSubmit: true });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.fetchDepartment(JSON.parse(token));
    this.props.fetchCasts(JSON.parse(token));
  }

  
  componentDidUpdate() {
    const formEdit = {
      ...this.state.addOfficerForm,
    };

    console.log(Date.parse(this.props.editData?.dob));

    if (this.props.isEdit) {
      formEdit["firstName"].value = this.props.editData.firstName;
      formEdit["middleName"].value = this.props.editData.middleName;
      formEdit["lastName"].value = this.props.editData.lastName;
      formEdit["mobileNumber"].value = this.props.editData.phone;
      formEdit["gender"].value = this.props.editData.gender;
      // formEdit["dateOfBirth"].value = this.props.editData.dob;
      formEdit["email"].value = this.props.editData.email;
      formEdit["department"].value = this.props.editData.department?.name;
      formEdit["designation"].value = this.props.editData.designation;
      formEdit["cast"].value = this.props.editData.cast?.name;
      formEdit["subcast"].value = this.props.editData.subcast?.name;
    }

    const formUpdate = {
      ...this.state.addOfficerForm,
    };
    let departmentOption = this.props.departmentList.map((department) => {
      return { value: department.name, displayValue: department.name };
    });
    formUpdate["department"].elementConfig.options = [
      { value: "none", displayValue: "Select Department" },
    ].concat(departmentOption);

    let castOption = this.props.castList.map((cast) => {
      return { value: cast.name, displayValue: cast.name };
    });

    formUpdate["cast"].elementConfig.options = [
      { value: "none", displayValue: "Select Cast" },
    ].concat(castOption);
  }

  render() {
    if (this.state.isSubmit) {
      return <Redirect to="/officer/list" />;
    }

    const formElementArray = [];
    for (let key in this.state.addOfficerForm) {
      formElementArray.push({
        id: key,
        config: this.state.addOfficerForm[key],
      });
    }

    let form = (
      <form>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            label={formElement.config.elementConfig.placeholder}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(e) => this.inputChangeHandler(e, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.props.isEdit ? this.handleUpdate : this.handleSubmit}
          disabled={this.props.isEdit ? false : !this.state.formIsValid}
        >
          {this.props.isEdit ? "Update Officer" : "Add Officer"}
        </Button>
        <Button btnType="Danger">Cancel</Button>
      </form>
    );

     

    return (
      <div>
        <Header />
        <Container>
          <Row className="Header">
            <p>Add Officer</p>
          </Row>
          <Row>
            <Col className="Content">
              <Card>
                <Card.Header as="h6" style={{ textAlign: "left" }}>
                  Officer Entry
                </Card.Header>
                <Card.Body>{form}</Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    departmentList: state.fetchAPI.department,
    castList: state.fetchAPI.casts,
    subCastList: state.fetchAPI.subCast,
    editData: state.officer.editData,
    isEdit: state.officer.isEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepartment: (token) => dispatch(actionCreator.fetchDepartment(token)),
    fetchCasts: (token) => dispatch(actionCreator.fetchCasts(token)),
    addOfficer: (officerData, token, isEdit) =>
      dispatch(actionCreator.submitOfficerRequest(officerData, token)),
      updateData : (id, token, data) => dispatch(actionCreator.updloadEditedData(id, token, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOfficer);
