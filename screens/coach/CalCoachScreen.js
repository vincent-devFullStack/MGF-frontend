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
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function CalCoachScreen() {
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
              onDayPress={(day) => {
                console.log("selected day", day);
              }}
            />
          </View>
          <View style={styles.boxRdv}>
            <ScrollView
              contentContainerStyle={styles.containerRdv}
            ></ScrollView>
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
    height: "35%",
  },
  boxRdv: {
    width: "100%",
    height: "60%",
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
