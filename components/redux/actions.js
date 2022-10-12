export default function profile(name) {
  return (dispatch) => {
    dispatch({
      type: "user",
      payload: name,
    });
  };
}
