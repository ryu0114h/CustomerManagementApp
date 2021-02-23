import { actionTypes } from "./actionTypes";
import { UserActionTypes, UserType } from "./types";

export const signinUserAction = (user: UserType): UserActionTypes => {
  return {
    type: actionTypes.SIGNIN_USER,
    payload: user,
  };
};
