import { InputFormUserType, UserType } from "../reducks/user/types";
import apiClient from "./apiClient";

export const signinUserApi = async ({
  email,
  password,
}: InputFormUserType): Promise<{
  data: UserType;
  headers: Headers & UserType;
}> => {
  const URI = "/auth/sign_in";

  const res = await apiClient({
    method: "POST",
    uri: URI,
    params: {
      email,
      password,
    },
  });

  return res;
};

export const signoutUserApi = async (): Promise<{
    data: UserType;
    headers: Headers & UserType;
}> => {
    const URI = "/auth/sign_out";
    
    const res = await apiClient({
        method: "DELETE",
        uri: URI,
    });
    
    return res;
};

export const signupUserApi = async ({
  email,
  password,
}: InputFormUserType): Promise<{
  data: UserType;
  headers: Headers & UserType;
}> => {
  const URI = "/auth";

  const res = await apiClient({
    method: "POST",
    uri: URI,
    params: {
      email,
      password,
    },
  });

  return res;
};