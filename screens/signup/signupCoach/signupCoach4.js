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
import { useDispatch, useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import { BACKEND_ADDRESS } from "../../../env";

import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateFourth, updateCoach } from "../../../reducers/coach";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  description: Yup.string().required("Votre description est requise"),
  diplomes: Yup.string().required("Vos diplomes sont requis"),
  domaines: Yup.string().required("Vos domaines sont requis"),
});

export default function InscriptionCoach4({ navigation }) {
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.value);
  const [progress, setProgress] = useState(0.75);
  const [description, setDescription] = useState("");
  const [diplomes, setDiplomes] = useState("");
  const [domaines, setDomaines] = useState("");
  const [errors, setErrors] = useState({});

  const handleCheckInputs = async () => {
    try {
      // Awaiting for Yup to validate text
      await signUpSchema.validate(
        { description, domaines, diplomes },
        { abortEarly: false }
      );

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});

      dispatch(
        updateFourth({
          domaines: domaines.split(", "),
          description: description,
          diplomes: diplomes.split(", "),
        })
      );

      const response = await fetch(`${BACKEND_ADDRESS}/signupCoach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: coach.name,
          firstname: coach.firstname,
          email: coach.email,
          password: coach.password,
          secretWord: coach.secretWord,
          photoProfil: coach.photo,
          role: coach.role,
          siret: coach.siret,
          diplomes: coach.diplomes,
          villes: coach.villes,
          lieux: coach.salles,
          domaineExpertise: coach.domaines,
          presentation: coach.description,
        }),
      });

      const data = await response.json();
      console.log(data);

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
        navigation.navigate("CoachTabs", { screen: "HomeCoach" });
      } else {
        setErrors({ ...errors, data: data.error });
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
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupCoach3")}
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
            <Text style={styles.title}>Mettez vous en avant!</Text>
          </View>

          <View style={styles.boxInput}>
            <View>
              <Text style={styles.textInput} accessibilityRole="text">
                Quels sont vos domaines d'expertise ?
              </Text>
              <TextInput
                style={styles.input}
                placeholder=" Domaine..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                onChangeText={(value) => setDomaines(value)}
                value={domaines}
                accessibilityLabel="Domaines d'expertise"
                accessibilityHint="Saisissez vos domaines d'expertise"
              ></TextInput>
            </View>
            {errors.domaines && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.domaines}
              </Text>
            )}
            <View>
              <Text style={styles.textInput} accessibilityRole="text">
                Présentez-vous pour vos futurs clients :
              </Text>
              <TextInput
                style={styles.inputDescription}
                placeholder=" Décrivez-vous..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                multiline={true}
                onChangeText={(value) => setDescription(value)}
                value={description}
                accessibilityLabel="Présentation"
                accessibilityHint="Saisissez votre présentation"
              ></TextInput>
            </View>
            {errors.description && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.description}
              </Text>
            )}
            <View>
              <Text style={styles.textInput} accessibilityRole="text">
                Indiquez vos diplômes :
              </Text>
              <TextInput
                style={styles.input}
                placeholder=" Diplômes..."
                placeholderTextColor={"#b9b8b7"}
                paddingTop={5}
                paddingBottom={5}
                onChangeText={(value) => setDiplomes(value)}
                value={diplomes}
                accessibilityLabel="Diplômes"
                accessibilityHint="Saisissez vos diplômes"
              ></TextInput>
            </View>
            {errors.diplomes && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.diplomes}
              </Text>
            )}
            {errors.data && (
              <Text style={styles.error} accessibilityRole="text">
                {errors.data}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleCheckInputs}
            accessibilityLabel="Finaliser l'inscription"
            accessibilityHint="Valide votre inscription et vous emmène à la page d'accueil"
            accessibilityRole="button"
          >
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
    fontSize: 34,
    fontFamily: "roboto",
    fontWeight: 600,
    color: "white",
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 370,
    gap: 10,
    padding: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  inputDescription: {
    backgroundColor: "white",
    color: "#101018",
    width: 314,
    height: 115,
    marginBottom: 5,
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
