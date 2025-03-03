import { StyleSheet, Text, View } from "react-native";

export default function NutritionScreen() {
  return (
    <View style={styles.container}>
      <Text>Nutrition Screen</Text>
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
