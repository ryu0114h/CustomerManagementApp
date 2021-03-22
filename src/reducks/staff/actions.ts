import { actionTypes } from "./actionTypes";
import { StaffActionTypes, StaffType } from "./types";

export const signinStaffAction = (staff: StaffType): StaffActionTypes => {
  return {
    type: actionTypes.SIGNIN_STAFF,
    payload: staff,
  };
};

export const signoutStaffAction = (): StaffActionTypes => {
  return {
    type: actionTypes.SIGNOUT_STAFF,
  };
};

export const signupStaffAction = (staff: StaffType): StaffActionTypes => {
  return {
    type: actionTypes.SIGNUP_STAFF,
    payload: staff,
  };
};
