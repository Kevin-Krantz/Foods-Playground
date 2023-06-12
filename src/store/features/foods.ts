import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "foods",
  initialState: {
    originalFoods: [],
    foods: [],
  },
  reducers: {
    setOriginalFoods: (state, action) => {
      state.originalFoods = action.payload;
      state.foods = action.payload;
    },
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    resetFoods: (state) => {
      state.foods = state.originalFoods;
    },
  },
});

export const getFoods = (state: any) => state.entities.foods;
export const getOriginalFoods = (state: any) => state.entities.originalFoods;

export const { setOriginalFoods, setFoods, resetFoods } = slice.actions;
export default slice.reducer;
