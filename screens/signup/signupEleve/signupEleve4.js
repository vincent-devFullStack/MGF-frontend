import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finalUpdate } from "../../../reducers/eleve";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { checkBody } from "../../../modules/checkBody";

export default function InscriptionEleve4({ navigation }) {
  const dispatch = useDispatch();

  const data = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
  ];

  const [sexe, setSexe] = useState("");
  const [taille, setTaille] = useState("");
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [poids, setPoids] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const eleveData = useSelector((state) => state.eleve.value);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDateNaissance(selectedDate);
    }
  };

  const BACKEND_ADDRESS = "http://192.168.1.19:3000";

  async function registerUser() {
    if (
      !checkBody(
        {
          sexe: sexe,
          taille: taille,
          dateNaissance: dateNaissance,
          poids: poids,
        },
        ["sexe", "taille", "dateNaissance", "poids"]
      )
    ) {
      setError("Tous les champs sont requis");
      return;
    }

    setError("");
    const formattedDateNaissance = dateNaissance.toISOString().split("T")[0];

    dispatch(
      finalUpdate({
        ...eleveData,
        sexe: sexe,
        taille: taille,
        dateNaissance: formattedDateNaissance,
        poids: poids,
      })
    );

    try {
      const response = await fetch(`${BACKEND_ADDRESS}/signupEleve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: eleveData.role,
          firstname: eleveData.firstname,
          name: eleveData.name,
          email: eleveData.email,
          password: eleveData.password,
          objectif: eleveData.objectif,
          dateNaissance: eleveData.dateNaissance,
          sexe: eleveData.sexe,
          taille: eleveData.taille,
          poids: eleveData.poids,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(" Erreur fetch :", error);
    }
    const data = await response.json();

    if (data.result) {
      navigation.navigate("HomeEleve");
    } else {
      setError(data.message || "Erreur lors de l'inscription");
    }
  }

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
                onChange={(item) => setSexe(item.value)}
              />
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Votre taille"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setTaille(value)}
                  value={taille}
                />
              </View>
            </View>
            <View style={styles.ligne2}>
              <View style={styles.containerDate}>
                <Button
                  title="Indiquez votre date de naissance"
                  onPress={() => setShow(true)}
                />
                {show && (
                  <DateTimePicker
                    value={dateNaissance}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={onChange}
                  />
                )}
                <Text style={styles.dateText}>
                  Date sélectionnée :{" "}
                  {dateNaissance.toLocaleDateString("fr-FR")}
                </Text>
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText1}
                  placeholder="Votre naissance"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setDateNaissance(value)}
                  value={dateNaissance}
                />
              </View>
            </View>
            <View style={styles.ligne3}>
              <View style={styles.input1}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Votre poids"
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setPoids(value)}
                  value={poids}
                />
              </View>
            </View>
          </View>

          {error ? (
            <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          ) : null}

          <View style={styles.btnPosition}>
            <TouchableOpacity style={styles.nextBtn} onPress={registerUser}>
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
  },
  ligne3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  containerDate: {
    backgroundColor: "white",
    borderRadius: 5,
    position: "absolute",
    alignItems: "center",
    marginTop: 20,
    zIndex: 1,
    transform: [{ scale: 0.8 }, { translateX: 10 }],
    alignSelf: "center",
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});
