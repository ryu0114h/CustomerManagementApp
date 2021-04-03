import { actionTypes } from "./actionTypes";
import { StaffActionTypes, StaffType } from "./types";

export const fetchStaffAction = (staff: StaffType): StaffActionTypes => {
  return {
    type: actionTypes.FETCH_STAFF,
    payload: staff,
  };
};

export const updateStaffAction = (staff: StaffType): StaffActionTypes => {
  return {
    type: actionTypes.UPDATE_STAFF,
    payload: staff,
  };
};
