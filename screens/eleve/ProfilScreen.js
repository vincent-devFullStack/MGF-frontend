import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Alert,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKEND_ADDRESS } from "../../env";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faXmark,
  faArrowLeft,
  faRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../reducers/eleve";

export default function ProfilScreen({ navigation }) {
  const [fullData, setFullData] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const eleveData = useSelector((state) => state.eleve.value);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
      });
  }, [isFocused]);

  const photoProfil =
    fullData?.data?.photoProfil || require("../../assets/icon.png");

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const response = await fetch(`${BACKEND_ADDRESS}/deleteAccount`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eleveToken: eleveData.token }),
              });

              const data = await response.json();

              if (response.ok) {
                Alert.alert("Succès", data.message);
                dispatch(logout());
                navigation.navigate("Login");
              } else {
                Alert.alert("Erreur", data.error || "Une erreur est survenue.");
              }
            } catch (error) {
              Alert.alert(
                "Erreur",
                "Une erreur est survenue. Veuillez réessayer plus tard."
              );
            }
          },
        },
      ]
    );
  };
  const confirmDelete = async () => {
    const payload = {
      token: fullData?.data?.token,
      texte: conversation.texte,
    };

    try {
      const response = await fetch(`${BACKEND_ADDRESS}/eleve/delete-message`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      if (data.result) {
        console.log("Message supprimé avec succès !");
        setDeletedMessage(true);
      } else {
        console.error("Erreur suppression :", data.error);
        Alert.alert("Erreur", "Impossible de supprimer le message.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeEleve")}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faArrowLeft}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
                navigation.navigate("Login");
              }}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faRightFromBracket}
                size={20}
                color={"#DFB81C"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.titrePage}>Profile</Text>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
              <Image style={styles.profilIcon} source={{ uri: photoProfil }} />
              <FontAwesomeIcon
                style={styles.iconEdit}
                icon={faPenToSquare}
                size={20}
                color={"#DFB81C"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.boxInput}>
            <View>
              <Text style={styles.input} paddingBottom={10}>
                {fullData?.data?.name} {fullData?.data?.firstname}
              </Text>
            </View>
            <View>
              <Text style={styles.input} paddingBottom={10}>
                {fullData?.data?.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>
              Payer / Renouveler mon adhésion
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => handleDeleteAccount()}
          >
            <Text style={styles.buttonText}>Supprimer le compte</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <LinearGradient
              colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.cross}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={faXmark}
                    size={20}
                    color={"white"}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.chantier}
                  source={require("../../assets/page_construction.png")}
                />
              </View>
            </LinearGradient>
          </Modal>
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
  titrePage: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },
  header: {
    height: 210,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  profilIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  iconEdit: {
    position: "relative",
    left: 90,
  },
  input: {
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: 314,
    color: "white",
    marginBottom: 10,
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    gap: 30,
    padding: 20,
  },
  reinitia: {
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 42,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginTop: 100,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 42,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 50,
  },
  // Styles de la modale
  modalContainer: {
    marginTop: 80,
    height: 750,
    borderRadius: 10,
    width: "91%",
    left: 19,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    color: "white",
    paddingBottom: 10,
  },
  modalTitle2: {
    marginTop: 10,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "30%",
  },
  modalTitle3: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "37%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  profilIconLarge: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 50,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
  cross: {
    position: "absolute",
    top: -80,
    right: -5,
    padding: 10,
  },
  chantier: {
    height: 500,
    width: 500,
  },
});
