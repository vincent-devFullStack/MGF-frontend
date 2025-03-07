import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../env";
import VignetteEleve from "../../components/coach/VignetteEleve";

export default function ElevesScreen() {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [eleves, setEleves] = useState([]);

  useEffect(() => {
    // Fetch eleves coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/coach/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setEleves(data.eleves);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des élèves:", error);
          setEleves([]);
        });
    }
  }, [isFocused, coach]);

  const elevesList = eleves.map((data, i) => {
    return <VignetteEleve key={i} {...data} />;
  });

  if (!isFocused) {
    return <View />;
  }

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
          <View style={styles.box}>
            <Text style={styles.title}>Elèves</Text>
            <ScrollView contentContainerStyle={styles.containerEleves}>
              {eleves && elevesList}
            </ScrollView>
          </View>
          <View style={styles.boxBtn}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 70,
    padding: 40,
    gap: 10,
  },
  background: {
    flex: 1,
  },
  box: {
    width: "100%",
    height: "95%",
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerEleves: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  boxBtn: {
    height: "5%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: 120,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    borderRadius: 5,
  },
  buttonText: { fontSize: 14, color: "#21212E", fontWeight: "bold" },
});
