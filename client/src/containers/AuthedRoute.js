import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ROUTE_LOGIN } from "../constants";

const GuardedRoute = ({ component: Comp, isUserAuthed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthed === true ? (
        <Comp {...props} />
      ) : (
        <Redirect to={ROUTE_LOGIN} />
      )
    }
  />
);

GuardedRoute.propTypes = {
  isUserAuthed: PropTypes.bool.isRequired
};

const mapStateToProps = storeState => ({
  isUserAuthed: storeState.isUserAuthed
});

export const AuthedRoute = connect(mapStateToProps)(GuardedRoute);
