import React from "react";
import PropTypes from "prop-types";
import { styled, withTheme } from "@material-ui/core/styles";
import { TextField, Typography, Button } from "@material-ui/core";

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

export class Register extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    onSubmitRegister: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmitRegister(this.state);
  };

  render() {
    const { email, password, passwordConfirm } = this.state;
    const { errors } = this.props;

    return (
      <>
        <Typography variant="h2">Register</Typography>
        <Typography variant="body1">Create a new user account</Typography>

        <StyledForm
          noValidate
          autoComplete="off"
          onSubmit={this.onSubmit}
          id="register-form"
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
          <StyledField
            required
            id="passwordConfirm"
            label="Confirm Password"
            margin="normal"
            type="password"
            autoComplete="current-password"
            onChange={this.onChange}
            value={passwordConfirm}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm}
          />
          <StyledButton variant="contained" type="submit">
            Submit
          </StyledButton>
        </StyledForm>
      </>
    );
  }
}
