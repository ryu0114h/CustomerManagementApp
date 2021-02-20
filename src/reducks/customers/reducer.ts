import { CustomersType, CustomersActionTypes } from "./types";
import { actionTypes } from "../actionTypes";
import initialState from "../store/initialState";

export const customersReducer = (
  state = initialState.customers,
  action: CustomersActionTypes
): CustomersType => {
  switch (action.type) {
    case actionTypes.FETCH_CUSTOMERS:
      return [...action.payload];
    case actionTypes.DELETE_CUSTOMERS:
      return state.filter((customer) => customer.id !== action.id);
    default:
      return state;
  }
};
