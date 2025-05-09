import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import VignetteRdv from "../../components/coach/VignetteRdv";

import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";
import { formatDate } from "../../modules/formatDate";
import MaskedView from "@react-native-community/masked-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function HomeCoachScreen({ navigation }) {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [modalVisible, setModalVisible] = useState(false);

  const [rdv, setRdv] = useState([]);
  const [date, setDate] = useState("");

  const dateCurrent = Date.now();

  useEffect(() => {
    setDate(formatDate(dateCurrent));
    // Fetch rdv coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/coach/rdv/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          setRdv(data.rdv);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des RDV:", error);
          setRdv([]);
        });
    }
  }, [isFocused, coach]);

  const rdvList = rdv.map((data, i) => {
    if (date === formatDate(new Date(data.date))) {
      return <VignetteRdv key={i} {...data} />;
    }
  });

  if (!isFocused) {
    return <View />;
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            accessibilityViewIsModal={true}
          >
            <View style={styles.centeredView}>
              <LinearGradient
                colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
                style={styles.modalView}
              >
                <View style={styles.iconClose}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    accessibilityLabel="Fermer la fenêtre"
                    accessibilityHint="Ferme la fenêtre de profil"
                    accessibilityRole="button"
                  >
                    <FontAwesomeIcon icon={faXmark} size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.containerImage}>
                  <Image
                    source={
                      coach.photoProfil
                        ? { uri: coach.photoProfil }
                        : require("../../assets/photo_eleve1.jpg")
                    }
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.text}>Modifier mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonDeco}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  accessibilityLabel="Déconnexion"
                  accessibilityHint="Déconnecte l'utilisateur"
                  accessibilityRole="button"
                >
                  <Text style={styles.buttonDecoText}>Déconnexion</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Modal>

          <View style={styles.boxTitle}>
            <TouchableOpacity
              style={styles.containerImage}
              onPress={() => setModalVisible(true)}
              accessibilityLabel="Profil"
              accessibilityHint="Ouvre la fenêtre de profil"
              accessibilityRole="imagebutton"
            >
              <Image
                source={
                  coach.photoProfil
                    ? { uri: coach.photoProfil }
                    : require("../../assets/photo_eleve1.jpg")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text style={styles.title} accessibilityRole="header">
              Bonjour
            </Text>
            <Text style={[styles.title, { color: "#DFB81C" }]}>
              {coach?.firstname}
            </Text>
          </View>

          <View style={styles.boxOne}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={[
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "transparent",
                  ]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.secondTitle} accessibilityRole="text">
                Coachings du jour
              </Text>
              <ScrollView
                contentContainerStyle={styles.containerRdv}
                showsVerticalScrollIndicator={false}
                accessibilityRole="grid"
              >
                {rdv && rdvList}
              </ScrollView>
            </MaskedView>
          </View>

          <View style={styles.boxTwo}>
            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={[
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "transparent",
                  ]}
                  style={styles.maskGradient}
                />
              }
            >
              <Text style={styles.secondTitle} accessibilityRole="text">
                Echéances abonnements
              </Text>
              <ScrollView
                contentContainerStyle={styles.containerAbo}
                showsVerticalScrollIndicator={false}
                accessibilityRole="grid"
              ></ScrollView>
            </MaskedView>
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
    padding: 15,
  },
  boxTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 20,
  },
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  boxOne: {
    width: "100%",
    height: 350,
  },
  boxTwo: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerRdv: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    paddingTop: 10,
    // justifyContent: "flex-start",
    flexGrow: 1,
  },
  secondTitle: {
    fontSize: 24,
    color: "white",
  },
  containerAbo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    paddingTop: 10,
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
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    height: 280,
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
    gap: 20,
  },
  iconClose: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonDeco: {
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  buttonDecoText: {
    color: "#101018",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
