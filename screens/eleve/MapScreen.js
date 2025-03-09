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
} from "react-native";
import * as Location from "expo-location";
import * as React from "react";
import { useMemo, useRef } from "react";
import { BACKEND_ADDRESS } from "../../env";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MapView, { Marker } from "react-native-maps";
import VignetteCoach from "../../components/eleve/VignetteCoach";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function MapScreen({ navigation }) {
  const [search, setSearch] = useState(""); // Champ de recherche
  const [checked, setChecked] = React.useState("first");
  const [coachList, setCoachList] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [Pin, setPin] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]); // Nouvel état pour les résultats filtrés
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

      if (data.length > 0) {
        const coachDetails = await Promise.all(
          data.map(async (coach) => {
            const villesAvecCoords = await Promise.all(
              coach.villes.map(async (ville) => {
                const geoResponse = await fetch(
                  `https://api-adresse.data.gouv.fr/search/?q=${ville}`
                );
                const geoData = await geoResponse.json();

                if (geoData.features.length > 0) {
                  const { coordinates } = geoData.features[0].geometry;

                  return {
                    nom: ville,
                    latitude: coordinates[1],
                    longitude: coordinates[0],
                  };
                }
                return null;
              })
            );

            return {
              firstname: coach.firstname,
              photoProfil: coach.photoProfil,
              villes: villesAvecCoords.filter(Boolean), // Supprime les villes null
            };
          })
        );

        setPin(coachDetails); // Garde les coachs non filtrés
        setFilteredCoaches(coachDetails); // Initialisation des coachs affichés
      }
    };

    fetchCoaches();
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "90%"], []);

  const coachs = coachList.map((data, i) => {
    return <VignetteCoach key={i} {...data} />;
  });

  // Fonction de recherche de coachs par ville ou nom
  const handleSearch = () => {
    // Recherche de coachs uniquement au clic sur le bouton
    const filtered = Pin.filter((coach) => {
      if (!search) return true; // Si le champ de recherche est vide, on affiche tous les coachs
      const lowerCaseSearch = search.toLowerCase();
      return (
        coach.firstname.toLowerCase().includes(lowerCaseSearch) ||
        coach.villes.some((ville) =>
          ville.nom.toLowerCase().includes(lowerCaseSearch)
        )
      );
    });

    setFilteredCoaches(filtered); // Met à jour les résultats filtrés
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={region}
            mapType="hybridFlyover"
            style={styles.map}
          >
            {/* Affichage des Markers filtrés pour chaque coach */}
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
                  >
                    <View style={styles.markerContainer}>
                      <Image
                        source={{ uri: coach.photoProfil }} // Utilisation de la photo du coach
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
                  onPress={handleSearch} // Appeler la fonction de recherche au clic
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
});
