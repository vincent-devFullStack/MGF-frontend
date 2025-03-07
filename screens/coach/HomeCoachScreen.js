import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import VignetteRdv from "../../components/coach/VignetteRdv";

import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";
import { formatDate } from "../../modules/formatDate";
import MaskedView from "@react-native-community/masked-view";

export default function HomeCoachScreen() {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [rdv, setRdv] = useState([]);
  const [date, setDate] = useState("");

  const dateCurrent = Date.now();

  useEffect(() => {
    setDate(formatDate(dateCurrent));
    // Fetch rdv coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/coach/rdv/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setRdv(data.rdv);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des RDV:", error);
          setRdv([]);
        });
    }
  }, [isFocused, coach]);

  const rdvList = rdv.map((data, i) => {
    if (date === formatDate(new Date(data.date))) {
      return <VignetteRdv key={i} {...data} />;
    }
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
          <View style={styles.boxOne}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={["black", "black", "black", "black", "transparent"]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.title}>Coachings du jour</Text>
              <ScrollView contentContainerStyle={styles.containerRdv}>
                {rdv && rdvList}
              </ScrollView>
            </MaskedView>
          </View>
          <View style={styles.boxTwo}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={["black", "black", "black", "black", "transparent"]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.secondTitle}>Echéances abonnements</Text>
              <ScrollView
                contentContainerStyle={styles.containerAbo}
              ></ScrollView>
            </MaskedView>
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
  boxOne: {
    width: "100%",
    height: "60%",
  },
  boxTwo: {
    width: "100%",
    height: "40%",
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerRdv: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  secondTitle: {
    fontSize: 24,
    color: "white",
  },
  containerAbo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  maskedContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden", // Important pour appliquer correctement le masque
  },
  maskGradient: {
    height: "100%", // S'assure que le gradient couvre toute la hauteur
    width: "100%", // et toute la largeur de l'écran
  },
});
