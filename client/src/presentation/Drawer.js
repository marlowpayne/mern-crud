import React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Create as CreateIcon,
  Input as InputIcon,
  PowerOff as PowerIcon
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { ROUTE_LOGIN, ROUTE_REGISTER } from "../constants";

const useStyles = makeStyles(theme => ({
  linkedButton: {
    textDecoration: "none",
    color: "inherit"
  },
  list: {
    width: 250
  }
}));

export const Drawer = ({ setDrawerState, open, isUserAuthed, onLogout }) => {
  const classes = useStyles();

  const LoginLink = (
    <Link to={ROUTE_LOGIN} className={classes.linkedButton}>
      <ListItem button key={ROUTE_LOGIN}>
        <ListItemIcon>
          <>
            {" "}
            <InputIcon />{" "}
          </>
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </Link>
  );

  const LogoutLink = (
    <ListItem button key="logout" onClick={onLogout}>
      <ListItemIcon>
        <>
          {" "}
          <PowerIcon />{" "}
        </>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );

  return (
    <SwipeableDrawer
      open={open}
      onOpen={setDrawerState(true)}
      onClose={setDrawerState(false)}
    >
      <IconButton onClick={setDrawerState(false)}>
        <ChevronLeftIcon />
      </IconButton>

      <Divider />
      <div
        className={classes.list}
        role="presentation"
        onClick={setDrawerState(false)}
        onKeyDown={setDrawerState(false)}
      >
        <List>
          <Link to={ROUTE_REGISTER} className={classes.linkedButton}>
            <ListItem button key={ROUTE_REGISTER}>
              <ListItemIcon>
                <>
                  {" "}
                  <CreateIcon />{" "}
                </>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </Link>

          {isUserAuthed ? LogoutLink : LoginLink}
        </List>
      </div>
    </SwipeableDrawer>
  );
};
