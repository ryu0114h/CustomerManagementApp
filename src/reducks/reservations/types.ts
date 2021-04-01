import { Action } from "redux";
import { actionTypes } from "./actionTypes";

export type ReservationType = {
  id?: number;
  staff_id?: number;
  user_id?: number;
  name?: string;
  all_day?: boolean;
  start_datetime?: Date;
  end_datetime?: Date;
  created_at?: Date;
  updated_at?: Date;
};

export type ReservationsType = ReservationType[];

interface DeleteReservationActionType extends Action {
  type: typeof actionTypes.DELETE_RESERVATION;
  payload: ReservationsType;
}

interface FetchReservationsActionTypes extends Action {
  type: typeof actionTypes.FETCH_RESERVATIONS;
  payload: ReservationsType;
}

interface UpdateReservationActionType extends Action {
  type: typeof actionTypes.UPDATE_RESERVATION;
  payload: ReservationsType;
}

export type ReservationsActionTypes =
  | DeleteReservationActionType
  | FetchReservationsActionTypes
  | UpdateReservationActionType;
