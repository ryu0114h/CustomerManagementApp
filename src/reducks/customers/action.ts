import { CustomersActionTypes } from "./types";
import { actionTypes } from "../actionTypes";

export const fetchCustomersAction = (): CustomersActionTypes => {
  return {
    type: actionTypes.FETCH_CUSTOMERS,
  };
};
