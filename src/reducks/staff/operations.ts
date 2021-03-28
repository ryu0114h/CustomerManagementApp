import { notification } from "antd";
import { CallHistoryMethodAction } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import { fetchStaffAction, updateStaffAction } from "./actions";
import { StaffActionTypes, StaffType } from "./types";
import { RootState } from "../store/store";
import { fetchStaffsApi, updateStaffApi } from "../../api/staffApi";

export const fetchStaff = (): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | StaffActionTypes> => {
  return async (dispatch) => {
    fetchStaffsApi()
      .then((res) => {
        dispatch(fetchStaffAction(res.data));
        console.log("res", res);
      })
      .catch((err) => console.log(err.message));
  };
};

export const updateStaff = (
  props: StaffType
): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | StaffActionTypes> => {
  return (dispatch) => {
    updateStaffApi(props)
      .then((res) => {
        dispatch(updateStaffAction(res.data));
        notification["success"]({
          message: "更新できました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "更新に失敗しました。",
          description: "",
        });
        console.log(err.message);
      });
  };
};
