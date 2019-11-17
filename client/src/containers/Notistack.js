import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

import { removeSnackbar } from "../actions";

class NotistackComp extends React.PureComponent {
  static propTypes = {
    snackbars: PropTypes.array.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    removeSnackbar: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const { snackbars = [] } = this.props;

    snackbars.forEach(({ key, message, options = {} }) =>
      this.props.enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (event, key) => this.props.removeSnackbar(key)
      })
    );
  }

  render() {
    return null;
  }
}

const mapStateToProps = storeState => ({
  snackbars: storeState.snackbars
});

const mapDispatchToProps = dispatch => ({
  removeSnackbar: key => dispatch(removeSnackbar(key))
});

export const Notistack = withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotistackComp)
);
