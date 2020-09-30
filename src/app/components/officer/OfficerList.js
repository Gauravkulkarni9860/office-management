import React, { Component } from "react";

import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import Delete from "@material-ui/icons/Delete";
import InfoRounded from "@material-ui/icons/InfoRounded";
import ArrowRight from "@material-ui/icons/ArrowRight";
// import MoreVert from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";

import "./OfficerList.css";
import Header from "../../containers/header/Header";
import * as actionCreator from "../../store/actions/index";
// import Input from "../../containers/UI/Input/Input";

class OfficerList extends Component {
  state = {
    edit: false,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.fetchAdhikariList(JSON.parse(token));
    this.props.fetchOfficerCount(JSON.parse(token));
  }

  deleteItem = (e, id) => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    this.props.deleteRecord(id, token);
  };

  editItem = (e, id) => {
    // console.log(id);
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    this.props.editRecord(id, token);
    this.setState({edit : true})
  };

  render() {
    if(this.state.edit) {
      return <Redirect to="/officer/create" />
    }
    const table = (
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.officerList.map((officer) => (
            <tr key={officer.id}>
              <td>
                <ArrowRight />
              </td>
              <td>{officer.firstName + " " + officer.lastName}</td>
              <td>{officer.phone}</td>
              <td>{officer.email}</td>
              <td>{officer?.department?.name}</td>
              <td>{officer.designation}</td>
              {officer.recordStatus !== "DELETED" ? (
                <td>
                  <Tooltip title="Edit" placement="right">
                    <Button
                      variant="outline-primary"
                      onClick={(e) => this.editItem(e, officer.id)}
                    >
                      <CreateOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete" placement="right">
                    <Button
                      variant="outline-primary"
                      onClick={(e) => this.deleteItem(e, officer.id)}
                    >
                      <Delete />
                    </Button>
                  </Tooltip>
                </td>
              ) : (
                <td>
                  <InfoRounded /> Deleted
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <div>
        <Header />
        <div>
          <div className="Header">
            <p style={{ float: "left" }}>Officer({this.props.officerCount})</p>
            <div style={{ float: "right", display: "inline-flex" }}>
              <NavLink to="/officer/create">
                <Button>Add Officer</Button>
              </NavLink>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "normal",
                  margin: "5px",
                }}
              >
                Janmat Karyalay
              </p>
            </div>
          </div>
        </div>
        <div className="Content">{table}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    officerCount: state.officer.count,
    officerList: state.officer.officerList,
    // deleteItem: state.officer.deleteItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdhikariList: (token) => dispatch(actionCreator.fetchAdhikari(token)),
    fetchOfficerCount: (token) =>
      dispatch(actionCreator.fetchOfficerCount(token)),
    editRecord: (id, token) => dispatch(actionCreator.editItem(id, token)),
    deleteRecord: (id, token) => dispatch(actionCreator.getItems(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerList);
