import axios, { AxiosResponse } from "axios";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const apiClient = ({
  method,
  uri,
  params,
}: {
  method: Method;
  uri: string;
  params: Record<string, unknown>;
}): Promise<AxiosResponse> => {
  const root = JSON.parse(localStorage.getItem("persist:root") as string);
  const user = JSON.parse(root.user);

  const apiInstance = axios.create({
    baseURL: "http://localhost:3100/api/v1/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Access-Token": user.accessToken,
      client: user.client,
      uid: user.uid,
    },
  });

  try {
    switch (method) {
      case "GET":
        return apiInstance.get(uri, params);
      case "POST":
        return apiInstance.post(uri, params);
      case "PATCH":
        return apiInstance.patch(uri, params);
      case "PUT":
        return apiInstance.put(uri, params);
      case "DELETE":
        return apiInstance.delete(uri, params);
      default:
        throw new Error("Not available method");
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export default apiClient;
