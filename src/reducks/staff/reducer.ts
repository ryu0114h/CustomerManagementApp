import initialState from "../store/initialState";
import { actionTypes } from "./actionTypes";
import { StaffActionTypes, StaffType } from "./types";

export const staffReducer = (state = initialState.staff, action: StaffActionTypes): StaffType => {
  switch (action.type) {
    case actionTypes.FETCH_STAFF:
      return {
        ...action.payload,
      };
    case actionTypes.UPDATE_STAFF:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
