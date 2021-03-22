import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import { signinStaffApi, signoutStaffApi, signupStaffApi } from "../../api/staffApi";
import { RootState } from "../store/store";
import { signinStaffAction, signoutStaffAction } from "./actions";
import { InputFormStaffType, StaffActionTypes } from "./types";

export const signinStaff = ({
  email,
  password,
}: InputFormStaffType): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | StaffActionTypes> => {
  return (dispatch) => {
    signinStaffApi({ email, password })
      .then((res) => {
        dispatch(signinStaffAction(res.headers));
        dispatch(push("/"));
        notification["success"]({
          message: "ログインできました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "ログインに失敗しました。",
          description: "",
        });
        console.log(err.message);
      });
  };
};

export const signoutStaff = (): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | StaffActionTypes> => {
  return (dispatch) => {
    signoutStaffApi()
      .then((res) => {
        dispatch(signoutStaffAction());
        notification["success"]({
          message: "ログアウトできました。",
          description: "",
        });
        dispatch(push("/"));
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "ログアウトに失敗しました。",
          description: "",
        });
        console.log(err.message);
      });
  };
};

export const signupStaff = ({
  email,
  password,
}: InputFormStaffType): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | StaffActionTypes> => {
  return (dispatch) => {
    signupStaffApi({ email, password })
      .then((res) => {
        dispatch(signinStaffAction(res.headers));
        dispatch(push("/"));
        notification["success"]({
          message: "ユーザー登録しました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "ユーザー登録に失敗しました。",
          description: "",
        });
        console.log(err.message);
      });
  };
};
