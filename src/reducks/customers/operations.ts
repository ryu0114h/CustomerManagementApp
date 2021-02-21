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
        customers.map((item) => (item.id === customer.id ? customer : item))
      )
    );
    return;
  };
};

export const addCustomers = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers;
    const copyCustomers = customers.slice();

    copyCustomers.sort((a, b) => a.id - b.id);
    let id = 1;
    copyCustomers.forEach((cus) => {
      if (id === cus.id) {
        id++;
      } else {
        return;
      }
    });

    dispatch(fetchCustomersAction([...customers, { ...customer, id }]));
  };
};

export const deleteCustomers = (
  id: number
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers.filter(
      (customer) => customer.id !== id
    );
    dispatch(deleteCustomersAction(customers));
  };
};
