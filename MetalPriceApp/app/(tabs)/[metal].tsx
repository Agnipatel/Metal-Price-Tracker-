import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { fetchMetalDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function MetalDetail() {
  const { metal } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMetalDetails(metal as string);
        setDetails(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [metal]);

  if (loading) return <Loader message={`Loading ${metal} details...`} />;
  //if (error) return <ThemedText type="error">{error}</ThemedText>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">{details.name} Details</ThemedText>
      <ThemedText>Current Price: {details.today}</ThemedText>
      <ThemedText>Previous Close: {details.previousClose}</ThemedText>
      <ThemedText>Previous Open: {details.previousOpen}</ThemedText>
      <ThemedText>Date: {details.date}</ThemedText>
      <ThemedText>Time: {details.time}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
});
