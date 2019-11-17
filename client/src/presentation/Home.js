import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { ROUTE_REGISTER, ROUTE_USERS } from "../constants";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  linkedButton: {
    textDecoration: "none",
    color: "inherit"
  }
}));

export const Home = ({ email }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h1">MERN CRUD</Typography>
      <Typography variant="body1">Welcome to the home screen</Typography>
      <Typography variant="body1">
        You are logged in under:{" "}
        <Typography variant="button">{email}</Typography>{" "}
      </Typography>

      <Link to={ROUTE_REGISTER} className={classes.linkedButton}>
        <Button variant="contained" className={classes.button}>
          Register a new user
        </Button>
      </Link>
      <Link to={ROUTE_USERS} className={classes.linkedButton}>
        <Button variant="contained" className={classes.button}>
          User Management
        </Button>
      </Link>
    </>
  );
};
