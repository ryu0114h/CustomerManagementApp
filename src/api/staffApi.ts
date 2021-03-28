import apiClient from "./apiClient";
import { InputFormStaffType, StaffType } from "../reducks/staff/types";

export const fetchStaffsApi = async (): Promise<{ data: StaffType }> => {
  const URI = "/staff";

  const res = await apiClient({
    method: "GET",
    uri: URI,
  });

  return res.data;
};

export const updateStaffApi = async (
  props: StaffType
): Promise<{
  data: StaffType;
  headers: Headers & StaffType;
}> => {
  const URI = "/staff_auth";

  const res = await apiClient({
    method: "PATCH",
    uri: URI,
    params: props,
  });

  return res;
};

export const signinStaffApi = async ({
  email,
  password,
}: InputFormStaffType): Promise<{
  data: StaffType;
  headers: Headers & StaffType;
}> => {
  const URI = "/staff_auth/sign_in";

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

export const signoutStaffApi = async (): Promise<{
  data: StaffType;
  headers: Headers & StaffType;
}> => {
  const URI = "/staff_auth/sign_out";

  const res = await apiClient({
    method: "DELETE",
    uri: URI,
  });
  return res;
};

export const signupStaffApi = async ({
  email,
  password,
}: InputFormStaffType): Promise<{
  data: StaffType;
  headers: Headers & StaffType;
}> => {
  const URI = "/staff_auth";

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
