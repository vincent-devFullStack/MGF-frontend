import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

import { BACKEND_ADDRESS } from "../env";

import { updateEleve } from "../reducers/eleve";
import { updateCoach } from "../reducers/coach";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [type, setType] = useState("eleve");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Pour rendre visible le mot de passe
  function changeType() {
    if (type === "eleve") {
      setType("coach");
    } else if (type === "coach") {
      setType("eleve");
    }
  }

  //Pour vérifier les identifiants et naviguer vers la page d'accueil
  function connexionUser() {
    if (type === "eleve") {
      fetch(`${BACKEND_ADDRESS}/signinEleve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
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
            setEmail("");
            setPassword("");
            navigation.navigate("EleveTabs", { screen: "HomeEleve" });
          } else {
            setError(data.error);
          }
        });
    } else if (type === "coach") {
      fetch(`${BACKEND_ADDRESS}/signinCoach`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              updateCoach({
                token: data.data.token,
                role: data.data.role,
                firstname: data.data.firstname,
                name: data.data.name,
                email: data.data.email,
                password: data.data.password,
              })
            );
            setEmail("");
            setPassword("");
            navigation.navigate("CoachTabs", { screen: "HomeCoach" });
          } else {
            setError(data.error);
          }
        });
    }
  }

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
          <Text style={styles.title}>
            Mentor <Text style={styles.titleColor}>Gym</Text> Fitness
          </Text>

          <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Connexion</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre adresse email"
              keyboardType="email-address"
              placeholderTextColor={"white"}
              onChangeText={(value) => setEmail(value)}
              value={email}
              paddingBottom={10}
            ></TextInput>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.inputPass}
                placeholder="Votre mot de passe"
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
                  style={styles.iconPass}
                  icon={passwordVisible ? faEye : faEyeSlash}
                  size={20}
                  color={passwordVisible ? "#DFB81C" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxToggle}>
            <Text style={styles.textToggle}>Élève</Text>
            <TouchableOpacity onPress={changeType}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={type === "coach" ? faToggleOn : faToggleOff}
                size={30}
                color={"#DFB81C"}
              />
            </TouchableOpacity>
            <Text style={styles.textToggle}>Coach</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={connexionUser}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
          <View style={styles.boxTextBottom}>
            <TouchableOpacity>
              <Text style={styles.textBottom}>Mot de passe oublié</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.textBottom}>Inscription</Text>
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
    justifyContent: "space-between",
    padding: 40,
  },
  background: {
    flex: 1,
  },
  title: {
    width: 300,
    fontSize: 36,
    fontWeight: 600,
    textAlign: "center",
    padding: 20,
    color: "white",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  titleColor: {
    color: "#DFB81C",
  },
  boxInput: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
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
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: "100%",
    color: "white",
  },
  iconPass: { display: "absolute", right: 30 },
  inputPass: { color: "white", width: "100%" },
  icon: { paddingRight: 40 },
  boxToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  textToggle: {
    fontWeight: 600,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 174,
    height: 42,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 15,
  },
  boxTextBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  textBottom: {
    color: "white",
  },
  error: {
    color: "red",
  },
});
