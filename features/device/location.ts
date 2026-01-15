import * as Location from "expo-location";

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status; // "granted" | "denied" | "undetermined"
}

export async function getCurrentPosition() {
  // Con esto ya “usás interfaz del dispositivo” posta.
  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
}
