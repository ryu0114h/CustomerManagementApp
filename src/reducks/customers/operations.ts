import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { deleteCustomersAction, fetchCustomersAction } from "./actions";
import { CustomersActionTypes, CustomersType, CustomerType } from "./types";

export const fetchCustomers = (
  customer: CustomerType
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch, getState) => {
    const customers: CustomersType = getState().customers;

    // 更新する場合
    if (customer.id) {
      dispatch(
        fetchCustomersAction(
          customers.map((item) => (item.id === customer.id ? customer : item))
        )
      );
      return;
    } else {
      // 追加する場合
      let id = 1;
      customers.forEach((cus) => {
        if (id === cus.id) {
          id++;
        } else {
          return;
        }
      });
      dispatch(fetchCustomersAction([...customers, { ...customer, id }]));
    }
  };
};

export const deleteCustomers = (
  id: number
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => {
    dispatch(deleteCustomersAction(id));
  };
};
