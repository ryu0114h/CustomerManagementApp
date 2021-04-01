import { notification } from "antd";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { ThunkAction } from "redux-thunk";
import { addUserApi, deleteUserApi, fetchUsersApi, updateUserApi } from "../../api/usersApi";
import { RootState } from "../store/store";
import { deleteUserAction, updateUserAction, fetchUsersAction } from "./actions";
import { UsersActionTypes, UsersType, UserType } from "./types";

export const addUser = (
  user: UserType
): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | UsersActionTypes> => {
  return (dispatch) => {
    addUserApi(user)
      .then((res) => {
        dispatch(fetchUsers());
        notification["success"]({
          message: "追加しました。",
          description: "",
        });
        dispatch(push("/admin/users_list"));
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

export const deleteUser = (
  id: number
): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | UsersActionTypes> => {
  return (dispatch, getState) => {
    const users: UsersType = getState().users.filter((u) => u.id !== id);

    deleteUserApi(id)
      .then((res) => {
        dispatch(deleteUserAction(users));
        notification["success"]({
          message: "削除しました。",
          description: "",
        });
        dispatch(push("/admin/users_list"));
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

export const updateUser = (
  user: UserType
): ThunkAction<void, RootState, undefined, CallHistoryMethodAction | UsersActionTypes> => {
  return (dispatch, getState) => {
    updateUserApi(user)
      .then((res) => {
        const users: UsersType = getState().users;
        dispatch(updateUserAction(users.map((item) => (item.id === user.id ? user : item))));
        notification["success"]({
          message: "保存しました。",
          description: "",
        });
        dispatch(push(`/admin/users_list/`));
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

export const fetchUsers = (): ThunkAction<void, RootState, undefined, UsersActionTypes> => {
  return async (dispatch) => {
    fetchUsersApi()
      .then((res) => {
        dispatch(fetchUsersAction(res.data));
      })
      .catch((err) => console.log(err.message));
  };
};
