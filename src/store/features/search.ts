import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const getSearchQuery = (state: any) => state.entities.search;

export const { setSearchQuery } = slice.actions;
export default slice.reducer;
