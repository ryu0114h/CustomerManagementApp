import { UsersActionTypes as UsersActionTypes, UsersType } from "./types";
import { actionTypes } from "./actionTypes";

export const deleteUserAction = (users: UsersType): UsersActionTypes => {
  return {
    type: actionTypes.DELETE_USER,
    payload: users,
  };
};

export const updateUserAction = (users: UsersType): UsersActionTypes => {
  return {
    type: actionTypes.UPDATE_USER,
    payload: users,
  };
};

export const fetchUsersAction = (users: UsersType): UsersActionTypes => {
  return {
    type: actionTypes.FETCH_USERS,
    payload: users,
  };
};
