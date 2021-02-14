import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";

const rootReducer = {
  customers: customersReducer,
};

export type RootState = {
  customers: CustomersType;
};

const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));

export default store;
