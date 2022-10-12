const initialState = {
  name: "",
};

export default function reducer(state = initialState, action) {
  if (action.type == "user") {
    return {
      ...state,
      name: action.payload,
    };
    return state;
  }
}
