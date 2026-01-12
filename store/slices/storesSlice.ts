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

// --------------------
// Async thunk
// --------------------
export const loadStores = createAsyncThunk(
  "stores/loadStores",
  async (mallId: string) => {
    const stores = await fetchStoresByMallId(mallId);
    return { mallId, stores };
  }
);

// --------------------
// Slice
// --------------------
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

// --------------------
// Selectores
// --------------------

// Selector por ID (detalle de local)
export const selectStoreById = (id: string) => (state: RootState) =>
  state.stores.items.find((store) => store.id === id);

// Selector filtrado (buscador + filtros)
export const selectFilteredStores = (state: RootState) => {
  const { items } = state.stores;
  const { searchQuery, category, floor } = state.app;

  const query = searchQuery.trim().toLowerCase();

  return items.filter((store) => {
    const matchesQuery =
      query.length === 0 || store.name.toLowerCase().includes(query);

    const matchesCategory = !category || store.category === category;

    const matchesFloor = !floor || store.floor === floor;

    return matchesQuery && matchesCategory && matchesFloor;
  });
};
