const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case "GOOD":
      newState.good++;
      return (state = newState);
    case "OK":
      newState.ok++;
      return (state = newState);
    case "BAD":
      newState.bad++
      return state=newState
    case "ZERO":
      return state=Object.assign({}, initialState)
    default:
      return state;
  }
};

export default counterReducer;
