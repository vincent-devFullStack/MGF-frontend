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
import { updateFirst } from "../../../reducers/coach";
import * as Progress from "react-native-progress";

import * as Yup from "yup";

import { BACKEND_ADDRESS } from "../../../env";

import {
  faArrowLeft,
  faXmark,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("L'email est invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Le mot de passe n'est pas identique")
    .required("Merci de confirmer le mot de passe"),
  secretWord: Yup.string().required("Mot secret requis"),
});

export default function InscriptionCoach1({ navigation }) {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secretWordVisible, setSecretWordVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretWord, setSecretWord] = useState("");

  const handleCheckInputs = async () => {
    try {
      // Awaiting for Yup to validate text
      await signUpSchema.validate(
        { email, password, confirmPassword, secretWord },
        { abortEarly: false }
      );

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});

      const response = await fetch(`${BACKEND_ADDRESS}/checkEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (data.result === false) {
        dispatch(
          updateFirst({
            role: "coach",
            email: email,
            password: password,
            secretWord: secretWord,
          })
        );
        navigation.navigate("SignupCoach2");
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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 0.15;
        return newProgress > 0.25 ? 0.25 : newProgress;
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
              onPress={() => navigation.navigate("Signup")}
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
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Indiquez votre adresse email"
                  keyboardType="email-address"
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                  paddingBottom={10}
                  inputMode="email"
                  accessibilityLabel="Adresse email"
                  accessibilityHint="Saisissez votre adresse email"
                ></TextInput>
              </View>
              {errors.email && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.email}
                </Text>
              )}
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Indiquez votre nouveau mot de passe"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  paddingBottom={10}
                  accessibilityLabel="Mot de passe"
                  accessibilityHint="Saisissez votre mot de passe"
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  accessibilityLabel={
                    passwordVisible
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  accessibilityRole="button"
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={15}
                    color={passwordVisible ? "#DFB81C" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.password}
                </Text>
              )}
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Confirmez votre nouveau mot de passe"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setConfirmPassword(value)}
                  value={confirmPassword}
                  paddingBottom={10}
                  accessibilityLabel="Confirmer le mot de passe"
                  accessibilityHint="Saisissez à nouveau votre mot de passe"
                ></TextInput>

                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  accessibilityLabel={
                    passwordVisible
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  accessibilityRole="button"
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={15}
                    color={passwordVisible ? "#DFB81C" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.confirmPassword}
                </Text>
              )}
              <Text style={styles.text} accessibilityRole="text">
                Indiquez votre mot secret pour la rénitilisation de votre mot de
                passe :
              </Text>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Indiquez votre mot secret"
                  secureTextEntry={!secretWordVisible}
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setSecretWord(value)}
                  value={secretWord}
                  paddingBottom={10}
                  accessibilityLabel="Mot secret"
                  accessibilityHint="Saisissez votre mot secret"
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setSecretWordVisible(!secretWordVisible)}
                  accessibilityLabel="Afficher le mot secret"
                  accessibilityHint="Appuyez pour afficher le mot secret"
                  accessibilityRole="togglebutton"
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={secretWordVisible ? faEye : faEyeSlash}
                    size={15}
                    color={secretWordVisible ? "#DFB81C" : "white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btnPosition}>
            <TouchableOpacity
              onPress={() => handleCheckInputs()}
              style={styles.nextBtn}
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
    justifyContent: "space-between",
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
    width: "100%",
    color: "white",
    marginBottom: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: "100%",
    color: "white",
    height: 40,
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
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 10,
  },
});
