import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import {
  addCustomerAction,
  deleteCustomerAction,
  editCustomerAction,
  fetchCustomersAction,
} from "./actions";
import { CustomersActionTypes, CustomersType, CustomerType } from "./types";

export const addCustomer = (
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

    dispatch(addCustomerAction([...customers, { ...customer, id }]));
  };
};

export const deleteCustomer = (
  id: number
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers.filter(
      (customer) => customer.id !== id
    );
    dispatch(deleteCustomerAction(customers));
  };
};

export const editCustomer = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers;

    dispatch(
      editCustomerAction(
        customers.map((item) => (item.id === customer.id ? customer : item))
      )
    );
    return;
  };
};

export const fetchCustomers = (
  customers: CustomersType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => dispatch(fetchCustomersAction(customers));
};
