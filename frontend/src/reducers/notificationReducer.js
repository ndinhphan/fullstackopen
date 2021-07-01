export const notificationSet = (notification,time) => {
  // return async (dispatch) => {
  //   dispatch({ type: "SET", data: notification });
  //   await setTimeout(async ()=>{
  //     dispatch({
  //       type: "REMOVE",
  //     })
  //   }, 1000)
  // };
  return {
    type:"SET"
  }
};

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "REMOVE":
      return '';
    default:
      return state;
  }
};

export default notificationReducer;
