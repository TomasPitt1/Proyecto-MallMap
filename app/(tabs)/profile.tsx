import { Alert, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { firebaseLogout } from "../../api/firebase/auth";
import type { RootState } from "../../store";

export default function ProfileScreen() {
  const { email, uid } = useSelector((state: RootState) => state.auth);

  const onLogout = async () => {
    try {
      await firebaseLogout();
      // ✅ No navegamos manualmente:
      // onAuthStateChanged limpia el usuario y el route guard te manda a login.
    } catch (e: any) {
      Alert.alert("Error al cerrar sesión", e?.message ?? "Error desconocido");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}>
        Perfil
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 14,
          gap: 6,
        }}
      >
        <Text style={{ fontWeight: "700" }}>Usuario</Text>
        <Text style={{ opacity: 0.8 }}>Email: {email ?? "-"}</Text>
        <Text style={{ opacity: 0.8 }}>UID: {uid ?? "-"}</Text>
      </View>

      <Pressable
        onPress={onLogout}
        style={{
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
