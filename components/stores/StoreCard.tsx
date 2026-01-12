import { router } from "expo-router";
import { memo } from "react";
import { Pressable, Text } from "react-native";
import { Store } from "../../api/firebase/rtdb";

type Props = {
  store: Store;
};

function StoreCard({ store }: Props) {
  return (
    <Pressable
      onPress={() => router.push(`/store/${store.id}`)}
      style={{
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        gap: 4,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700" }}>{store.name}</Text>

      <Text style={{ opacity: 0.8 }}>
        {store.category} • Piso {store.floor} • {store.zone}
      </Text>
    </Pressable>
  );
}

export default memo(StoreCard);
