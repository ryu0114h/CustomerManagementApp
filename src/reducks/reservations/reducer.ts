import initialState from "../store/initialState";
import { actionTypes } from "./actionTypes";
import { ReservationsActionTypes, ReservationsType } from "./types";

export const reservationsReducer = (
  state = initialState.reservations,
  action: ReservationsActionTypes
): ReservationsType => {
  switch (action.type) {
    case actionTypes.DELETE_RESERVATION:
      return [...action.payload];
    case actionTypes.FETCH_RESERVATIONS:
      return [...action.payload];
    case actionTypes.UPDATE_RESERVATION:
      return [...action.payload];
    default:
      return state;
  }
};
