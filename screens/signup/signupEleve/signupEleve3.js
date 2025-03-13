import {
  StyleSheet,
  Text,
  Platform,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateThird } from "../../../reducers/eleve";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Progress from "react-native-progress";

export default function InscriptionEleve3({ navigation }) {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0.5);

  const [objectif, setObjectif] = useState("");

  const handleClickPerte = (newObjectif) => {
    setObjectif("Perte de poids");
    dispatch(
      updateThird({
        objectif: newObjectif,
      })
    );
    navigation.navigate("SignupEleve4");
  };

  const handleClickMuscle = (newObjectif) => {
    setObjectif("Prise de muscles");
    dispatch(
      updateThird({
        objectif: newObjectif,
      })
    );
    navigation.navigate("SignupEleve4");
  };

  const handleClickRéath = (newObjectif) => {
    setObjectif("Réathlétisation");
    dispatch(
      updateThird({
        objectif: newObjectif,
      })
    );
    navigation.navigate("SignupEleve4");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 0.15;
        return newProgress > 0.75 ? 0.75 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
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
          <View style={styles.iconBack}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupEleve2")}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faArrowLeft}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faXmark}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            <Progress.Circle
              size={50}
              progress={progress}
              showsText
              borderWidth={0}
              thickness={8}
              textStyle={{ fontWeight: "bold", fontSize: 10 }}
              color="#DFB81C"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Quel est votre objectif ?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.eleveBtn}
              onPress={() => handleClickPerte("Perte de poids")}
            >
              <View style={styles.absoluteView}>
                <Text style={styles.textBtn}>Perte de poids</Text>
              </View>
              <Image
                source={require("../../../assets/coach.jpg")}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.coachBtn}
              onPress={() => handleClickMuscle("Prise de muscle")}
            >
              <View style={styles.absoluteView}>
                <Text style={styles.textBtn}>Prendre du muscle</Text>
              </View>
              <Image
                source={require("../../../assets/eleve.jpg")}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.coachBtn}
              onPress={() => handleClickRéath("Réathlétisation")}
            >
              <View style={styles.absoluteView}>
                <Text style={styles.textBtn}>Réathlétisation</Text>
              </View>
              <Image
                source={require("../../../assets/eleve.jpg")}
                style={styles.img}
              />
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
  },
  iconBack: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 70,
  },

  titleContainer: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "roboto",
    fontWeight: 600,
    color: "white",
  },
  error: {
    color: "red",
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 250,
    gap: 10,
    padding: 40,
  },
  titleInput: {
    color: "#DFB81C",
    fontSize: 36,
    fontWeight: 600,
  },
  input: {
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: 314,
    color: "white",
    marginBottom: 20,
  },

  inputPass: { color: "white", width: "100%" },
  icon: { paddingRight: 40 },
  nextBtn: {
    backgroundColor: "white",
    height: 42,
    width: 174,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnPosition: {
    display: "absolute",
    marginTop: 170,
  },
  buttonContainer: {
    height: 400,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 80,
  },
  eleveBtn: {
    height: 100,
    width: 344,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  coachBtn: {
    height: 100,
    width: 344,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  absoluteView: {
    position: "absolute",
  },
  img: {
    height: 100,
    width: 344,
    backgroundColor: "transparent",
    zIndex: -1,
    borderRadius: 10,
  },
});
