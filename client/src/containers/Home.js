import { connect } from "react-redux";
import { Home as Visual } from "../presentation/Home";

const mapStateToProps = storeState => ({
  email: storeState.currentUser.name
});

export const Home = connect(mapStateToProps)(Visual);
