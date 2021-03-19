import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import {
  addReservationApi,
  deleteReservationApi,
  fetchReservationsApi,
  updateReservationApi,
} from "../../api/reservationsApi";
import { RootState } from "../store/store";
import {
  deleteReservationAction,
  fetchReservationsAction,
  updateReservationAction,
} from "./actions";
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
        console.log(reservation);
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

export const updateReservation = (
  reservation: ReservationType
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | ReservationsActionTypes
> => {
  return (dispatch, getState) => {
    updateReservationApi(reservation)
      .then((res) => {
        const reservations: ReservationsType = getState().reservations;
        dispatch(
          updateReservationAction(
            reservations.map((item) =>
              item.id === reservation.id ? reservation : item
            )
          )
        );
        notification["success"]({
          message: "保存しました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "保存できませんでした。",
          description: "",
        });
        console.log(err.message);
      });
  };
};
