import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";
import storesReducer from "./slices/storesSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    stores: storesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
