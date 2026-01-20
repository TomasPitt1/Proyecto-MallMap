import * as Location from "expo-location";

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status;
}

export async function getCurrentPosition() {
  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
}
