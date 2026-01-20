import { Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Provider, useDispatch } from "react-redux";

import type { AppDispatch } from "../store";
import { store } from "../store";

import { listenAuth } from "../api/firebase/auth";
import { initDB } from "../database/sqlite";

import { clearUser, setUser } from "../store/slices/authSlice";
import { loadFavorites, syncFavorites } from "../store/slices/favoritesSlice";

function RootNavigator() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    const unsub = listenAuth((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          }),
        );

        dispatch(loadFavorites(user.uid));
        dispatch(syncFavorites(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F5F5F5" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
