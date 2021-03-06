import { CustomersType, CustomerType } from "../reducks/customers/types";
import apiClient from "./apiClient";

export const addCustomerApi = async (
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

export const deleteCustomerApi = async (
  id: number
): Promise<{ data: CustomerType }> => {
  const URI = `/customers/${id}`;

  const res = await apiClient({
    method: "DELETE",
    uri: URI,
  });

  return res.data;
};

export const updateCustomerApi = async (
  customer: CustomerType
): Promise<{ data: CustomerType }> => {
  const URI = `/customers/${customer.id}`;

  const res = await apiClient({
    method: "PATCH",
    uri: URI,
    params: customer,
  });

  return res.data;
};

export const fetchCustomersApi = async (): Promise<{ data: CustomersType }> => {
  const URI = "/customers";

  const res = await apiClient({
    method: "GET",
    uri: URI,
  });

  return res.data;
};
