import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type UserType = {
  accessToken: string;
  client: string;
  uid: string;
  isSignedIn: boolean;
};

export type InputFormUserType = {
  email: string;
  password: string;
};

interface SigninUserActionType extends Action {
  type: typeof actionTypes.SIGNIN_USER;
  payload: UserType;
}

interface SignoutUserActionType extends Action {
  type: typeof actionTypes.SIGNOUT_USER;
}

interface SignupUserActionType extends Action {
  type: typeof actionTypes.SIGNUP_USER;
  payload: UserType;
}

export type UserActionTypes =
  | SigninUserActionType
  | SignoutUserActionType
  | SignupUserActionType;
