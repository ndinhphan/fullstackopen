

const FILTER_CHANGE = 'FILTER_CHANGE'
const initialState = {
  filter: ''
}
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_CHANGE:
      return {...state, filter: action.filter};
    default:
      return state;
  }
};

export default filterReducer;
