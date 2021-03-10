import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import {
  addReservationApi,
  fetchReservationsApi,
} from "../../api/reservationApi";
import { RootState } from "../store/store";
import { fetchReservationsAction } from "./actions";
import { ReservationsActionTypes, ReservationType } from "./types";

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
