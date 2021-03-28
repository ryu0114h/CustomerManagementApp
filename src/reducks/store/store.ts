import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { staffReducer } from "../staff/reducer";
import { StaffType } from "../staff/types";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";
import { reservationsReducer } from "../reservations/reducer";
import { ReservationsType } from "../reservations/types";

const rootReducer = (history: History) =>
  combineReducers({
    staff: staffReducer,
    customers: customersReducer,
    reservations: reservationsReducer,
    router: connectRouter(history),
  });

export const browserHistory = createBrowserHistory();

export type RootState = {
  staff: StaffType;
  customers: CustomersType;
  reservations: ReservationsType;
  router?: RouteComponentProps;
};

export const configureStore = createStore(
  rootReducer(browserHistory),
  compose(applyMiddleware(routerMiddleware(browserHistory), thunk))
);
