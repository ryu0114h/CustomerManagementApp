import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type StaffType = {
  accessToken: string;
  client: string;
  uid: string;
  isSignedIn: boolean;
};

export type InputFormStaffType = {
  email: string;
  password: string;
};

interface SigninStaffActionType extends Action {
  type: typeof actionTypes.SIGNIN_STAFF;
  payload: StaffType;
}

interface SignoutStaffActionType extends Action {
  type: typeof actionTypes.SIGNOUT_STAFF;
}

interface SignupStaffActionType extends Action {
  type: typeof actionTypes.SIGNUP_STAFF;
  payload: StaffType;
}

export type StaffActionTypes = SigninStaffActionType | SignoutStaffActionType | SignupStaffActionType;
