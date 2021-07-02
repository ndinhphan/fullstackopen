const FILTER_CHANGE = 'FILTER_CHANGE'

export const filterChange = (filter) => (
  {
    type: FILTER_CHANGE,
    filter
  }
)