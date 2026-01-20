import { Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
};

export default function LocationFAB({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        right: 18,
        bottom: 18,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        zIndex: 999,
      }}
      hitSlop={14}
    >
      <Text style={{ color: "white", fontSize: 22 }}>📍</Text>
    </Pressable>
  );
}
