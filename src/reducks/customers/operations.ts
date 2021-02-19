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
    if (customer.key) {
      dispatch(
        fetchCustomersAction(
          customers.map((item) => (item.key === customer.key ? customer : item))
        )
      );
      return;
    } else {
      // 追加する場合
      let key = "1";
      customers.forEach((cus) => {
        if (key === cus.key) {
          key = String(parseInt(key) + 1);
        } else {
          return;
        }
      });
      dispatch(fetchCustomersAction([...customers, { ...customer, key }]));
    }
  };
};

export const deleteCustomers = (
  key: string
): ThunkAction<void, RootState, undefined, CustomersActionTypes> => {
  return (dispatch) => {
    dispatch(deleteCustomersAction(key));
  };
};
