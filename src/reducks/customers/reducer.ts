import { CustomersType, CustomersActionTypes } from "./types";
import { actionTypes } from "../actionTypes";
import initialState from "../store/initialState";

export const customersReducer = (
  state = initialState.customers,
  action: CustomersActionTypes
): CustomersType => {
  switch (action.type) {
    case actionTypes.DELETE_CUSTOMER:
      return [...action.payload];
    case actionTypes.EDIT_CUSTOMER:
      return [...action.payload];
    case actionTypes.FETCH_CUSTOMERS:
      return [...action.payload];
    default:
      return state;
  }
};
