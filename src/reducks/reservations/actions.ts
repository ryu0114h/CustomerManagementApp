import { actionTypes } from "./actionTypes";
import { ReservationsActionTypes, ReservationsType } from "./types";

export const deleteReservationAction = (
  reservations: ReservationsType
): ReservationsActionTypes => {
  return {
    type: actionTypes.DELETE_RESERVATION,
    payload: reservations,
  };
};

export const fetchReservationsAction = (
  reservations: ReservationsType
): ReservationsActionTypes => {
  return {
    type: actionTypes.FETCH_RESERVATIONS,
    payload: reservations,
  };
};

export const updateReservationAction = (
  reservations: ReservationsType
): ReservationsActionTypes => {
  return {
    type: actionTypes.UPDATE_RESERVATION,
    payload: reservations,
  };
};
