import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function TabsLayout() {
  const { isAuthenticated, isReady } = useSelector((s: RootState) => s.auth);

  if (!isReady) return null; // o un loader si querés
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { marginTop: 2 }, // opcional
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Locales",
          headerTitle: "MallMap",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>🏪</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>❤️</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
