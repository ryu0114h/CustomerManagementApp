import apiClient from "./apiClient";
import {
  ReservationsType,
  ReservationType,
} from "../reducks/reservations/types";

export const addReservationApi = async (
  reservation: ReservationType
): Promise<{ data: ReservationType }> => {
  const URI = "/reservations";

  const res = await apiClient({
    method: "POST",
    uri: URI,
    params: reservation,
  });

  return res.data;
};

export const fetchReservationsApi = async (): Promise<{
  data: ReservationsType;
}> => {
  const URI = "/reservations";

  const res = await apiClient({
    method: "GET",
    uri: URI,
  });

  return res.data;
};
