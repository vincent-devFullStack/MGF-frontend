import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";

import SearchNewCoach from "../../components/eleve/SearchNewCoach";

import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeEleveScreen() {
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  const eleveData = useSelector((state) => state.eleve.value);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data.coach);

        if (data.data.coach === undefined) {
          setVisible(true);
          // console.log("coach is:", data.data.coach.firstname);
        } else {
          setVisible(false);
          // console.log(data.data.coach);
        }
      });
  }, [isFocused]);

  useEffect(() => {
    console.log("Visible state:", visible);
  }, [visible]);

  console.log(visible);

  const researchVisibleCard = () => {
    if (visible) {
      return <SearchNewCoach />;
    }
  };
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
          {researchVisibleCard()}
          <View style={styles.header}>
            <View>
              <Image
                style={styles.profilIcon}
                source={require("../../assets/photo_eleve2.jpg")}
              />
            </View>
            <View>
              <Text style={styles.title}>
                Bonne Séance <Text style={styles.titleColor}>Elsa Doe</Text>
              </Text>
            </View>
          </View>

          <Text>Elève Home Screen</Text>
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
  header: {
    height: 120,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    width: 270,
  },
  profilIcon: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});
