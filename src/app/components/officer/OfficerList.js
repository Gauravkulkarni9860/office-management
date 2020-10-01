import React, { Component } from "react";

import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import Delete from "@material-ui/icons/Delete";
import InfoRounded from "@material-ui/icons/InfoRounded";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Search from "@material-ui/icons/Search";
import MoreVert from "@material-ui/icons/MoreVert";
import FilterList from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import { OutlinedInput, InputAdornment } from "@material-ui/core";

import "./OfficerList.css";
import Header from "../../containers/header/Header";
import * as actionCreator from "../../store/actions/index";

class OfficerList extends Component {
  state = {
    edit: false,
    search: false,
    searchList: [],
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.fetchAdhikariList(JSON.parse(token));
    this.props.fetchOfficerCount(JSON.parse(token));
  }
  componentDidUpdate() {
    // let token = localStorage.getItem("token");
    // this.props.fetchAdhikariList(JSON.parse(token));
  }

  handleChange = (e) => {
    this.setState({ search: true });
    let val = e.target.value;
    const search = this.props.officerList.filter(
      (value) =>
        value.firstName?.trim() === val ||
        value.lastName?.trim() === val ||
        value.phone === val
    );
    this.setState({ searchList: search });
    if (val.trim() === "") {
      this.setState({ search: false });
    }
  };

  deleteItem = (e, id) => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    this.props.deleteRecord(id, token);
    this.props.fetchAdhikariList(JSON.parse(token));
  };

  editItem = (e, id) => {
    console.log(id);
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    this.props.editRecord(id, token);
    this.setState({ edit: true });
  };

  render() {
    if (this.state.edit) {
      return <Redirect to="/officer/create" />;
    }

    const row = (officer) => (
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
    );

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
          {this.state.search ? (
            this.state.searchList.length !== 0 ? (
              this.state.searchList.map((officer) => row(officer))
            ) : (
              <tr>
                <td></td>
                <td>Result Not found</td>
              </tr>
            )
          ) : (
            this.props.officerList.map((officer) => row(officer))
          )}
        </tbody>
      </Table>
    );

    return (
      <div>
        <Header />
        <div>
          <div className="Header">
            <p style={{ float: "left" }}>
              Officer(
              {this.state.search
                ? this.state.searchList.length
                : this.props.officerCount}
              )
            </p>
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

        <div className="Content">
          <div style={{ float: "right", margin: "10px" }}>
            <OutlinedInput
              placeholder="search by Name/phone"
              size="small"
              margin="dense"
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
            <Button variant="outline-primary" style={{ marginLeft: "8px" }}>
              <FilterList />
            </Button>
            <Button variant="outline-primary" style={{ marginLeft: "8px" }}>
              <MoreVert />
            </Button>
          </div>
          {table}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    officerCount: state.officer.count,
    officerList: state.officer.officerList,
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
