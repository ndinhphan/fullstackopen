export const notificationSet = (notification,time) => {
  return async (dispatch) => {
    dispatch({ type: "SET", data: notification });
    await setTimeout(async ()=>{
      dispatch({
        type: "REMOVE",
        data: "",
      })
    }, 1000)
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "REMOVE":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
