import { UsersType, UserType } from "../reducks/users/types";
import apiClient from "./apiClient";

export const addUserApi = async (user: UserType): Promise<{ data: UserType }> => {
  const URI = "/users";

  const res = await apiClient({
    method: "POST",
    uri: URI,
    params: user,
  });

  return res.data;
};

export const deleteUserApi = async (id: number): Promise<{ data: UserType }> => {
  const URI = `/users/${id}`;

  const res = await apiClient({
    method: "DELETE",
    uri: URI,
  });

  return res.data;
};

export const updateUserApi = async (user: UserType): Promise<{ data: UserType }> => {
  const URI = `/users/${user.id}`;

  const res = await apiClient({
    method: "PATCH",
    uri: URI,
    params: user,
  });

  return res.data;
};

export const fetchUsersApi = async (): Promise<{ data: UsersType }> => {
  const URI = "/users";

  const res = await apiClient({
    method: "GET",
    uri: URI,
  });

  return res.data;
};
