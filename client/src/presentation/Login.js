import React from "react";
import PropTypes from "prop-types";
import { styled, withTheme } from "@material-ui/core/styles";
import { TextField, Typography, Button } from "@material-ui/core";
import { ROUTE_HOME } from "../constants";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column"
});

const StyledField = styled(withTheme(TextField))(props => ({
  marginTop: props.theme.spacing(1),
  marginBottom: props.theme.spacing(1),
  width: 200
}));

const StyledButton = styled(withTheme(Button))(props => ({
  marginTop: props.theme.spacing(2),
  marginBottom: props.theme.spacing(2),
  width: 200
}));

export class Login extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    isUserAuthed: PropTypes.bool.isRequired,
    onSubmitLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.isUserAuthed) {
      this.props.history.push(ROUTE_HOME);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isUserAuthed) {
      this.props.history.push(ROUTE_HOME);
    }
  }

  onChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmitLogin(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Typography variant="h2">Login</Typography>
        <Typography variant="body1">Log into your existing account</Typography>

        <StyledForm
          noValidate
          autoComplete="off"
          onSubmit={this.onSubmit}
          id="login-form"
        >
          <StyledField
            required
            id="email"
            label="Email"
            margin="normal"
            onChange={this.onChange}
            value={email}
            error={!!errors.email}
            helperText={errors.email}
          />
          <StyledField
            required
            id="password"
            label="Password"
            margin="normal"
            type="password"
            autoComplete="current-password"
            onChange={this.onChange}
            value={password}
            error={!!errors.password}
            helperText={errors.password}
          />
          <StyledButton variant="contained" type="submit">
            Login
          </StyledButton>
        </StyledForm>
      </>
    );
  }
}
