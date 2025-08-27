import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFD700" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 10, fontSize: 16, color: "#555" },
});
