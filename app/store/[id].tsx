import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectStoreById } from "../../store/slices/storesSlice";

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useSelector(selectStoreById(id!));

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detalle del local",
          headerBackTitle: "Locales",
        }}
      />

      {!store ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
          <Text style={{ marginTop: 10 }}>Cargando local...</Text>
        </View>
      ) : (
        <View style={{ flex: 1, padding: 20, gap: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "700" }}>{store.name}</Text>

          <Text style={{ fontSize: 16 }}>
            Categoría:{" "}
            <Text style={{ fontWeight: "600" }}>{store.category}</Text>
          </Text>

          <Text style={{ fontSize: 16 }}>
            Piso: <Text style={{ fontWeight: "600" }}>{store.floor}</Text>
          </Text>

          <Text style={{ fontSize: 16 }}>
            Ubicación: <Text style={{ fontWeight: "600" }}>{store.zone}</Text>
          </Text>
        </View>
      )}
    </>
  );
}
