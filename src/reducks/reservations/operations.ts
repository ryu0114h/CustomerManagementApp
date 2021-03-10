import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import {
  addReservationApi,
  deleteReservationApi,
  fetchReservationsApi,
} from "../../api/reservationsApi";
import { RootState } from "../store/store";
import { deleteReservationAction, fetchReservationsAction } from "./actions";
import {
  ReservationsActionTypes,
  ReservationsType,
  ReservationType,
} from "./types";

export const addReservation = (
  reservation: ReservationType
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | ReservationsActionTypes
> => {
  return (dispatch) => {
    addReservationApi(reservation)
      .then((res) => {
        dispatch(fetchReservations());
        notification["success"]({
          message: "追加しました。",
          description: "",
        });
        dispatch(push("/reservations"));
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "追加できませんでした。",
          description: "",
        });
        console.log(err.message);
      });
  };
};

export const deleteReservation = (
  id: number
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | ReservationsActionTypes
> => {
  return (dispatch, getState) => {
    const reservations: ReservationsType = getState().reservations.filter(
      (reservation) => reservation.id !== id
    );

    deleteReservationApi(id)
      .then((res) => {
        dispatch(deleteReservationAction(reservations));
        notification["success"]({
          message: "削除しました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "削除できませんでした。",
          description: "",
        });
        console.log(err.message);
      });
  };
};

export const fetchReservations = (): ThunkAction<
  void,
  RootState,
  undefined,
  ReservationsActionTypes
> => {
  return async (dispatch) => {
    fetchReservationsApi()
      .then((res) => {
        dispatch(fetchReservationsAction(res.data));
      })
      .catch((err) => console.log(err.message));
  };
};
