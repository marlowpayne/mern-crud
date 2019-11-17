import { connect } from "react-redux";
import { Users as Visual } from "../presentation/Users";

const mapStateToProps = storeState => ({
  currentUserEmail: storeState.currentUser.name
});

export const Users = connect(mapStateToProps)(Visual);
