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
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChart from "@material-ui/icons/BarChart";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Visibility from "@material-ui/icons/Visibility";
import Person from "@material-ui/icons/Person";
import Event from "@material-ui/icons/Event";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Group from "@material-ui/icons/Group";
import MonetizationOn from "@material-ui/icons/MonetizationOn";

import { NavLink } from "react-router-dom";

import * as actionType from "../../store/actions/ActionType";
import { removeItem } from "../../utils/token";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function PrimarySearchAppBar({ loginDetails, onLogout }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    removeItem("token");
    log.push("/");
    return onLogout();
  };

  const userName = loginDetails.firstName;

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
        <Typography style={{ margin: "5px" }}>Welcome {userName}</Typography>
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
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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

          <div className={classes.sectionDesktop}>
            <Typography style={{ margin: "5px", marginTop: "10px" }}>
              Dashboard
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
                Welcome {userName}
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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
          <Typography style={{ fontWeight: "bold" }}>MERANETA</Typography>
        </div>
        <Divider />
        <List>
          <Tooltip title="Development Work" placement="top">
            <ListItem button>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText>Development Work</ListItemText>
            </ListItem>
          </Tooltip>
          <Tooltip title="MLA Fund" placement="top">
            <ListItem button>
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText>MLA Fund</ListItemText>
            </ListItem>
          </Tooltip>
          <Tooltip title="Connector" placement="top">
            <ListItem button>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText>Connector</ListItemText>
            </ListItem>
          </Tooltip>
          <Tooltip title="Karyakarta" placement="top">
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>Karyakarta</ListItemText>
            </ListItem>
          </Tooltip>
          <NavLink to="/officer/list">
            <Tooltip title="Officer" placement="top">
              <ListItem button>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText>Officer</ListItemText>
              </ListItem>
            </Tooltip>
          </NavLink>
          <ListItem button>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText>Tour</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText>Office</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText>Manage Viewer</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginDetails: state.loginReducer.login,
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
