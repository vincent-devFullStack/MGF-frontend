import { StyleSheet, Text, View } from "react-native";

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text>Stats Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
