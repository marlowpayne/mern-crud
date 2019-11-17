import { connect } from "react-redux";
import { Login as Visual } from "../presentation/Login";
import { login } from "../actions";

const mapStateToProps = storeState => ({
  errors: storeState.errors,
  isUserAuthed: storeState.isUserAuthed
});

const mapDispatchToProps = dispatch => ({
  onSubmitLogin: user => dispatch(login(user))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Visual);
