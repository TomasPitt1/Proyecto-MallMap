import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { listenAuth } from "../api/firebase/auth";
import { initDB } from "../database/sqlite";
import { store } from "../store";
import { clearUser, setUser } from "../store/slices/authSlice";

function RootNavigator() {
  const dispatch = useDispatch();

  // 🔐 Firebase Auth listener
  useEffect(() => {
    const unsub = listenAuth((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, [dispatch]);

  // 🗄️ Inicializar SQLite (una sola vez)
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
