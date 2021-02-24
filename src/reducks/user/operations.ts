import { notification } from "antd";
import axios from "axios";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
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
    axios
      .post("http://localhost:3100/api/v1/auth/sign_in", {
        email,
        password,
      })
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
  return (dispatch, getState) => {
    const user = getState().user;

    axios
      .delete("http://localhost:3100/api/v1/auth/sign_out", {
        headers: {
          client: user.client,
          uid: user.uid,
          "access-token": user.accessToken,
        },
      })
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
  UserActionTypes
> => {
  return (dispatch) => {
    axios
      .post("http://localhost:3100/api/v1/auth", {
        email,
        password,
      })
      .then((res) => {
        dispatch(signinUserAction(res.headers));
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
