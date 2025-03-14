import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Modal,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import * as React from "react";
import { useMemo, useRef } from "react";
import { BACKEND_ADDRESS } from "../../env";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faXmark,
  faLocationDot,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import MapView, { Marker } from "react-native-maps";
import VignetteCoach from "../../components/eleve/VignetteCoach";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function MapScreen({ navigation }) {
  const [search, setSearch] = useState("");
  // const [checked, setChecked] = React.useState("first");
  const [coachList, setCoachList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [Pin, setPin] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

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
    const fetchCoaches = async () => {
      const response = await fetch(`${BACKEND_ADDRESS}/coach`);
      const data = await response.json();
      setCoachList(data);

      let coachDetails = [];

      for (let coach of data) {
        let villesAvecCoords = [];

        for (let ville of coach.villes) {
          const geoResponse = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${ville}`
          );
          const geoData = await geoResponse.json();

          if (geoData.features.length > 0) {
            const { coordinates } = geoData.features[0].geometry;
            villesAvecCoords.push({
              nom: ville,
              latitude: coordinates[1],
              longitude: coordinates[0],
            });
          }
        }

        coachDetails.push({
          firstname: coach.firstname,
          photoProfil: coach.photoProfil,
          presentation: coach.presentation,
          diplomes: coach.diplomes,
          email: coach.email,
          villes: villesAvecCoords,
        });
      }

      setPin(coachDetails);
      setFilteredCoaches(coachDetails);
    };

    fetchCoaches();
  }, []);

  const sendEmail = () => {
    const email = selectedCoach.email;
    const subject = "Premier contact";
    const body =
      "Bonjour, je souhaiterais discuter avec vous. Mes numéro de téléphone est le suivant : (Indiquez votre n° de téléphone ici)";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Ouvre l'application de messagerie
    Linking.openURL(mailtoUrl).catch((err) =>
      console.error("Failed to open email client", err)
    );
  };

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "90%"], []);

  const coachs = coachList.map((data, i) => {
    return <VignetteCoach key={i} {...data} />;
  });

  const handleSearch = () => {
    const filtered = Pin.filter((coach) => {
      if (!search) return true;
      const lowerCaseSearch = search.toLowerCase();
      return (
        coach.firstname.toLowerCase().includes(lowerCaseSearch) ||
        coach.villes.some((ville) =>
          ville.nom.toLowerCase().includes(lowerCaseSearch)
        )
      );
    });

    setFilteredCoaches(filtered);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView initialRegion={region} mapType="hybrid" style={styles.map}>
            <View style={styles.iconBack}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeEleve")}
              >
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faArrowLeft}
                  size={20}
                  color={"#DFB81C"}
                />
              </TouchableOpacity>
            </View>
            {filteredCoaches &&
              filteredCoaches.map((coach, index) =>
                coach.villes.map((ville, i) => (
                  <Marker
                    key={`${index}-${i}`}
                    coordinate={{
                      latitude: ville.latitude,
                      longitude: ville.longitude,
                    }}
                    title={coach.firstname}
                    description={`Disponible à ${ville.nom}`}
                    onPress={() => {
                      setSelectedCoach(coach);
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.markerContainer}>
                      <Image
                        source={
                          coach.photoProfil
                            ? { uri: coach.photoProfil }
                            : require("../../assets/photo_coach1.jpg")
                        }
                        style={styles.markerImage}
                      />
                    </View>
                  </Marker>
                ))
              )}
            <View style={styles.titleContainer}>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText1}
                  placeholder="Trouvons un coach !"
                  onChangeText={setSearch}
                  placeholderTextColor={"grey"}
                  value={search}
                />
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={handleSearch}
                >
                  <Text>Search </Text>
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={faLocationDot}
                    size={20}
                    color={"#DFB81C"}
                  />
                </TouchableOpacity>
              </View>
              {/* A activer lorsque l'option sera disponible coté coatch
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
                    </View>
                  </TouchableOpacity>
                ))}
              </View> */}
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
                {selectedCoach && (
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <LinearGradient
                      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
                      style={styles.modalContainer}
                    >
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          style={styles.cross}
                          onPress={() => setModalVisible(false)}
                        >
                          <FontAwesomeIcon
                            style={styles.icon}
                            icon={faXmark}
                            size={20}
                            color={"white"}
                          />
                        </TouchableOpacity>
                        <Image
                          style={styles.profilIconLarge}
                          source={{ uri: selectedCoach.photoProfil }}
                        />
                        <Text style={styles.modalTitle}>
                          {selectedCoach.firstname}
                        </Text>
                        <Text style={styles.modalTitle2}>Présentation: </Text>
                        <Text style={styles.modalText}>
                          {selectedCoach.presentation}
                        </Text>
                        <Text style={styles.modalTitle2}>Diplôme(s): </Text>
                        <Text style={styles.modalText}>
                          {selectedCoach.diplomes?.join(", ")}
                        </Text>
                        <Text style={styles.modalTitle3}>Lieu(x): </Text>
                        <Text style={styles.modalText}>
                          {selectedCoach.villes
                            .map((data) => data.nom)
                            .join(", ")}
                        </Text>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={sendEmail}
                        >
                          <Text style={styles.closeButtonText}>
                            Me contacter
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </Modal>
                )}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText1: {
    paddingLeft: 10,
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
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  searchBtn: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 5.5,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  // Styles de la modale
  modalContainer: {
    marginTop: 80,
    height: 750,
    borderRadius: 10,
    width: "91%",
    left: 19,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    color: "white",
    paddingBottom: 10,
  },
  modalTitle2: {
    marginTop: 10,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "30%",
  },
  modalTitle3: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "37%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  profilIconLarge: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 50,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
  cross: {
    position: "absolute",
    top: -15,
    right: -5,
    padding: 10,
  },
  iconBack: {
    flexDirection: "row",
    width: "10%",
    height: "4%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 48,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
    zIndex: 10,
    left: 25,
  },
});
