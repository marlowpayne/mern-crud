import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { styled, withTheme } from "@material-ui/core/styles";

import { ROUTE_HOME, ROUTE_REGISTER, ROUTE_LOGIN } from "../constants";

const StyledLinkButton = styled(Link)({
  textDecoration: "none",
  color: "inherit"
});

const StyledButton = styled(withTheme(Button))(props => ({
  margin: props.theme.spacing(1),
  width: 200
}));

export class Landing extends React.PureComponent {
  static propTypes = {
    isUserAuthed: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.isUserAuthed) {
      this.props.history.push(ROUTE_HOME);
    }
  }

  componentDidUpdate() {
    if (this.props.isUserAuthed) {
      this.props.history.push(ROUTE_HOME);
    }
  }

  render() {
    return (
      <>
        <Typography variant="h1">MERN CRUD</Typography>

        <Typography varient="body1">
          A basic CRUD app built on the MERN stack
        </Typography>

        <StyledLinkButton to={ROUTE_REGISTER}>
          <StyledButton variant="contained">Register</StyledButton>
        </StyledLinkButton>
        <StyledLinkButton to={ROUTE_LOGIN}>
          <StyledButton variant="contained">Login</StyledButton>
        </StyledLinkButton>
      </>
    );
  }
}
