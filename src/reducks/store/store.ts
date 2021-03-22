import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { staffReducer } from "../staff/reducer";
import { StaffType } from "../staff/types";
import { customersReducer } from "../customers/reducer";
import { CustomersType } from "../customers/types";
import { reservationsReducer } from "../reservations/reducer";
import { ReservationsType } from "../reservations/types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["staff"],
};

const rootReducer = (history: History) =>
  combineReducers({
    staff: staffReducer,
    customers: customersReducer,
    reservations: reservationsReducer,
    router: connectRouter(history),
  });

export const browserHistory = createBrowserHistory();

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer(browserHistory)
);

export type RootState = {
  staff: StaffType;
  customers: CustomersType;
  reservations: ReservationsType;
  router?: RouteComponentProps;
};

export const configureStore = createStore(
  persistedReducer,
  compose(applyMiddleware(routerMiddleware(browserHistory), thunk))
);

export const persistor = persistStore(configureStore);
