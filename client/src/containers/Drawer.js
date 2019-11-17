import { connect } from "react-redux";
import { Drawer as Visual } from "../presentation/Drawer";
import { logout } from "../actions";

const mapStateToProps = storeState => ({
  isUserAuthed: storeState.isUserAuthed
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export const Drawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Visual);
