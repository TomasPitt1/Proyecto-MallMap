import { router } from "expo-router";
import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
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
    s.favorites.ids.includes(store.id)
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
        padding: 14,
        position: "relative",
      }}
    >
      {/* 🧭 Área tocable para ir al detalle */}
      <Pressable
        onPress={() => router.push(`/store/${store.id}` as any)}
        style={{ paddingRight: 56, gap: 6 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{store.name}</Text>

        <Text style={{ opacity: 0.8 }}>
          {store.category} • Piso {store.floor} • {store.zone}
        </Text>
      </Pressable>

      {/* ❤️ Botón arriba de todo */}
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
          zIndex: 999,
          elevation: 10,
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {isFav ? "♥" : "♡"}
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(StoreCard);
