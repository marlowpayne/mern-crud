import {
  ACTION_ENQUEUE_SNACKBAR,
  ACTION_REMOVE_SNACKBAR,
  ACTION_SET_ERRORS,
  ACTION_SET_AUTHED_USER
} from "../constants";
import { defaultState } from "../store";

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_ENQUEUE_SNACKBAR:
      return {
        ...state,
        snackbars: [
          ...state.snackbars,
          {
            key: new Date().getTime() + Math.random() * 1000,
            ...action.payload.snackbar
          }
        ]
      };
    case ACTION_REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: state.snackbars.filter(sb => sb.key !== action.payload.key)
      };
    case ACTION_SET_AUTHED_USER:
      return {
        ...state,
        isUserAuthed:
          Object.keys(action.payload).length !== 0 &&
          action.payload.constructor === Object,
        currentUser: action.payload
      };
    case ACTION_SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
