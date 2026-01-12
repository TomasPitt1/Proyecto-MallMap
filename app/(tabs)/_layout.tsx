import { Redirect, Tabs } from "expo-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function TabsLayout() {
  const { isAuthenticated, isReady } = useSelector((s: RootState) => s.auth);

  if (!isReady) return null; // o un loader si querés
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Explorar", headerTitle: "MallMap" }}
      />
      <Tabs.Screen name="favorites" options={{ title: "Favoritos" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
