import { RootState } from "./store";

const initialState: RootState = {
  user: {
    accessToken: "",
    client: "",
    uid: "",
    isSignedIn: false,
  },
  customers: [
    {
      id: 1,
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      memo: "memo",
    },
  ],
};

export default initialState;
