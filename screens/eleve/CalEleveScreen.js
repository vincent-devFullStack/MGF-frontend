import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import VignetteRdv from "../../components/eleve/VignetteRdv";
import VignetteProgramme from "../../components/eleve/VignetteProgramme";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../env";
import { formatDate } from "../../modules/formatDate";
import MaskedView from "@react-native-community/masked-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

export default function CalEleveScreen() {
  const isFocused = useIsFocused();
  const eleve = useSelector((state) => state.eleve.value);

  const [selected, setSelected] = useState("");
  const [rdv, setRdv] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  const dateCurrent = Date.now();

  useEffect(() => {
    setSelected(formatDate(dateCurrent));
    // Fetch rdv eleve from API
    if (isFocused && eleve?.token) {
      fetch(`${BACKEND_ADDRESS}/eleve/rdv/${eleve.token}`)
        .then((response) => response.json())
        .then((data) => {
          setRdv(data.rdv || []);
          setProgrammes(data.programmes || []);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des RDV:", error);
          setRdv([]);
          setProgrammes([]);
        });
    }
  }, [isFocused, eleve]);

  const rdvList = rdv.map((data, i) => {
    if (selected === formatDate(new Date(data.date))) {
      return <VignetteRdv key={i} {...data} />;
    }
  });
  const ProgrammesList =
    Array.isArray(programmes) && programmes.length > 0
      ? programmes.map((data, i) => {
          if (selected === formatDate(new Date(data.date))) {
            return <VignetteProgramme key={i} {...data} />;
          }
        })
      : null;

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
              {programmes && ProgrammesList}
            </ScrollView>
          </MaskedView>
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
  maskedContainer: {
    height: "40%",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  maskGradient: {
    height: "100%",
    width: "100%",
  },
});
