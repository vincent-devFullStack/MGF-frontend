import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import SearchNewCoach from "../../components/SearchNewCoach";

import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeEleveScreen() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const BACKEND_ADDRESS = "http://172.20.10.4:3000";

  const eleveData = useSelector((state) => state.eleve.value);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.coach !== undefined) {
          setVisible(true);
          console.log(data.data.coach);
        } else {
          setVisible(false);
          console.log(data.data.coach);
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
