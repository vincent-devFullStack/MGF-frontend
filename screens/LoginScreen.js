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
import { useSelector } from "react-redux";

import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [type, setType] = useState("eleve");
  console.log(type);
  function changeType() {
    if (type === "eleve") {
      setType("coach");
    } else if (type === "coach") {
      setType("eleve");
    }
  }

  function connexionUser() {
    if (type === "eleve") {
      navigation.navigate("EleveTabs", { screen: "HomeEleve" });
    } else if (type === "coach") {
      navigation.navigate("CoachTabs", { screen: "HomeCoach" });
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#54547E" }}>
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
          ></TextInput>
          <View style={styles.passwordInput}>
            <TextInput
              placeholder="Votre mot de passe"
              secureTextEntry={!passwordVisible}
              placeholderTextColor={"white"}
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
          <TouchableOpacity>
            <Text style={styles.textBottom}>Inscription</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
  },
  title: {
    width: 300,
    fontSize: 36,
    fontWeight: 600,
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  titleColor: {
    color: "#DFB81C",
  },
  boxInput: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: 250,
    gap: 10,
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
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: "100%",
  },
  icon: { paddingRight: 40 },
  boxToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
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
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 15,
  },
  boxTextBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  textBottom: {
    color: "white",
  },
});
