
const initialState = {
  notification: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {...state, notification: action.data};
    case "REMOVE_NOTIFICATION":
      return {...state, notification: ''};
    default:
      return state;
  }
};

export default notificationReducer;
