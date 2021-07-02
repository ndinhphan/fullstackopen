
const initialState = {
  notification: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {notification: action.data};
    case "REMOVE_NOTIFICATION":
      return {notification: ''};
    default:
      return state;
  }
};

export default notificationReducer;
