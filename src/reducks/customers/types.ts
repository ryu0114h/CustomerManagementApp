import { Action } from "redux";
import { actionTypes } from "../actionTypes";

export type CustomerType = {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
  memo?: string;
};

export type CustomersType = CustomerType[];

interface FetchCustomersActionType extends Action {
  type: typeof actionTypes.FETCH_CUSTOMERS;
  payload: CustomersType;
}

interface DeleteCustomersActionTypo extends Action {
  type: typeof actionTypes.DELETE_CUSTOMERS;
  key: string;
}

export type CustomersActionTypes =
  | FetchCustomersActionType
  | DeleteCustomersActionTypo;
