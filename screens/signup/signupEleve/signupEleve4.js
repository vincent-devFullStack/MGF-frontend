import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { finalUpdate } from "../../../reducers/eleve";

import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function InscriptionEleve4({ navigation }) {
  const dispatch = useDispatch();

  // const BACKEND_ADDRESS = "http://192.168.1.19:3000";

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
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

          <View style={styles.progressbar}>
            <Text style={styles.pourcent}>60 %</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Quel est votre objectif ?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.eleveBtn}
              onPress={() => handleClickPerte()}
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
              onPress={() => handleClickMuscle()}
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
              onPress={() => handleClickRéath()}
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
  progressbar: {
    marginTop: 70,
    height: 50,
    width: 50,
    backgroundColor: "white",
    border: 10,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pourcent: {
    fontWeight: "bold",
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
