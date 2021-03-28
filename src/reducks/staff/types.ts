import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type StaffType = {
  id: number | null;
  email: string;
  name: string;
};

export type InputFormStaffType = {
  email: string;
  password: string;
};

interface FetchStaffActionType extends Action {
  type: typeof actionTypes.FETCH_STAFF;
  payload: StaffType;
}

interface UpdateStaffActionType extends Action {
  type: typeof actionTypes.UPDATE_STAFF;
  payload: StaffType;
}

export type StaffActionTypes = FetchStaffActionType | UpdateStaffActionType;
