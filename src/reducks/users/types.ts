import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  memo?: string;
};

export type UsersType = UserType[];

interface DeleteUserActionType extends Action {
  type: typeof actionTypes.DELETE_USER;
  payload: UsersType;
}

interface UpdateUserActionType extends Action {
  type: typeof actionTypes.UPDATE_USER;
  payload: UsersType;
}

interface FetchUsersActionType extends Action {
  type: typeof actionTypes.FETCH_USERS;
  payload: UsersType;
}

export type UsersActionTypes = DeleteUserActionType | UpdateUserActionType | FetchUsersActionType;
