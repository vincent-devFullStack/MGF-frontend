import {
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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSecond } from "../../../reducers/coach";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Progress from "react-native-progress";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Nom requis"),
  firstname: Yup.string().required("Prénom requis"),
});

export default function InscriptionCoach2({ navigation }) {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0.25);

  const handleCheckInputs = async () => {
    try {
      // Awaiting for Yup to validate text
      await signUpSchema.validate({ name, firstname }, { abortEarly: false });

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});

      dispatch(
        updateSecond({
          firstname: firstname,
          name: name,
        })
      );
      navigation.navigate("SignupCoach3");
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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 0.15;
        return newProgress > 0.5 ? 0.5 : newProgress;
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
              onPress={() => navigation.navigate("SignupCoach1")}
              accessibilityLabel="Retour à la page précédente"
              accessibilityHint="revenir à l'écran précèdent"
              accessibilityRole="button"
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
            accessibilityValue={{
              min: 0,
              max: 100,
              now: progress * 100,
              text: `${progress * 100}%`,
            }}
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

          <View
            style={styles.titleContainer}
            accessible={true}
            accessibilityRole="header"
          >
            <Text style={styles.title}>Création de compte</Text>
          </View>
          <View style={styles.boxInput}>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Indiquez votre prénom"
                placeholderTextColor={"white"}
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
                paddingBottom={10}
                accessibilityLabel="Prénom"
                accessibilityHint="Saisissez votre prénom"
              ></TextInput>
            </View>
            {errors.firstname && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.firstname}
              </Text>
            )}
            <View>
              <TextInput
                style={styles.input}
                placeholder="Indiquez votre nom"
                placeholderTextColor={"white"}
                onChangeText={(value) => setName(value)}
                value={name}
                paddingBottom={10}
                accessibilityLabel="Nom"
                accessibilityHint="Saisissez votre nom"
              ></TextInput>
            </View>
            {errors.name && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.name}
              </Text>
            )}
          </View>
          <View style={styles.btnPosition}>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={handleCheckInputs}
              accessibilityLabel="Continuer"
              accessibilityHint="Valide les informations et passe à l'étape suivante"
              accessibilityRole="button"
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
    fontSize: 36,
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
    padding: 40,
  },
  input: {
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: 314,
    color: "white",
    marginBottom: 10,
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
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  btnPosition: {
    marginTop: 170,
    marginBottom: 40,
  },
  btn: { fontweight: 600 },
  error: {
    color: "red",
  },
});
