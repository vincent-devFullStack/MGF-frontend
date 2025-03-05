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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFirst } from "../../../reducers/coach";

import {
  faArrowLeft,
  faXmark,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function InscriptionCoach1({ navigation }) {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const BACKEND_ADDRESS = "http://192.168.1.15:3000";

  const handleCheckInputs = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      setError("");

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
          })
        );
        navigation.navigate("SignupCoach2");
      }
    }
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
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
            <Text style={styles.pourcent}>25 %</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Création de compte</Text>
          </View>
          <View style={styles.boxInput}>
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
              ></TextInput>

              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Indiquez votre nouveau mot de passe"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  paddingBottom={10}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={15}
                    color={passwordVisible ? "#DFB81C" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Confirmez votre nouveau mot de passe"
                  secureTextEntry={!passwordVisible}
                  placeholderTextColor={"white"}
                  onChangeText={(value) => setConfirmPassword(value)}
                  value={confirmPassword}
                  paddingBottom={10}
                ></TextInput>

                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={passwordVisible ? faEye : faEyeSlash}
                    size={15}
                    color={passwordVisible ? "#DFB81C" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
          </View>
          <View style={styles.btnPosition}>
            <TouchableOpacity
              onPress={() => handleCheckInputs()}
              style={styles.nextBtn}
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
    width: 314,
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
  },
  btnPosition: {
    display: "absolute",
    marginTop: 170,
  },
});
