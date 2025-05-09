import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WalletScreen() {
  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title} accessibilityRole="text">
            Portefeuilles
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/page_construction.png")}
            resizeMode="cover"
            accessibilityLabel="Page en construction"
            accessibilityHint="Image d'une page en construction"
            accessibilityRole="image"
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    color: "white",
  },
  image: {
    width: 300,
    height: 300,
  },
});
