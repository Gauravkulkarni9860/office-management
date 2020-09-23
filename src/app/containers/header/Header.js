import React from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actionType from "../../store/actions/ActionType";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function PrimarySearchAppBar({ loginDetails, onLogout }) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const log = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    log.push("/");
    return onLogout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Typography style={{ margin: "5px" }}>
          Welcome {loginDetails.firstName}
        </Typography>
      </MenuItem>

      <MenuItem>
        <Typography style={{ margin: "5px" }}>Dashboard</Typography>
      </MenuItem>
      <MenuItem>
        <Typography style={{ margin: "5px" }}>Register Book</Typography>
      </MenuItem>
      <MenuItem>
        <Typography style={{ margin: "5px" }}>Schedule Book</Typography>
      </MenuItem>
      <MenuItem>
        <Typography style={{ margin: "5px" }}>Call Logs</Typography>
      </MenuItem>
      <MenuItem>
        <Typography style={{ margin: "5px" }}>Complaints</Typography>
      </MenuItem>
      <MenuItem>
        <Typography style={{ margin: "5px" }}>Visitors</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleLogout}
          color="inherit"
        >
          <Typography style={{ margin: "5px" }}>Logout</Typography>
          <LogoutIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Office Management System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search By Phone/FirstName/LastName"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <Typography style={{ margin: "10px" }}>
              <NavLink to="/homePage">Dashboard</NavLink>
            </Typography>
            <Typography style={{ margin: "10px" }}>Register Book</Typography>
            <Typography style={{ margin: "10px" }}>Schedule Book</Typography>
            <Typography style={{ margin: "10px" }}>Call Logs</Typography>
            <Typography style={{ margin: "10px" }}>Complaints</Typography>
            <Typography style={{ margin: "10px" }}>Visitors</Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <Typography style={{ margin: "5px" }}>
                Welcome {loginDetails.firstName}
              </Typography>
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginDetails: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: actionType.LOGOUT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySearchAppBar);
