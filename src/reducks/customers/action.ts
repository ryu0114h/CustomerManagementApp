import { CustomersActionTypes, CustomersType } from "./types";
import { actionTypes } from "../actionTypes";

export const fetchCustomersAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.FETCH_CUSTOMERS,
    payload: customers,
  };
};

export const deleteCustomersAction = (key: string): CustomersActionTypes => {
  return {
    type: actionTypes.DELETE_CUSTOMERS,
    key,
  };
};
