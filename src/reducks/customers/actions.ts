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

export const addCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.ADD_CUSTOMER,
    payload: customers,
  };
};

export const deleteCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.DELETE_CUSTOMER,
    payload: customers,
  };
};
