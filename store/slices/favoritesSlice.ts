import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

import {
  fetchRemoteFavoriteIds,
  removeRemoteFavorite,
  setRemoteFavorite,
} from "../../api/firebase/favorites";

import {
  getFavoriteIds,
  getPendingFavoriteRows,
  markFavoritesSynced,
  setFavoriteLocal,
} from "../../database/favoritesRepository";

type FavoritesState = {
  ids: string[];
  loading: boolean;
  syncing: boolean;
  error: string | null;
};

const initialState: FavoritesState = {
  ids: [],
  loading: false,
  syncing: false,
  error: null,
};

export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async (uid: string) => {
    const ids = await getFavoriteIds(uid);
    return ids;
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ uid, storeId }: { uid: string; storeId: string }, { getState }) => {
    const state = getState() as RootState;
    const isFav = state.favorites.ids.includes(storeId);
    const next = !isFav;

    await setFavoriteLocal(uid, storeId, next);

    const ids = await getFavoriteIds(uid);
    return ids;
  }
);

export const syncFavorites = createAsyncThunk(
  "favorites/syncFavorites",
  async (uid: string) => {
    // 1) empujar pendientes locales
    const pending = await getPendingFavoriteRows(uid);
    for (const row of pending) {
      if (row.isFav === 1) await setRemoteFavorite(uid, row.storeId);
      else await removeRemoteFavorite(uid, row.storeId);
    }
    await markFavoritesSynced(uid);

    // 2) traer remoto (opcional: podríamos mergear, por ahora dejamos local como fuente)
    const _remote = await fetchRemoteFavoriteIds(uid);
    // si querés, en el futuro mergeamos remoto->local

    // 3) devolver local actual
    return await getFavoriteIds(uid);
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error cargando favoritos";
      })

      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.ids = action.payload;
      })

      .addCase(syncFavorites.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncFavorites.fulfilled, (state, action) => {
        state.syncing = false;
        state.ids = action.payload;
      })
      .addCase(syncFavorites.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.error.message ?? "Error sincronizando favoritos";
      });
  },
});

export default favoritesSlice.reducer;
