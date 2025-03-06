import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function HomeCoachScreen() {
  const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;
  const coach = useSelector((state) => state.coach.value);
  const [rdv, setRdv] = useState([]);

  useEffect(() => {
    // Fetch rdv coach from API
    fetch(`http://localhost:3000/rdv/${coach.token}`)
      .then((response) => response.json())
      .then((data) => {
        setRdv(data.rdv);
        console.log(data.rdv);
      });
  }, []);

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
          <Text style={styles.title}>Coachings du jour</Text>
          <ScrollView contentContainerStyle={styles.containerRdv}></ScrollView>
          <Text style={styles.secondTitle}>Echéances abonnements</Text>
          <ScrollView contentContainerStyle={styles.containerAbo}></ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    color: "white",
  },
  containerRdv: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  secondTitle: {
    fontSize: 24,
    color: "white",
  },
  containerAbo: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
});
