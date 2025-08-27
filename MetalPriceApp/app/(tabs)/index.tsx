import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

const STATIC_METALS = [
  { name: "Gold", price24k: "65,000 INR", time: "2025-08-25 11:00 AM" },
  { name: "Silver", price24k: "750 INR", time: "2025-08-25 11:00 AM" },
  { name: "Platinum", price24k: "32,500 INR", time: "2025-08-25 11:00 AM" },
  { name: "Palladium", price24k: "28,000 INR", time: "2025-08-25 11:00 AM" },
];

export default function HomeScreen() {
  const [loading, setLoading] = useState(false); // no API, so no loading
  const [metals] = useState(STATIC_METALS);
  const router = useRouter();

  if (loading) return <Loader message="Fetching live metal prices..." />;

  return (
    <FlatList
      data={metals}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/${item.name.toLowerCase()}`)}>
          <ThemedView style={styles.card}>
            <ThemedText type="title">{item.name}</ThemedText>
            <ThemedText type="defaultSemiBold">{item.price24k}</ThemedText>
            <ThemedText type="caption">Updated at: {item.time}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "pink",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
