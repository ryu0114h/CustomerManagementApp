import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  memo?: string;
};

export type CustomersType = CustomerType[];

interface DeleteCustomerActionType extends Action {
  type: typeof actionTypes.DELETE_CUSTOMER;
  payload: CustomersType;
}

interface UpdateCustomerActionType extends Action {
  type: typeof actionTypes.UPDATE_CUSTOMER;
  payload: CustomersType;
}

interface FetchCustomersActionType extends Action {
  type: typeof actionTypes.FETCH_CUSTOMERS;
  payload: CustomersType;
}

export type CustomersActionTypes =
  | DeleteCustomerActionType
  | UpdateCustomerActionType
  | FetchCustomersActionType;
