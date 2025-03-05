import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBody } from "../../../modules/checkBody";

import {
  faArrowLeft,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { updateThird } from "../../../reducers/coach";

export default function InscriptionCoach3({ navigation }) {
  const dispatch = useDispatch();
  const formData = new FormData();

  const [photo, setPhoto] = useState("");
  const [villes, setVilles] = useState("");
  const [salles, setSalles] = useState("");
  const [siret, setSiret] = useState(0);

  const [error, setError] = useState(null);
  const [errorInput, setErrorInput] = useState(null);

  const BACKEND_ADDRESS = "http://192.168.9.21:3000";

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setError("permission Denied");
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        // Clear any previous errors
        setError(null);

        formData.append("photoFromFront", {
          uri: result?.assets[0].uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(`${BACKEND_ADDRESS}/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        setPhoto(data.url);
      }
    }
  };

  function handleCheckInputs() {
    if (
      !checkBody(
        { photo: photo, villes: villes, salles: salles, siret: siret },
        ["photo", "villes", "salles", "siret"]
      )
    ) {
      setErrorInput("Missing or empty fields");
      return;
    } else {
      setErrorInput("");
      dispatch(
        updateThird({
          photo: photo,
          villes: villes.split(", "),
          salles: salles.split(", "),
          siret: siret,
        })
      );
      navigation.navigate("SignupCoach4");
    }
  }

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
              onPress={() => navigation.navigate("SignupCoach2")}
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
            <Text style={styles.pourcent}>75 %</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mettez vous en avant!</Text>
          </View>

          {!photo && (
            <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faPlus}
                size={80}
                color={"#827f7f"}
              />
            </TouchableOpacity>
          )}

          {photo && (
            <View style={styles.buttonImage}>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
          )}

          <View style={styles.boxInput}>
            {error && <Text style={styles.error}>{error}</Text>}
            <View>
              <Text style={styles.textInput}>
                Indiquez vos villes d'exercices :
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Villes..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                onChangeText={(value) => setVilles(value)}
                value={villes}
              ></TextInput>
            </View>
            <View>
              <Text style={styles.textInput}>
                Listez les salles ou lieux d'exercice :
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Salles..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                onChangeText={(value) => setSalles(value)}
                value={salles}
              ></TextInput>
            </View>
            <View>
              <Text style={styles.textInput}>
                Indiquez votre numéro de SIRET :
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Siret..."
                placeholderTextColor={"#b9b8b7"}
                paddingBottom={10}
                onChangeText={(value) => setSiret(value)}
                value={siret}
              ></TextInput>
            </View>
            {errorInput && <Text style={styles.error}>{errorInput}</Text>}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleCheckInputs}>
            <Text style={styles.btn}>Continuer</Text>
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
  buttonImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    width: 160,
    height: 160,
    borderRadius: 5,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 350,
    gap: 10,
    padding: 40,
  },
  input: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 5,
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
  errorInput: {
    color: "red",
  },
});
