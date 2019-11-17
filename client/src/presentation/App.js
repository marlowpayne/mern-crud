import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

import {
  ROUTE_LANDING,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_HOME
} from "../constants";
import { store } from "../store";
import { setAuthToken } from "../utils";
import { setAuthedUser, logout } from "../actions";

import { Register } from "../containers/Register";
import { Login } from "../containers/Login";
import { AuthedRoute } from "../containers/AuthedRoute";
import { Appbar } from "../containers/Appbar";
import { Landing } from "../containers/Landing";
import { Home } from "../containers/Home";
import { Drawer } from "../containers/Drawer";
import { Notistack } from "../containers/Notistack";

const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setAuthToken(jwtToken);
  const user = jwtDecode(jwtToken);
  store.dispatch(setAuthedUser(user));
  const nowInSeconds = Date.now() / 1000;
  if (user.exp < nowInSeconds) {
    store.dispatch(logout());
    window.location.href = `.${ROUTE_LOGIN}`;
  }
}

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3)
  }
}));

export const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const setDrawerState = newState => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(newState);
  };

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Notistack />
        <Router>
          <CssBaseline />
          <Appbar {...{ onMenuButtonClick: setDrawerState(true), open }} />
          <Drawer {...{ setDrawerState, open }} />

          <main className={classes.main}>
            <Route exact path={ROUTE_LANDING} component={Landing} />
            <Route exact path={ROUTE_REGISTER} component={Register} />
            <Route exact path={ROUTE_LOGIN} component={Login} />
            <AuthedRoute exact path={ROUTE_HOME} component={Home} />
          </main>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
};
