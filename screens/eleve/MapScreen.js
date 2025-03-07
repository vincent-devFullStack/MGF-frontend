import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import * as React from "react";
import { useMemo, useRef } from "react";

import { BACKEND_ADDRESS } from "../../env";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MapView from "react-native-maps";
import VignetteCoach from "../../components/eleve/VignetteCoach";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function MapScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = React.useState("first");
  const [coachList, setCoachList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [Pin, setPin] = useState("");
  const [region, setRegion] = useState(null);

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
    if (currentPosition) {
      setRegion({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  }, [currentPosition]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
        // if (coachList.length > 0) {
        //   coachList.forEach((coach) => {
        //     setPin([...coach.villes]);
        //   });
        // }
      });
  }, []);

  // console.log(Pin);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "90%"], []);

  const coachs = coachList.map((data, i) => {
    return <VignetteCoach key={i} {...data} />;
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={region}
            mapType="hybridFlyover"
            style={styles.map}
          >
            <View style={styles.titleContainer}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText1}
                  placeholder="Trouvons un coach !"
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
              <View style={styles.filter}>
                {["Presentiel", "Distanciel", "Hybride", "Tout"].map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    onPress={() => setChecked(mode)}
                    style={[
                      styles.filterButton,
                      checked === mode && styles.filterButtonSelected,
                    ]}
                  >
                    <View style={styles.radioItem}>
                      <Text
                        style={[
                          styles.radioText,
                          checked === mode && styles.radioTextSelected,
                        ]}
                      >
                        {mode}
                      </Text>
                      <View
                        value={mode}
                        status={checked === mode ? "checked" : "unchecked"}
                        color="#DFB81C"
                      />
                    </View>
                  </TouchableOpacity>
                ))}
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

            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              handleStyle={{
                backgroundColor: "#DFB81C",
                height: 50,
                borderRadius: 2,
                justifyContent: "center",
              }}
            >
              <LinearGradient
                colors={["#21212E", "#43435C", "#6B6B94"]}
                style={styles.background}
              >
                <BottomSheetView style={styles.contentContainer}>
                  <ScrollView>
                    <View style={styles.espace}></View>
                    {coachs}
                  </ScrollView>
                </BottomSheetView>
              </LinearGradient>
            </BottomSheet>
          </MapView>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },

  cross: {
    position: "absolute",
    top: 50,
    right: 5,
    padding: 10,
  },
  titleContainer: {
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 80,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
  },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    width: "88%",
    height: 35,
    borderRadius: 5,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioContainer: {
    width: "85%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
  },
  radioTextSelected: {
    color: "white",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  filter: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  filterButton: {
    padding: 3,
    opacity: 1,
  },
  filterButtonSelected: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DFB81C",
    backgroundColor: "#DFB81C",
    opacity: 1,
  },

  contentContainer: {
    alignItems: "center",
    flex: 1,
  },
  espace: {
    height: 50,
  },
  scrollView: {
    flex: 1,
  },
});
