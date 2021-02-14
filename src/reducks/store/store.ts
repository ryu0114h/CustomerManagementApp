import { combineReducers, createStore } from "redux";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";

const rootReducer = {
  customers: customersReducer,
};

export type RootState = {
  customers: CustomersType;
};

const store = createStore(combineReducers(rootReducer));

export default store;
