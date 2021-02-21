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

interface AddCustomersActionType extends Action {
  type: typeof actionTypes.ADD_CUSTOMERS;
  payload: CustomersType;
}

interface DeleteCustomersActionTypo extends Action {
  type: typeof actionTypes.DELETE_CUSTOMERS;
  payload: CustomersType;
}

export type CustomersActionTypes =
  | FetchCustomersActionType
  | AddCustomersActionType
  | DeleteCustomersActionTypo;
