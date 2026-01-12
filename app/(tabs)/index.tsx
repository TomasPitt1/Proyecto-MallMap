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
import SearchBar from "../../components/common/SearchBar";
import StoreCard from "../../components/stores/StoreCard";
import type { AppDispatch, RootState } from "../../store";
import { setSearchQuery } from "../../store/slices/appSlice";
import {
  loadStores,
  selectFilteredStores,
} from "../../store/slices/storesSlice";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, mallId } = useSelector((s: RootState) => s.stores);
  const searchQuery = useSelector((s: RootState) => s.app.searchQuery);
  const filtered = useSelector(selectFilteredStores);

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
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <SearchBar
        value={searchQuery}
        onChangeText={(t) => dispatch(setSearchQuery(t))}
        placeholder="Buscar local..."
      />

      <Pressable
        onPress={() => router.push("/modal")}
        style={{
          padding: 12,
          borderRadius: 12,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700" }}>Filtros</Text>
      </Pressable>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <StoreCard store={item} />}
        ListEmptyComponent={
          <View style={{ paddingTop: 40, alignItems: "center" }}>
            <Text style={{ opacity: 0.7 }}>No hay resultados.</Text>
          </View>
        }
      />
    </View>
  );
}
