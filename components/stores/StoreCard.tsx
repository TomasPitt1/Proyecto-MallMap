import { router } from "expo-router";
import { memo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import type { Store } from "../../api/firebase/rtdb";
import type { AppDispatch, RootState } from "../../store";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

type Props = {
  store: Store;
};

function StoreCard({ store }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const uid = useSelector((s: RootState) => s.auth.uid);
  const isFav = useSelector((s: RootState) =>
    s.favorites.ids.includes(store.id),
  );

  const [busy, setBusy] = useState(false);

  const onToggleFav = async () => {
    if (!uid) {
      router.push("/(auth)/login" as any);
      return;
    }

    if (busy) return;
    setBusy(true);

    try {
      await dispatch(toggleFavorite({ uid, storeId: store.id }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <Pressable
        onPress={() => router.push(`/store/${store.id}` as any)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingRight: 56,
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 1,
            backgroundColor: "#f2f2f2",
          }}
        >
          {store.imageUrl ? (
            <Image
              source={{ uri: store.imageUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ opacity: 0.6 }}>🏬</Text>
            </View>
          )}
        </View>

        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }} numberOfLines={1}>
            {store.name}
          </Text>

          <Text style={{ opacity: 0.8 }} numberOfLines={2}>
            {store.category} • Piso {store.floor} • {store.zone}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFav}
        disabled={busy}
        hitSlop={14}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            color: isFav ? "#E53935" : "#333",
          }}
        >
          {isFav ? "♥" : "♡"}
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(StoreCard);
