import { actionTypes } from "./actionTypes";
import { UserActionTypes, UserType } from "./types";

export const signinUserAction = (user: UserType): UserActionTypes => {
  return {
    type: actionTypes.SIGNIN_USER,
    payload: user,
  };
};

export const signupUserAction = (user: UserType): UserActionTypes => {
  return {
    type: actionTypes.SIGNUP_USER,
    payload: user,
  };
};
