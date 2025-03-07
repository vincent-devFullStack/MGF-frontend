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
import VignetteRdv from "../../components/coach/VignetteRdv";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../env";
import { formatDate } from "../../modules/formatDate";

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
          <View style={styles.boxRdv}>
            <ScrollView contentContainerStyle={styles.containerRdv}>
              {rdv && rdvList}
            </ScrollView>
          </View>
          <View style={styles.boxBtn}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ajouter</Text>
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
  boxCal: {
    width: "100%",
    height: "55%",
  },
  calendar: {
    backgroundColor: "transparent",
  },
  boxRdv: {
    width: "100%",
    height: "40%",
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
    width: 120,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    borderRadius: 5,
  },
  buttonText: { fontSize: 14, color: "#21212E", fontWeight: "bold" },
});
