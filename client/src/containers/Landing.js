import { connect } from "react-redux";
import { Landing as Visual } from "../presentation/Landing";

const mapStatetoProps = storeState => ({
  isUserAuthed: storeState.isUserAuthed
});

export const Landing = connect(mapStatetoProps)(Visual);
