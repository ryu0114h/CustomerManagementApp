import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { fetchReservationsAction } from "./actions";
import { ReservationsActionTypes } from "./types";

export const fetchReservations = (): ThunkAction<
  void,
  RootState,
  undefined,
  ReservationsActionTypes
> => {
  return async (dispatch) => {
    const res = {
      data: [
        {
          id: 1,
          name: "All Day Event very long title",
          all_day: false,
          start_datetime: new Date("2021-03-01 9:00"),
          end_datetime: new Date("2021-03-01 13:00"),
        },
        {
          id: 2,
          name: "Long Event",
          all_day: false,
          start_datetime: new Date("2021-03-07 15:00"),
          end_datetime: new Date("2021-03-07 17:00"),
        },
      ],
    };
    dispatch(fetchReservationsAction(res.data));
  };
};
