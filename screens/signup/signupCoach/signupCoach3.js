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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Progress from "react-native-progress";
import { BACKEND_ADDRESS } from "../../../env";

import {
  faArrowLeft,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { updateThird } from "../../../reducers/coach";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  photo: Yup.string().required("Votre photo est requise"),
  villes: Yup.string().required("Villes d'exercice requises"),
  salles: Yup.string().required("Salles d'exercice requises"),
  siret: Yup.string()
    .matches(/^\d{14}$/, "La valeur doit contenir exactement 14 chiffres")
    .required("Siret requis"),
});

export default function InscriptionCoach3({ navigation }) {
  const dispatch = useDispatch();
  const formData = new FormData();

  const [photo, setPhoto] = useState("");
  const [villes, setVilles] = useState("");
  const [salles, setSalles] = useState("");
  const [siret, setSiret] = useState(0);
  const [progress, setProgress] = useState(0.5);

  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ photo: "Permission refusée" });
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        // Clear any previous errors
        setErrors({ photo: "" });

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

  const handleCheckInputs = async () => {
    try {
      // Awaiting for Yup to validate text
      await signUpSchema.validate(
        { photo, villes, salles, siret },
        { abortEarly: false }
      );

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});

      dispatch(
        updateThird({
          photo: photo,
          villes: villes.split(", "),
          salles: salles.split(", "),
          siret: siret,
        })
      );
      navigation.navigate("SignupCoach4");
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
        return newProgress > 0.75 ? 0.75 : newProgress;
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

          <View style={styles.container2}>
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
            <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
              <Image source={{ uri: photo }} style={styles.image} />
            </TouchableOpacity>
          )}
          {errors.photo && <Text style={styles.error}>{errors.photo}</Text>}
          <View style={styles.boxInput}>
            <View>
              <Text style={styles.textInput}>
                Indiquez vos villes d'exercices :
              </Text>
              <TextInput
                style={styles.input}
                placeholder=" Villes..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                onChangeText={(value) => setVilles(value)}
                value={villes}
              ></TextInput>
            </View>
            {errors.villes && <Text style={styles.error}>{errors.villes}</Text>}
            <View>
              <Text style={styles.textInput}>
                Listez les salles ou lieux d'exercice :
              </Text>
              <TextInput
                style={styles.input}
                placeholder=" Salles..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                onChangeText={(value) => setSalles(value)}
                value={salles}
              ></TextInput>
            </View>
            {errors.salles && <Text style={styles.error}>{errors.salles}</Text>}
            <View>
              <Text style={styles.textInput}>
                Indiquez votre numéro de SIRET :
              </Text>
              <TextInput
                style={styles.input}
                placeholder=" Siret..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                onChangeText={(value) => setSiret(value)}
                value={siret}
              ></TextInput>
            </View>
            {errors.siret && <Text style={styles.error}>{errors.siret}</Text>}
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
    justifyContent: "flex-start",
    marginTop: 30,
    width: "90%",
    height: 200,
    gap: 10,
  },
  input: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    marginBottom: 5,
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
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginTop: 32,
    marginBottom: 40,
  },
  btn: { fontWeight: 600 },
  error: {
    color: "red",
  },
});
