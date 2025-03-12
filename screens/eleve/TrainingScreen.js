import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function TrainingScreen({ route }) {
  const { fullData } = route.params || {};

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text>Séance du jour</Text>

          {/* Affichage du composant Video */}
          <View style={styles.video}></View>

          <LinearGradient
            colors={[
              "#101018",
              "#383853",
              "#4B4B70",
              "#54547E",
              "#54547E",
              "#54547E",
            ]}
            style={styles.background2}
          >
            <Text>Training élève Screen</Text>
          </LinearGradient>
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
  },
  background: {
    flex: 1,
  },
  video: {
    width: "80%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  videoSeance: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  background2: {
    marginTop: 20,
    height: "70%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
