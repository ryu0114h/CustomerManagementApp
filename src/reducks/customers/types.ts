import { Action } from "redux";
import { actionTypes } from "../actionTypes";

export type TagsType = {
  cool: boolean;
  developer: boolean;
  loser: boolean;
  nice: boolean;
  teacher: boolean;
};

export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: TagsType;
  memo?: string;
};

export type CustomersType = CustomerType[];

interface FetchCustomersActionType extends Action {
  type: typeof actionTypes.FETCH_CUSTOMERS;
  payload: CustomersType;
}

interface AddCustomerActionType extends Action {
  type: typeof actionTypes.ADD_CUSTOMER;
  payload: CustomersType;
}

interface DeleteCustomerActionTypo extends Action {
  type: typeof actionTypes.DELETE_CUSTOMER;
  payload: CustomersType;
}

export type CustomersActionTypes =
  | FetchCustomersActionType
  | AddCustomerActionType
  | DeleteCustomerActionTypo;
