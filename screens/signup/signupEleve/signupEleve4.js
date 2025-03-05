import {
  StyleSheet,
  Text,
  TextInput,
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
import { Dropdown } from "react-native-element-dropdown";

export default function InscriptionEleve4({ navigation }) {
  const dispatch = useDispatch();

  const data = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
  ];

  const [sexe, setSexe] = useState("");
  const [taille, setTaille] = useState(0);
  const [dateNaissance, setDateNaissance] = useState(null);
  const [poids, setPoids] = useState(0);
  const [error, setError] = useState("");

  // const BACKEND_ADDRESS = "http://192.168.1.19:3000";

  const handleCheckInputs = async () => {
    if (!sexe || !taille) {
      setError("Tous les champs sont requis");
    } else {
      setError("");
    }
    if (error === "") {
      dispatch(
        finalUpdate({
          sexe: sexe,
          taille: taille,
          dateNaissance: dateNaissance,
          poids: poids,
        })
      );
      navigation.navigate("HomeEleve");
    }
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupEleve3")}
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
            <Text style={styles.pourcent}>80 %</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Un dernier petit effort !</Text>
          </View>
          <View style={styles.boxInput}>
            <View style={styles.ligne1}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder=" Votre sexe"
                value={sexe}
                onChange={(item) => {
                  setSexe(item.value);
                }}
              />
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Votre taille"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setTaille(value)}
                  value={taille}
                ></TextInput>
              </View>
            </View>
            <View style={styles.ligne2}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText1}
                  placeholder="Votre naissance"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setDateNaissance(value)}
                  value={dateNaissance}
                ></TextInput>
              </View>
              <View style={styles.input1}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Votre poids"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setPoids(value)}
                  value={poids}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.btnPosition}>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => handleCheckInputs()}
            >
              <Text style={styles.btn}>Continuer</Text>
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
    width: 110,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input1: {
    width: 110,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 17,
  },
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
  dropdown: {
    margin: 16,
    height: 40,
    width: 110,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  inputSearchStyle: {
    display: "none",
  },
  selectedTextStyle: {
    borderRadius: 10,
  },
  ligne1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ligne2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 9,
  },
});
