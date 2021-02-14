import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { deleteCustomersAction } from "./action";
import { CustomersActionTypes } from "./types";

export const deleteCustomers = (
  key: string
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => {
    dispatch(deleteCustomersAction(key));
  };
};
