import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { staffReducer } from "../staff/reducer";
import { StaffType } from "../staff/types";
import { usersReducer } from "../users/reducer";
import { UsersType } from "../users/types";
import { reservationsReducer } from "../reservations/reducer";
import { ReservationsType } from "../reservations/types";

const rootReducer = (history: History) =>
  combineReducers({
    staff: staffReducer,
    users: usersReducer,
    reservations: reservationsReducer,
    router: connectRouter(history),
  });

export const browserHistory = createBrowserHistory();

export type RootState = {
  staff: StaffType;
  users: UsersType;
  reservations: ReservationsType;
  router?: RouteComponentProps;
};

export const configureStore = createStore(
  rootReducer(browserHistory),
  compose(applyMiddleware(routerMiddleware(browserHistory), thunk))
);
