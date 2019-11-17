import { connect } from "react-redux";
import { Appbar as Visual } from "../presentation/Appbar";

const mapStateToProps = storeState => ({
  isUserAuthed: storeState.isUserAuthed,
  currentUser: storeState.currentUser
});

export const Appbar = connect(mapStateToProps)(Visual);
