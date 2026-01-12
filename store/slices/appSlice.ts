import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  searchQuery: string;
  category: string | null;
  floor: string | null;
};

const initialState: FiltersState = {
  searchQuery: "",
  category: null,
  floor: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setFloor: (state, action: PayloadAction<string | null>) => {
      state.floor = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.category = null;
      state.floor = null;
    },
  },
});

export const { setSearchQuery, setCategory, setFloor, resetFilters } =
  appSlice.actions;

export default appSlice.reducer;
