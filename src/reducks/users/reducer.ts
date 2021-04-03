import { actionTypes } from "./actionTypes";
import { UsersType, UsersActionTypes } from "./types";
import initialState from "../store/initialState";

export const usersReducer = (state = initialState.users, action: UsersActionTypes): UsersType => {
  switch (action.type) {
    case actionTypes.DELETE_USER:
      return [...action.payload];
    case actionTypes.UPDATE_USER:
      return [...action.payload];
    case actionTypes.FETCH_USERS:
      return [...action.payload];
    default:
      return state;
  }
};
