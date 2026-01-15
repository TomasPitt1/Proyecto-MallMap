import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import StoreCard from "../../components/stores/StoreCard";
import type { RootState } from "../../store";

export default function FavoritesScreen() {
  const favoriteIds = useSelector((s: RootState) => s.favorites.ids);
  const stores = useSelector((s: RootState) => s.stores.items);

  const favStores = stores.filter((st) => favoriteIds.includes(st.id));

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Favoritos</Text>

      <FlatList
        data={favStores}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <StoreCard store={item} />}
        ListEmptyComponent={
          <View style={{ paddingTop: 40, alignItems: "center" }}>
            <Text style={{ opacity: 0.7 }}>Todavía no marcaste favoritos.</Text>
          </View>
        }
      />
    </View>
  );
}
