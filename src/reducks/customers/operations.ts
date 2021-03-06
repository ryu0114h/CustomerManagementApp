import { notification } from "antd";
import axios from "axios";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import { addCustomersApi, fetchCustomersApi } from "../../api/customersApi";
import { RootState } from "../store/store";
import {
  deleteCustomerAction,
  updateCustomerAction,
  fetchCustomersAction,
} from "./actions";
import { CustomersActionTypes, CustomersType, CustomerType } from "./types";

export const addCustomer = (
  customer: CustomerType
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | CustomersActionTypes
> => {
  return (dispatch) => {
    addCustomersApi(customer)
      .then((res) => {
        dispatch(fetchCustomers());
        notification["success"]({
          message: "追加しました。",
          description: "",
        });
        dispatch(push("/"));
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

export const deleteCustomer = (
  id: number
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | CustomersActionTypes
> => {
  return (dispatch, getState) => {
    const user = getState().user;
    const customers: CustomersType = getState().customers.filter(
      (customer) => customer.id !== id
    );
    const router = getState().router;

    axios
      .delete(`http://localhost:3100/api/v1/customers/${id}`, {
        headers: {
          client: user.client,
          uid: user.uid,
          "access-token": user.accessToken,
        },
      })
      .then((res) => {
        dispatch(deleteCustomerAction(customers));
        if (router.location.pathname !== "/") {
          dispatch(push("/"));
        }
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

export const updateCustomer = (
  customer: CustomerType
): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | CustomersActionTypes
> => {
  return (dispatch, getState) => {
    const user = getState().user;

    axios
      .patch(
        `http://localhost:3100/api/v1/customers/${customer.id}`,
        {
          customer,
        },
        {
          headers: {
            client: user.client,
            uid: user.uid,
            "access-token": user.accessToken,
          },
        }
      )
      .then((res) => {
        const customers: CustomersType = getState().customers;
        dispatch(
          updateCustomerAction(
            customers.map((item) => (item.id === customer.id ? customer : item))
          )
        );
        notification["success"]({
          message: "保存しました。",
          description: "",
        });
        dispatch(push(`/${customer.id}`));
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

export const fetchCustomers = (): ThunkAction<
  void,
  RootState,
  undefined,
  CustomersActionTypes
> => {
  return async (dispatch) => {
    fetchCustomersApi()
      .then((res) => {
        dispatch(fetchCustomersAction(res.data));
      })
      .catch((err) => console.log(err.message));
  };
};
