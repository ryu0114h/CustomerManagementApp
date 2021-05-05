import { RootState } from "./store";

const initialState: RootState = {
  staff: {
    id: null,
    name: "",
    email: "",
    image_url: "",
    address: "",
    postal_code: "",
    introduction_text: "",
  },
  users: [],
  reservations: [],
};

export default initialState;
