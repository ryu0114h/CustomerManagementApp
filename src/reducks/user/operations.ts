import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { signinUserAction } from "./actions";
import { InputFormUserType, UserActionTypes } from "./types";

export const signinUser = ({
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
      .post("http://localhost:3100/api/v1/auth/sign_in", {
        email,
        password,
      })
      .then((res) => {
        dispatch(signinUserAction(res.headers));
        console.log(res.headers);
      });
  };
};
