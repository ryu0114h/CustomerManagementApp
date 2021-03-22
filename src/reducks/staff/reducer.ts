import initialState from "../store/initialState";
import { actionTypes } from "./actionTypes";
import { StaffActionTypes, StaffType } from "./types";

export const staffReducer = (state = initialState.staff, action: StaffActionTypes): StaffType => {
  switch (action.type) {
    case actionTypes.SIGNIN_STAFF:
      return {
        isSignedIn: true,
        accessToken: action.payload["access-token"],
        client: action.payload.client,
        uid: action.payload.uid,
      };
    case actionTypes.SIGNOUT_STAFF:
      return {
        isSignedIn: false,
        accessToken: "",
        client: "",
        uid: "",
      };
    case actionTypes.SIGNUP_STAFF:
      return {
        isSignedIn: true,
        accessToken: action.payload["access-token"],
        client: action.payload.client,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};
