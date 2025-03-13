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
import MaskedView from "@react-native-community/masked-view";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";
import Vignette from "../../components/coach/Vignette";

export default function ProgsScreen({ navigation }) {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [progs, setProgs] = useState([]);
  const [exos, setExos] = useState([]);

  useEffect(() => {
    // Fetch progs & exos coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/programme/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setProgs(data.programmes || []);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des programmes:", error);
          setProgs([]);
        });

      fetch(`${BACKEND_ADDRESS}/exercice/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setExos(data.exercices || []);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des exercices:", error);
          setExos([]);
        });
    }
  }, [isFocused]);

  const progsList = progs.map((prog, i) => <Vignette key={i} {...prog} />);

  const exosList = exos.map((exo, i) => <Vignette key={i} {...exo} />);

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
                  colors={[
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "transparent",
                    "transparent",
                  ]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.title}>Programmes</Text>
              <ScrollView
                contentContainerStyle={styles.containerProg}
                showsVerticalScrollIndicator={false}
              >
                {progs && progsList}
              </ScrollView>
            </MaskedView>
            <View style={styles.boxBtn}>
              <TouchableOpacity
                style={styles.buttonWhite}
                onPress={() =>
                  navigation.navigate("ModalProgs", {
                    titre: "Programmes",
                    path: "programme",
                  })
                }
              >
                <Text style={styles.buttonText}>Voir tout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ModalCreateProg")}
              >
                <Text style={styles.buttonText}>Nouveau programme</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxTwo}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={[
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "transparent",
                    "transparent",
                  ]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.secondTitle}>Exercices</Text>
              <ScrollView
                contentContainerStyle={styles.containerExo}
                showsVerticalScrollIndicator={false}
              >
                {exos && exosList}
              </ScrollView>
            </MaskedView>
            <View style={styles.boxBtn}>
              <TouchableOpacity
                style={styles.buttonWhite}
                onPress={() =>
                  navigation.navigate("ModalProgs", {
                    titre: "Exercices",
                    path: "exercice",
                  })
                }
              >
                <Text style={styles.buttonText}>Voir tout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ModalCreateExo")}
              >
                <Text style={styles.buttonText}>Nouveau exercice</Text>
              </TouchableOpacity>
            </View>
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
    padding: 15,
  },
  boxOne: {
    width: "100%",
    height: "50%",
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerProg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  boxTwo: {
    width: "100%",
    height: "50%",
  },
  secondTitle: {
    fontSize: 34,
    color: "white",
  },
  containerExo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  boxBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 35,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonWhite: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 12,
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
