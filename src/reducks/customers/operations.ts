import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import {
  deleteCustomerAction,
  updateCustomerAction,
  fetchCustomersAction,
} from "./actions";
import { CustomersActionTypes, CustomersType, CustomerType } from "./types";

export const addCustomer = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => {
    axios
      .post("http://localhost:3100/api/v1/customers", {
        customer,
      })
      .then((res) => {
        dispatch(fetchCustomers());
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteCustomer = (
  id: number
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers.filter(
      (customer) => customer.id !== id
    );
    axios
      .delete(`http://localhost:3100/api/v1/customers/${id}`)
      .then((res) => {
        dispatch(deleteCustomerAction(customers));
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
};

export const updateCustomer = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    axios
      .patch(`http://localhost:3100/api/v1/customers/${customer.id}`, {
        customer,
      })
      .then((res) => {
        const customers: CustomersType = getState().customers;
        dispatch(
          updateCustomerAction(
            customers.map((item) => (item.id === customer.id ? customer : item))
          )
        );
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
};

export const fetchCustomers = (): ThunkAction<
  void,
  RootState,
  undefined,
  CustomersActionTypes
> => {
  return (dispatch) => {
    axios
      .get("http://localhost:3100/api/v1/customers")
      .then((res) => {
        dispatch(fetchCustomersAction(res.data.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
};
