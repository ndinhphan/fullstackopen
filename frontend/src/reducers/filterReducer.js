

const FILTER_CHANGE = 'FILTER_CHANGE'

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case FILTER_CHANGE:
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
