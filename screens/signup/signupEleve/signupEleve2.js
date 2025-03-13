import {
  StyleSheet,
  Platform,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSecond } from "../../../reducers/eleve";
import * as Progress from "react-native-progress";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Nom requis"),
  firstname: Yup.string().required("Prénom requis"),
});

export default function InscriptionEleve2({ navigation }) {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0.25);

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

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
      navigation.navigate("SignupEleve3");
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
              onPress={() => navigation.navigate("SignupEleve1")}
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
              ></TextInput>
            </View>
            {errors.firstname && (
              <Text style={styles.error}>{errors.firstname}</Text>
            )}
            <View>
              <TextInput
                style={styles.input}
                placeholder="Indiquez votre nom"
                placeholderTextColor={"white"}
                onChangeText={(value) => setName(value)}
                value={name}
                paddingBottom={10}
              ></TextInput>
            </View>
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>
          <View style={styles.btnPosition}>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => handleCheckInputs()}
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
    display: "absolute",
    marginTop: 170,
  },
});
