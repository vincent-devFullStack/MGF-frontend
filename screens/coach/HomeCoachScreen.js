import { StyleSheet, Text, View } from "react-native";

export default function HomeCoachScreen() {
  return (
    <View style={styles.container}>
      <Text>Coach Home Screen</Text>
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
