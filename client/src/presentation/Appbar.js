import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  linkedButton: {
    textDecoration: "none",
    color: "inherit"
  }
}));

export const Appbar = ({
  onMenuButtonClick,
  open,
  isUserAuthed,
  currentUser
}) => {
  const classes = useStyles();
  const userInfo = isUserAuthed ? (
    <Typography variant="button">{currentUser.name}</Typography>
  ) : null;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="open menu"
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title} role="presentation">
            <Link to="/" className={classes.linkedButton}>
              <Typography variant="h6">MERN CRUD</Typography>
            </Link>
          </div>

          {userInfo}
        </Toolbar>
      </AppBar>
    </div>
  );
};
