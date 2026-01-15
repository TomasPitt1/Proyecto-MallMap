import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import type { AppDispatch } from "../store";
import { store } from "../store";

import { listenAuth } from "../api/firebase/auth";
import { initDB } from "../database/sqlite";

import { clearUser, setUser } from "../store/slices/authSlice";
import { loadFavorites, syncFavorites } from "../store/slices/favoritesSlice";

function RootNavigator() {
  const dispatch = useDispatch<AppDispatch>();

  // 🗄️ Inicializar SQLite (una sola vez)
  useEffect(() => {
    initDB();
  }, []);

  // 🔐 Listener de Firebase Auth
  useEffect(() => {
    const unsub = listenAuth((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          })
        );

        // ❤️ Favoritos: cargar cache + sincronizar remoto
        dispatch(loadFavorites(user.uid));
        dispatch(syncFavorites(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
