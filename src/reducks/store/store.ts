import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../user/reducer";
import { UserType } from "../user/types";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";

const rootReducer = {
  user: userReducer,
  customers: customersReducer,
};

export type RootState = {
  user: UserType;
  customers: CustomersType;
};

const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));

export default store;
