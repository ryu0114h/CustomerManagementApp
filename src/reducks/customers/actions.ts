import { CustomersActionTypes, CustomersType } from "./types";
import { actionTypes } from "../actionTypes";

export const deleteCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.DELETE_CUSTOMER,
    payload: customers,
  };
};

export const updateCustomerAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.UPDATE_CUSTOMER,
    payload: customers,
  };
};

export const fetchCustomersAction = (
  customers: CustomersType
): CustomersActionTypes => {
  return {
    type: actionTypes.FETCH_CUSTOMERS,
    payload: customers,
  };
};
