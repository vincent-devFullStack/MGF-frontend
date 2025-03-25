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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finalUpdate, updateEleve } from "../../../reducers/eleve";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from "react-native-progress";
import { BACKEND_ADDRESS } from "../../../env";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  sexe: Yup.string().required("Sexe requis"),
  taille: Yup.number().required("Taille requise"),
  dateNaissance: Yup.date().required("Date de naissance requise"),
  poids: Yup.number().required("Poids requis"),
});

export default function InscriptionEleve4({ navigation }) {
  const dispatch = useDispatch();

  const data = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
  ];

  const [sexe, setSexe] = useState("");
  const [taille, setTaille] = useState(0.75);
  const [progress, setProgress] = useState(0.75);
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [poids, setPoids] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const eleveData = useSelector((state) => state.eleve.value);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDateNaissance(selectedDate);
    }
  };

  async function registerUser() {
    try {
      // Awaiting for Yup to validate text
      await signUpSchema.validate(
        { sexe, taille, dateNaissance, poids },
        { abortEarly: false }
      );

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});

      const formattedDateNaissance = dateNaissance.toISOString().split("T")[0];
      console.log(formattedDateNaissance);

      dispatch(
        finalUpdate({
          ...eleveData,
          sexe: sexe,
          taille: taille,
          dateNaissance: formattedDateNaissance,
          poids: poids,
        })
      );

      const response = await fetch(`${BACKEND_ADDRESS}/signupEleve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: eleveData.role,
          firstname: eleveData.firstname,
          name: eleveData.name,
          email: eleveData.email,
          password: eleveData.password,
          secretWord: eleveData.secretWord,
          objectif: eleveData.objectif,
          dateNaissance: eleveData.dateNaissance,
          sexe: eleveData.sexe,
          taille: eleveData.taille,
          poids: eleveData.poids,
        }),
      });

      const data = await response.json();
      // console.log(data);

      if (data.result) {
        dispatch(
          updateEleve({
            token: data.data.token,
            role: data.data.role,
            firstname: data.data.firstname,
            name: data.data.name,
            email: data.data.email,
            password: data.data.password,
          })
        );

        navigation.navigate("EleveTabs", { screen: "HomeEleve" });
      } else {
        setErrors({
          ...errors,
          data: data.message || "Erreur lors de l'inscription",
        });
      }
    } catch (error) {
      // Setting error messages identified by Yup
      if (error instanceof Yup.ValidationError) {
        // Extracting Yup specific validation errors from list of total errors
        const yupErrors = {};
        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });

        // Saving extracted errors
        setErrors(yupErrors);
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 0.15;
        return newProgress > 1 ? 1 : newProgress;
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <View style={styles.iconBack}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupEleve3")}
                accessibilityLabel="Revenir à l'écran précédent"
                accessibilityHint="Retourner à l'écran précédent"
                accessibilityRole="button"
                accessible={true}
              >
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faArrowLeft}
                  size={20}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                accessibilityLabel="Revenir à l'écran d'accueil"
                accessibilityHint="Fermer l'inscription"
                accessibilityRole="button"
                accessible={true}
              >
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faXmark}
                  size={20}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={styles.container2}
              accessible={true}
              accessibilityRole="progressbar"
            >
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
              <Text style={styles.title} accessibilityRole="header">
                Un dernier petit effort !
              </Text>
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
                  accessibilityLabel="Sélection du sexe"
                  accessibilityHint="Choisissez entre Homme et Femme"
                  accessibilityRole="menu"
                />
                <View style={styles.input}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Votre taille"
                    placeholderTextColor={"black"}
                    onChangeText={(value) => setTaille(value)}
                    value={taille}
                    keyboardType="numeric"
                    accessibilityLabel="Taille en centimètres"
                    accessibilityHint="Entrez votre taille en centimètres"
                    accessibilityRole="text"
                  />
                </View>
              </View>
              <View style={styles.ligne2}>
                <View style={styles.containerDate}>
                  <Button
                    title="Indiquez votre date de naissance"
                    onPress={() => setShow(true)}
                    accessibilityLabel="Bouton pour choisir votre date de naissance"
                    accessibilityHint="Ouvre un calendrier pour sélectionner votre date de naissance"
                    accessibilityRole="button"
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
                    keyboardType="numeric"
                    accessibilityLabel="Poids en kilogrammes"
                    accessibilityHint="Entrez votre poids en kilogrammes"
                    accessibilityRole="text"
                  />
                </View>
              </View>
            </View>
            {errors.sexe && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errors.sexe}
              </Text>
            )}

            {errors.taille && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errors.taille}
              </Text>
            )}

            {errors.dateNaissance && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errors.dateNaissance}
              </Text>
            )}

            {errors.poids && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errors.poids}
              </Text>
            )}

            {errors.data && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errors.data}
              </Text>
            )}

            <View style={styles.btnPosition}>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={registerUser}
                accessibilityLabel="Finaliser l'inscription"
                accessibilityHint="Valide votre inscription et vous emmène à la page d'accueil"
                accessibilityRole="button"
              >
                <Text style={styles.btn}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
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
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  btnPosition: {
    marginTop: 170,
    marginBottom: 40,
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
