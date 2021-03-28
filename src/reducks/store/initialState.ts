import { RootState } from "./store";

const initialState: RootState = {
  staff: {
    id: null,
    name: "",
    email: "",
  },
  customers: [],
  reservations: [],
};

export default initialState;
