import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../env";
import VignetteEleve from "../../components/coach/VignetteEleve";
import MaskedView from "@react-native-community/masked-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import * as Yup from "yup";

const newEleveSchema = Yup.object().shape({
  eleveEmail: Yup.string()
    .email("L'email est invalide")
    .required("Email requis"),
});

export default function ElevesScreen() {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const [eleveEmail, setEleveEmail] = useState("");

  const [eleves, setEleves] = useState([]);

  useEffect(() => {
    // Fetch eleves coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/coach/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setEleves(data.eleves);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des élèves:", error);
          setEleves([]);
        });
    }
  }, [isFocused, coach]);

  const elevesList = eleves.map((data, i) => {
    return <VignetteEleve key={i} {...data} />;
  });

  const addEleve = async () => {
    try {
      await newEleveSchema.validate({ eleveEmail }, { abortEarly: false });

      setErrors({});

      const response = await fetch(`${BACKEND_ADDRESS}/coach/addEleve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachToken: coach.token,
          eleveEmail: eleveEmail,
        }),
      });

      const data = await response.json();

      if (data.result) {
        setEleveEmail("");
        setModalVisible(false);
        setEleves([...eleves, data.eleve]);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });

        setErrors(yupErrors);
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.iconClose}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesomeIcon icon={faXmark} size={20} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalText}>
                  Rentrer l'email de l'élève :
                </Text>
                {errors.eleveEmail && (
                  <Text style={styles.error}>{errors.eleveEmail}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={"#B9B8B7"}
                  onChangeText={(value) => setEleveEmail(value)}
                  value={eleveEmail}
                  inputMode="email"
                  keyboardType="email-address"
                ></TextInput>
                <TouchableOpacity
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={addEleve}
                >
                  <Text style={styles.textStyle}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.box}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={["black", "black", "black", "black", "transparent"]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.title}>Elèves</Text>
              <ScrollView contentContainerStyle={styles.containerEleves}>
                {eleves && elevesList}
              </ScrollView>
            </MaskedView>
          </View>
          <View style={styles.boxBtn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesomeIcon icon={faPlus} color={"#101018"} />
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 70,
    padding: 40,
    gap: 10,
  },
  background: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    height: 230,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 12,
  },
  iconClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  modalText: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
    borderColor: "#B9B8B7",
    borderWidth: 1,
    marginBottom: 5,
  },
  textStyle: {
    fontWeight: "bold",
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#DFB81C",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "100%",
    height: "95%",
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerEleves: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  boxBtn: {
    height: "5%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    borderRadius: 50,
  },
  maskedContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden", // Important pour appliquer correctement le masque
  },
  maskGradient: {
    height: "100%", // S'assure que le gradient couvre toute la hauteur
    width: "100%", // et toute la largeur de l'écran
  },
  error: {
    color: "red",
  },
});
