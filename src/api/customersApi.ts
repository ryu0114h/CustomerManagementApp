import { CustomersType, CustomerType } from "../reducks/customers/types";
import apiClient from "./apiClient";

export const fetchCustomersApi = async (): Promise<{ data: CustomersType }> => {
  const URI = "/customers";

  const res = await apiClient({
    method: "GET",
    uri: URI,
    params: {},
  });

  return res.data;
};

export const addCustomersApi = async (
  customer: CustomerType
): Promise<{ data: CustomerType }> => {
  const URI = "/customers";

  const res = await apiClient({
    method: "POST",
    uri: URI,
    params: customer,
  });

  return res.data;
};
