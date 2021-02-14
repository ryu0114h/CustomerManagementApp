import { Action } from "redux";
import { actionTypes } from "../actionTypes";

export type CustomerType = {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
};

export type CustomersType = CustomerType[];

interface FetchCustomersActionType extends Action {
  type: typeof actionTypes.FETCH_CUSTOMERS;
  payload: CustomersType;
}

export type CustomersActionTypes = FetchCustomersActionType;
