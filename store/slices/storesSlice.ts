import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchStoresByMallId, Store } from "../../api/firebase/rtdb";
import { getLocalStores, saveStores } from "../../database/storesRepository";

type StoresState = {
  items: Store[];
  loading: boolean;
  syncing: boolean;
  error: string | null;
  mallId: string;
  lastSyncAt: number | null;
};

const initialState: StoresState = {
  items: [],
  loading: false,
  syncing: false,
  error: null,
  mallId: "mall1",
  lastSyncAt: null,
};

export const loadStores = createAsyncThunk("stores/loadStores", async () => {
  const local = await getLocalStores();
  return local;
});

export const syncStores = createAsyncThunk(
  "stores/syncStores",
  async (mallId: string) => {
    const remote = await fetchStoresByMallId(mallId);
    await saveStores(remote);
    return remote;
  },
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
        state.items = action.payload;
      })
      .addCase(loadStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error leyendo cache (SQLite)";
      })

      .addCase(syncStores.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncStores.fulfilled, (state, action) => {
        state.syncing = false;
        state.items = action.payload;
        state.lastSyncAt = Date.now();
      })
      .addCase(syncStores.rejected, (state, action) => {
        state.syncing = false;

        state.error =
          action.error.message ?? "No se pudo sincronizar (Firebase)";
      });
  },
});

export default storesSlice.reducer;

export const selectStoreById = (id: string) => (state: RootState) =>
  state.stores.items.find((store) => store.id === id);

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
