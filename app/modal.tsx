import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { resetFilters, setCategory, setFloor } from "../store/slices/appSlice";

const CATEGORIES = ["Ropa", "Comida", "Deportes"];
const FLOORS = ["0", "1", "2"];

export default function FiltersModal() {
  const dispatch = useDispatch();
  const { category, floor } = useSelector((s: RootState) => s.app);

  return (
    <View style={{ flex: 1, padding: 20, gap: 14 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Filtros</Text>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "700" }}>Categoría</Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c}
              onPress={() => dispatch(setCategory(c === category ? null : c))}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                backgroundColor: c === category ? "black" : "transparent",
              }}
            >
              <Text style={{ color: c === category ? "white" : "black" }}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: "700" }}>Piso</Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          {FLOORS.map((f) => (
            <Pressable
              key={f}
              onPress={() => dispatch(setFloor(f === floor ? null : f))}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                backgroundColor: f === floor ? "black" : "transparent",
              }}
            >
              <Text style={{ color: f === floor ? "white" : "black" }}>
                Piso {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Pressable
          onPress={() => dispatch(resetFilters())}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Limpiar</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            backgroundColor: "black",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Aplicar</Text>
        </Pressable>
      </View>
    </View>
  );
}
