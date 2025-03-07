import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import * as React from "react";
import { BACKEND_ADDRESS } from "../../env";
import { RadioButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MapView from "react-native-maps";
import VignetteCoach from "../../components/eleve/VignetteCoach";
import MaskedView from "@react-native-community/masked-view";

export default function MapScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = React.useState("first");
  const [coachList, setCoachList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [newPlace, setNewPlace] = useState("");

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
    // fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.result && dispatch(importPlaces(data.places));
    //   });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
      });
  }, []);

  const coachs = coachList.map((data, i) => {
    return <VignetteCoach key={i} {...data} />;
  });

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trouvons un coach</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText1}
                placeholder="Indiquez un ville, un nom ou une discipline"
                onChangeText={setSearch}
                placeholderTextColor={"grey"}
                value={search}
              />
              <FontAwesomeIcon
                style={styles.icon}
                icon={faLocationDot}
                size={20}
                color={"#DFB81C"}
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <Text style={styles.radioText}>Presentiel</Text>
              <RadioButton
                value="first"
                status={checked === "presentiel" ? "checked" : "unchecked"}
                onPress={() => setChecked("presentiel")}
                color="#DFB81C"
              />
              <Text style={styles.radioText}>Distanciel</Text>

              <RadioButton
                value="second"
                status={checked === "distanciel" ? "checked" : "unchecked"}
                onPress={() => setChecked("distanciel")}
                color="#DFB81C"
              />
              <Text style={styles.radioText}>Hybride</Text>
              <RadioButton
                value="third"
                status={checked === "hybride" ? "checked" : "unchecked"}
                onPress={() => setChecked("hybride")}
                color="#DFB81C"
              />
              <Text style={styles.radioText}>Tout</Text>
              <RadioButton
                value="fourth"
                status={checked === "tout" ? "checked" : "unchecked"}
                onPress={() => setChecked("tout")}
                color="#DFB81C"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.cross}
            onPress={() =>
              navigation.navigate("EleveTabs", { screen: "HomeEleve" })
            }
          >
            <FontAwesomeIcon
              style={styles.icon}
              icon={faXmark}
              size={20}
              color={"white"}
            />
          </TouchableOpacity>
          <LinearGradient
            colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
            style={styles.background2}
          >
            <MapView
              initialRegion={currentPosition}
              mapType="hybridFlyover"
              style={styles.map}
            ></MapView>

            <MaskedView
              style={styles.maskedContainer}
              maskElement={
                <LinearGradient
                  colors={[
                    "black",
                    "black",
                    "black",
                    "black",
                    "transparent",
                    "transparent",
                  ]}
                  style={styles.maskGradient}
                />
              }
            >
              <LinearGradient
                colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
                style={styles.coachListContainer}
              >
                <ScrollView contentContainerStyle={styles.coachList}>
                  {coachs}
                  {coachs}
                </ScrollView>
              </LinearGradient>
            </MaskedView>
          </LinearGradient>
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
  background2: {
    flexDirection: "row",
    height: "76%",
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  background3: {
    flexDirection: "row",
    height: "50%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  maskedContainer: {
    height: "60%",
    width: "95%",
    borderRadius: 10,
    overflow: "hidden", // Important pour appliquer correctement le masque
  },
  maskGradient: {
    height: "100%", // S'assure que le gradient couvre toute la hauteur
    width: "100%", // et toute la largeur de l'écran
  },
  cross: {
    position: "absolute",
    top: 70,
    right: 20,
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    color: "white",
    fontWeight: 500,
    marginTop: 40,
    right: 30,
    paddingBottom: 20,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "88%",
    height: 35,
    borderRadius: 5,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioContainer: {
    marginTop: 10,
    width: "85%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioText: {
    color: "white",
    fontSize: 12,
  },
  map: {
    marginTop: 30,
    width: "90%",
    height: 250,
    borderRadius: 2,
  },
  coachList: {
    height: "150%",
    alignItems: "center",
    marginTop: 10,
  },
});
