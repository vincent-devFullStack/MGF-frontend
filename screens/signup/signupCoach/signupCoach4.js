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
import { useDispatch, useSelector } from "react-redux";
import { checkBody } from "../../../modules/checkBody";

import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateFourth } from "../../../reducers/coach";

export default function InscriptionCoach4({ navigation }) {
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.value);
  console.log(coach);
  const [description, setDescription] = useState("");
  const [diplomes, setDiplomes] = useState("");
  const [domaines, setDomaines] = useState("");
  const [error, setError] = useState("");

  const handleCheckInputs = () => {
    if (
      !checkBody(
        { domaines: domaines, description: description, diplomes: diplomes },
        ["domaines", "description", "diplomes"]
      )
    ) {
      setError("Missing or empty fields");
      return;
    } else {
      setError("");
      dispatch(
        updateFourth({
          domaines: domaines.split(", "),
          description: description,
          diplomes: diplomes.split(", "),
        })
      );
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
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupCoach3")}
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
            <Text style={styles.pourcent}>100 %</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mettez vous en avant!</Text>
          </View>

          <View style={styles.boxInput}>
            <View>
              <Text style={styles.textInput}>
                Quels sont vos domaines d'expertise ?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Domaine..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                onChangeText={(value) => setDomaines(value)}
                value={domaines}
              ></TextInput>
            </View>
            <View>
              <Text style={styles.textInput}>
                Présentez-vous pour vos futurs clients :
              </Text>
              <TextInput
                style={styles.inputDescription}
                placeholder="Décrivez-vous..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                multiline={true}
                onChangeText={(value) => setDescription(value)}
                value={description}
              ></TextInput>
            </View>
            <View>
              <Text style={styles.textInput}>Indiquez vos diplômes :</Text>
              <TextInput
                style={styles.input}
                placeholder="Diplômes..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                onChangeText={(value) => setDiplomes(value)}
                value={diplomes}
              ></TextInput>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleCheckInputs}>
            <Text style={styles.btn}>Valider</Text>
          </TouchableOpacity>
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
    fontSize: 34,
    fontFamily: "roboto",
    fontWeight: 600,
    color: "white",
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 500,
    gap: 10,
    padding: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 5,
  },
  inputDescription: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    height: 230,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  textInput: {
    color: "white",
    fontWeight: 600,
    paddingLeft: 8,
  },
  nextBtn: {
    backgroundColor: "white",
    height: 42,
    width: 174,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btn: { fontWeight: 600 },
  error: {
    color: "red",
  },
});
