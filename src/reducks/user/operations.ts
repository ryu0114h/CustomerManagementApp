import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import {
  signinUserApi,
  signoutUserApi,
  signupUserApi,
} from "../../api/userApi";
import { RootState } from "../store/store";
import { signinUserAction, signoutUserAction } from "./actions";
import { InputFormUserType, UserActionTypes } from "./types";

export const signinUser = ({
  email,
  password,
}: InputFormUserType): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | UserActionTypes
> => {
  return (dispatch) => {
    signinUserApi({ email, password })
      .then((res) => {
        dispatch(signinUserAction(res.headers));
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

export const signoutUser = (): ThunkAction<
  void,
  RootState,
  undefined,
  UserActionTypes
> => {
  return (dispatch) => {
    signoutUserApi()
      .then((res) => {
        dispatch(signoutUserAction());
        notification["success"]({
          message: "ログアウトできました。",
          description: "",
        });
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

export const signupUser = ({
  email,
  password,
}: InputFormUserType): ThunkAction<
  void,
  RootState,
  undefined,
  CallHistoryMethodAction | UserActionTypes
> => {
  return (dispatch) => {
    signupUserApi({ email, password })
      .then((res) => {
        dispatch(signinUserAction(res.headers));
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
