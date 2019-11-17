import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "../reducers";

const middleware = [thunk];

export const defaultState = {
  isUserAuthed: false,
  currentUser: {},
  snackbars: [],
  errors: {}
};

export const store = createStore(
  rootReducer,
  defaultState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
