import { RootState } from "./store";

const initialState: RootState = {
  staff: {
    id: null,
    name: "",
    email: "",
  },
  users: [],
  reservations: [],
};

export default initialState;
