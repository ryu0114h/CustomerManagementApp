import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { deleteCustomersAction, fetchCustomersAction } from "./actions";
import { CustomersActionTypes, CustomersType, CustomerType } from "./types";

export const fetchCustomers = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers;

    dispatch(
      fetchCustomersAction(
        customers.map((item) => (item.key === customer.key ? customer : item))
      )
    );
  };
};

export const deleteCustomers = (
  key: string
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => {
    dispatch(deleteCustomersAction(key));
  };
};
