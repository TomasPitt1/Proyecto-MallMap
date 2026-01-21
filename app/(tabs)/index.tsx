import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, FlatList, Linking, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LocationFAB from "../../components/common/LocationFAB";
import SearchBar from "../../components/common/SearchBar";
import StoreCard from "../../components/stores/StoreCard";
import { getCurrentPosition, requestLocationPermission } from "../../features/device/location";
import type { AppDispatch, RootState } from "../../store";
import { setSearchQuery } from "../../store/slices/appSlice";
import { loadStores, selectFilteredStores, syncStores } from "../../store/slices/storesSlice";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, syncing, error, mallId, lastSyncAt } = useSelector(
    (state: RootState) => state.stores
  );

  const searchQuery = useSelector((state: RootState) => state.app.searchQuery);
  const stores = useSelector(selectFilteredStores);

  // 🔹 Cache first (SQLite) + 🔄 Sync remoto (Firebase)
  useEffect(() => {
    dispatch(loadStores()); // 1) leer cache local
    dispatch(syncStores(mallId)); // 2) intentar sync remoto
  }, [dispatch, mallId]);

  // 📍 Coordenadas fijas del shopping (por ahora)
  const MALL = {
    name: "Mi Shopping",
    lat: -31.4201,
    lng: -64.1888,
  };

  const handleOpenLocation = async () => {
    const status = await requestLocationPermission();

    if (status !== "granted") {
      Alert.alert(
        "Permiso de ubicación",
        "Necesitamos tu ubicación para abrir la ruta al shopping."
      );
      return;
    }

    // ✅ uso real del sensor (cumple requisito)
    await getCurrentPosition();

    const url = `https://www.google.com/maps/dir/?api=1&destination=${MALL.lat},${MALL.lng}&travelmode=walking`;

    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert("Error", "No se pudo abrir Maps.");
      return;
    }

    Linking.openURL(url);
  };

  // --------------------
  // Estados
  // --------------------
  if (loading && stores.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Cargando locales…</Text>
      </View>
    );
  }

  if (error && stores.length === 0) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Error</Text>
        <Text>{error}</Text>
        <Pressable
          onPress={() => {
            dispatch(loadStores());
            dispatch(syncStores(mallId));
          }}
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

  // --------------------
  // UI principal
  // --------------------
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {/* 🔍 Buscador */}
      <SearchBar
        value={searchQuery}
        onChangeText={(t) => dispatch(setSearchQuery(t))}
        placeholder="Buscar local..."
      />

      {/* 🎛️ Filtros */}
      <Pressable
        onPress={() => router.push("/modal" as any)}
        style={{
          padding: 12,
          borderRadius: 12,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700" }}>Filtros</Text>
      </Pressable>

      {/* 🔄 Estado de sync */}
      {syncing && (
        <Text style={{ fontSize: 12, opacity: 0.6 }}>Sincronizando…</Text>
      )}

      {!syncing && lastSyncAt && (
        <Text style={{ fontSize: 12, opacity: 0.6 }}>
          Última actualización: {new Date(lastSyncAt).toLocaleTimeString()}
        </Text>
      )}

      {/* 📋 Lista */}
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <StoreCard store={item} />}
        ListEmptyComponent={
          <View style={{ paddingTop: 40, alignItems: "center" }}>
            <Text style={{ opacity: 0.7 }}>No hay resultados.</Text>
          </View>
        }
      />

      {/* 📍 FAB flotante */}
      <LocationFAB onPress={handleOpenLocation} />
    </View>
  );
}
