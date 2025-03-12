import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import VignetteRdv from "../../components/coach/VignetteRdv";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../env";
import { formatDate } from "../../modules/formatDate";
import MaskedView from "@react-native-community/masked-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

export default function CalCoachScreen() {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [modalVisible, setModalVisible] = useState(false);

  const [selected, setSelected] = useState("");
  const [rdv, setRdv] = useState([]);

  const dateCurrent = Date.now();

  useEffect(() => {
    setSelected(formatDate(dateCurrent));
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
    if (selected === formatDate(new Date(data.date))) {
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
                  Rentrer le nom de l'élève :
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  placeholderTextColor={"#B9B8B7"}
                ></TextInput>
                <Text style={styles.modalText}>L'heure du rendez-vous:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Heure"
                  placeholderTextColor={"#B9B8B7"}
                ></TextInput>

                <TouchableOpacity
                  style={[styles.buttonModal, styles.buttonClose]}
                >
                  <Text style={styles.textStyle}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.boxCal}>
            <Calendar
              style={styles.calendar}
              onDayPress={(day) => {
                setSelected(day.dateString);
              }}
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",
                textSectionTitleColor: "#B3B3B3",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#101018",
                todayBackgroundColor: "#DFB81C",
                dayTextColor: "#ffffff",
                textDisabledColor: "#616161",
                monthTextColor: "white",
                arrowColor: "white",
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          </View>
          <MaskedView
            style={styles.maskedContainer}
            maskElement={
              <LinearGradient
                colors={["black", "black", "black", "black", "transparent"]}
                style={styles.maskGradient}
              />
            }
          >
            <ScrollView contentContainerStyle={styles.containerRdv}>
              {rdv && rdvList}
            </ScrollView>
          </MaskedView>
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
    height: 300,
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
  boxCal: {
    width: "100%",
    height: "55%",
  },
  calendar: {
    backgroundColor: "transparent",
  },
  containerRdv: {
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
    height: "40%",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden", // Important pour appliquer correctement le masque
  },
  maskGradient: {
    height: "100%", // S'assure que le gradient couvre toute la hauteur
    width: "100%", // et toute la largeur de l'écran
  },
});
