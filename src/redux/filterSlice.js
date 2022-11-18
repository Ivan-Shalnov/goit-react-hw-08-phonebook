const { createSlice } = require('@reduxjs/toolkit');

const filterInitState = '';
const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitState,
  reducers: {
    setFilter(_, action) {
      return action.payload;
    },
  },
});
export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
