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
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

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

import * as Yup from "yup";

const newRdvSchema = Yup.object().shape({
  eleve: Yup.object({
    name: Yup.string().required(),
    firstname: Yup.string().required(),
    token: Yup.string().required(),
    title: Yup.string().required(),
    id: Yup.number().required(),
  }).required("Veuillez sélectionner un élève"),
  date: Yup.date().required("La date est requise"),
  heure: Yup.string().required("L'heure est requise"),
});

export default function CalCoachScreen() {
  const isFocused = useIsFocused();
  const coach = useSelector((state) => state.coach.value);

  const [modalVisible, setModalVisible] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const [eleve, setEleve] = useState({});
  const [heure, setHeure] = useState("");
  const [date, setDate] = useState(new Date());

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
  }, [isFocused, coach, refresh]);

  //Fetch eleves coach
  useEffect(() => {
    // Fetch eleves coach from API
    if (isFocused && coach?.token) {
      fetch(`${BACKEND_ADDRESS}/coach/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          const suggestions = data?.eleves.map((eleve, i) => {
            return {
              id: i,
              title: `${eleve.name} ${eleve.firstname}`,
              name: eleve.name,
              firstname: eleve.firstname,
              token: eleve.token,
            };
          });
          setDataSet(suggestions);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des élèves:", error);
        });
    }
  }, [isFocused, coach, date]);

  //Map rdv du jour
  const rdvList = rdv.map((data, i) => {
    if (selected === formatDate(new Date(data.date))) {
      return <VignetteRdv key={i} {...data} />;
    }
  });

  //Récupération de la date de RDV
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  //Création rdv
  const createRdv = async () => {
    try {
      await newRdvSchema.validate(
        {
          eleve,
          date,
          heure,
        },
        { abortEarly: false }
      );

      setErrors({});

      const response = await fetch(`${BACKEND_ADDRESS}/coach/rdv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachToken: coach.token,
          eleveToken: eleve.token,
          date: date,
          heure: heure,
        }),
      });

      const data = await response.json();

      if (data.result) {
        console.log("RDV créé avec succès");
        setHeure("");
        setEleve([]);
        setModalVisible(false);
        setRefresh(!refresh);
      } else {
        console.error("Erreur lors de la création du RDV:", data.message);
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
              <AutocompleteDropdownContextProvider>
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                    <AutocompleteDropdown
                      onSelectItem={(item) => item && setEleve(item)}
                      dataSet={dataSet}
                      direction="down"
                      textInputProps={{
                        placeholder: "Rechercher nom d'un eleve",
                        placeholderTextColor: "#B9B8B7",
                      }}
                      inputContainerStyle={styles.inputContainer}
                      containerStyle={styles.dropdownContainer}
                      suggestionsListContainerStyle={
                        styles.suggestionListContainer
                      }
                      closeOnSubmit
                    ></AutocompleteDropdown>
                    <Text style={styles.modalText}>
                      Sélectionnez la date du rendez-vous :
                    </Text>
                    {show && (
                      <DateTimePicker
                        mode="date"
                        value={date}
                        display={Platform.OS === "ios" ? "default" : "default"}
                        onChange={onChange}
                      ></DateTimePicker>
                    )}
                    <TouchableOpacity
                      style={styles.buttonDate}
                      onPress={() => setShow(true)}
                    >
                      <Text style={styles.textDate}>
                        {date.toLocaleDateString("fr-FR")}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>
                      L'heure du rendez-vous :
                    </Text>

                    <TextInput
                      style={styles.input}
                      placeholder="heure..."
                      placeholderTextColor={"#B9B8B7"}
                      onChangeText={(value) => setHeure(value)}
                      value={heure}
                    ></TextInput>

                    {errors.heure && (
                      <Text style={{ color: "red" }}>{errors.heure}</Text>
                    )}
                    {errors.date && (
                      <Text style={{ color: "red" }}>{errors.date}</Text>
                    )}
                    {errors.eleve && (
                      <Text style={{ color: "red" }}>{errors.eleve}</Text>
                    )}

                    <TouchableOpacity
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={createRdv}
                    >
                      <Text style={styles.textStyle}>Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </AutocompleteDropdownContextProvider>
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
            <ScrollView
              contentContainerStyle={styles.containerRdv}
              showsVerticalScrollIndicator={false}
            >
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
    height: 450,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalText: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    fontSize: 13,
    borderRadius: 5,
    borderColor: "#B9B8B7",
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    fontWeight: "bold",
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#DFB81C",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  boxCal: {
    width: "100%",
    height: "50%",
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
    paddingHorizontal: 15,
  },
  boxBtn: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  dropdownContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DFB81C",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  suggestionListContainer: {
    borderRadius: 5,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  buttonDate: {
    backgroundColor: "#DFB81C",
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
