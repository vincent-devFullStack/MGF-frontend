import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function TrainingScreen({ route, navigation }) {
  const { fullData } = route.params || {};

  console.log(fullData);

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeEleve")}>
            <FontAwesomeIcon
              style={styles.iconBack}
              icon={faArrowLeft}
              size={20}
              color={"white"}
            />
          </TouchableOpacity>
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
            <Text style={styles.title}>Soulevé de terre</Text>
            <Text style={styles.desc}>Carge recommandée : 140 kg</Text>
            <Text style={styles.desc}>Mouvement demandé: Contrôlé</Text>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  desc: {
    color: "#fff",
  },
  iconBack: {
    position: "absolute",
    marginTop: "15%",
    right: "40%",
  },
});
