import initialState from "../store/initialState";
import { actionTypes } from "./actionTypes";
import { UserActionTypes, UserType } from "./types";

export const userReducer = (
  state = initialState.user,
  action: UserActionTypes
): UserType => {
  switch (action.type) {
    case actionTypes.SIGNIN_USER:
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
