import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchStoresByMallId, Store } from "../../api/firebase/rtdb";

type StoresState = {
  items: Store[];
  loading: boolean;
  error: string | null;
  mallId: string;
};

const initialState: StoresState = {
  items: [],
  loading: false,
  error: null,
  mallId: "mall1", // por ahora fijo
};

export const loadStores = createAsyncThunk(
  "stores/loadStores",
  async (mallId: string) => {
    const stores = await fetchStoresByMallId(mallId);
    return { mallId, stores };
  }
);

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStores.fulfilled, (state, action) => {
        state.loading = false;
        state.mallId = action.payload.mallId;
        state.items = action.payload.stores;
      })
      .addCase(loadStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error cargando locales";
      });
  },
});

export default storesSlice.reducer;

export const selectStoreById = (id: string) => (state: RootState) =>
  state.stores.items.find((store) => store.id === id);
