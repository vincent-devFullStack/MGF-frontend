import { StyleSheet, Text, View } from "react-native";

export default function ElevesScreen() {
  return (
    <View style={styles.container}>
      <Text>Elèves Screen</Text>
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
