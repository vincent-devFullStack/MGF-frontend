import { StyleSheet, Text, View } from "react-native";

export default function CalEleveScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendrier élève Screen</Text>
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
