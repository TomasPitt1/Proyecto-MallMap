import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { firebaseLogin } from "../../api/firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      Alert.alert("Faltan datos", "Completá email y contraseña.");
      return;
    }

    try {
      setLoading(true);
      await firebaseLogin(cleanEmail, password);
      // ✅ No navegamos manualmente:
      // el listener onAuthStateChanged (en app/_layout.tsx) setea el usuario
      // y el route guard te manda a (tabs).
    } catch (e: any) {
      Alert.alert("Error al iniciar sesión", e?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 30, fontWeight: "700", textAlign: "center" }}>
        MallMap
      </Text>
      <Text style={{ textAlign: "center", opacity: 0.7 }}>
        Iniciá sesión para continuar
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
        editable={!loading}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
        editable={!loading}
      />

      <Pressable
        onPress={onLogin}
        disabled={loading}
        style={{
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: loading ? "#444" : "black",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {loading ? <ActivityIndicator color="white" /> : null}
        <Text style={{ color: "white", fontWeight: "700" }}>
          {loading ? "Ingresando..." : "Entrar"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(auth)/register")}
        disabled={loading}
      >
        <Text style={{ textAlign: "center" }}>
          ¿No tenés cuenta?{" "}
          <Text style={{ fontWeight: "700" }}>Registrate</Text>
        </Text>
      </Pressable>
    </View>
  );
}
