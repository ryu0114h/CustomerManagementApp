import axios, { AxiosResponse } from "axios";
import { loadAuth, setAuth } from "../lib/auth";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const apiClient = async ({
  method,
  uri,
  params,
}: {
  method: Method;
  uri: string;
  params?: Record<string, unknown>;
}): Promise<AxiosResponse> => {
  const auth = loadAuth();

  const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: "http://localhost:3100/api/v1/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Access-Token": auth && auth["access-token"],
      client: auth && auth.client,
      uid: auth && auth.uid,
    },
  });

  try {
    let res;
    switch (method) {
      case "GET":
        res = await apiInstance.get(uri, params);
        break;
      case "POST":
        res = await apiInstance.post(uri, params);
        break;
      case "PATCH":
        res = await apiInstance.patch(uri, params);
        break;
      case "PUT":
        res = await apiInstance.put(uri, params);
        break;
      case "DELETE":
        res = await apiInstance.delete(uri, params);
        break;
      default:
        throw new Error("Not available method");
    }
    setAuth(res.headers);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export default apiClient;
