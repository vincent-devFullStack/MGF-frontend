import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Progress from "react-native-progress";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Inscription({ navigation }) {
  const [progress, setProgress] = useState(0);

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
              textStyle={{ fontWeight: "bold", fontSize: 12 }}
              color="#DFB81C"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Qui êtes vous ?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.eleveBtn}
              onPress={() => navigation.navigate("SignupEleve1")}
            >
              <View style={styles.absoluteView}>
                <Text style={styles.textBtn}>Élève</Text>
              </View>
              <Image
                source={require("../../assets/coach.jpg")}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.coachBtn}
              onPress={() => navigation.navigate("SignupCoach1")}
            >
              <View style={styles.absoluteView}>
                <Text style={styles.textBtn}>Coach</Text>
              </View>
              <Image
                source={require("../../assets/eleve.jpg")}
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
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
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
    fontSize: 36,
    fontFamily: "roboto",
    fontWeight: 600,
    color: "white",
  },
  buttonContainer: {
    height: 300,
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
