import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  Store,
} from "redux";
import thunk from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { userReducer } from "../user/reducer";
import { UserType } from "../user/types";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";


const rootReducer = (history: History) => ({
  user: userReducer,
  customers: customersReducer,
  router: connectRouter(history),
});

const createRootReducer = (history: History) =>
  combineReducers(rootReducer(history));

export type RootState = {
  user: UserType;
  customers: CustomersType;
  router: RouteComponentProps;
};

export const browserHistory = createBrowserHistory();

const configureStore = (): Store =>
  createStore(
    createRootReducer(browserHistory),
    compose(applyMiddleware(routerMiddleware(browserHistory), thunk))
  );

export default configureStore;
