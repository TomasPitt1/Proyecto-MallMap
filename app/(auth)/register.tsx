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
import { firebaseRegister } from "../../api/firebase/auth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password || !confirm) {
      Alert.alert("Faltan datos", "Completá email y contraseña.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña débil", "Usá al menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("No coincide", "Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      await firebaseRegister(cleanEmail, password);
    } catch (e: any) {
      Alert.alert("Error al registrarse", e?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center" }}>
        Crear cuenta
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
        placeholder="Contraseña (mín. 6)"
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
        editable={!loading}
      />

      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirmar contraseña"
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
        editable={!loading}
      />

      <Pressable
        onPress={onRegister}
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
          {loading ? "Creando..." : "Crear cuenta"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/(auth)/login")}
        disabled={loading}
      >
        <Text style={{ textAlign: "center" }}>
          Ya tengo cuenta{" "}
          <Text style={{ fontWeight: "700" }}>Iniciar sesión</Text>
        </Text>
      </Pressable>
    </View>
  );
}
