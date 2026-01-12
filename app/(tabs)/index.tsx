import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loadStores } from "../../store/slices/storesSlice";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, mallId } = useSelector(
    (s: RootState) => s.stores
  );

  useEffect(() => {
    dispatch(loadStores(mallId));
  }, [dispatch, mallId]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Error</Text>
        <Text>{error}</Text>
        <Pressable
          onPress={() => dispatch(loadStores(mallId))}
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: "black",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/store/${item.id}`)}
            style={{
              borderWidth: 1,
              borderRadius: 12,
              padding: 14,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ opacity: 0.8 }}>
              {item.category} • Piso {item.floor} • {item.zone}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ paddingTop: 40, alignItems: "center" }}>
            <Text style={{ opacity: 0.7 }}>No hay locales cargados.</Text>
          </View>
        }
      />
    </View>
  );
}
