import { connect } from "react-redux";
import { Register as Visual } from "../presentation/Register";
import { registerNewUser } from "../actions";

const mapStateToProps = storeState => ({
  errors: storeState.errors
});

const mapDispatchToProps = dispatch => ({
  onSubmitRegister: newUser => dispatch(registerNewUser(newUser))
});

export const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Visual);
