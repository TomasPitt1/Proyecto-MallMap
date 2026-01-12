import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function AuthLayout() {
  const { isAuthenticated, isReady } = useSelector((s: RootState) => s.auth);

  if (!isReady) return null;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
