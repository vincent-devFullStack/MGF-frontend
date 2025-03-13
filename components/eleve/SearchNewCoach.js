import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { RadioButton } from "react-native-paper";
import { BACKEND_ADDRESS } from "../../env";
import MiniatureCoach from "../eleve/MiniatureCoach";
import { useNavigation } from "@react-navigation/native";
import MaskedView from "@react-native-community/masked-view";

function SearchNewCoach() {
  const [search, setSearch] = useState("");
  const [coachList, setCoachList] = useState([]);
  const [originalCoachList, setOriginalCoachList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
        setOriginalCoachList(data);
      });
  }, []);

  const handleSearch = () => {
    if (!search) {
      setCoachList(originalCoachList);
    } else {
      const lowerCaseSearch = search.toLowerCase();

      const filtered = originalCoachList.filter((coach) => {
        const villes = coach.villes || [];
        console.log(villes);

        return (
          villes.some((ville) =>
            ville.toLowerCase().includes(lowerCaseSearch)
          ) || coach.name.toLowerCase().includes(lowerCaseSearch)
        );
      });

      setCoachList(filtered);
    }
  };

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
                placeholder="Trouvons un coach !"
                onChangeText={setSearch}
                placeholderTextColor={"grey"}
                value={search}
              />
              <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                <Text>Search </Text>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faLocationDot}
                  size={20}
                  color={"#DFB81C"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MaskedView
            style={styles.maskedContainer}
            maskElement={
              <LinearGradient
                colors={["black", "black", "black", "transparent"]}
                style={styles.maskGradient}
              />
            }
          >
            <LinearGradient
              colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
              style={styles.coachListContainer}
            >
              <ScrollView contentContainerStyle={styles.coachList}>
                {coachList.length > 0 ? (
                  coachList.map((data, i) => (
                    <MiniatureCoach key={i} {...data} />
                  ))
                ) : (
                  <Text style={styles.noResults}>Aucun coach trouvé</Text>
                )}
              </ScrollView>
            </LinearGradient>
          </MaskedView>

          <View style={styles.btnPosition}>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => navigation.navigate("MapScreen")}
            >
              <Text style={styles.btn}>Ouvrir la carte</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
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
    padding: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputText1: {
    paddingLeft: 10,
  },
  searchBtn: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 5.5,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  coachList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  maskedContainer: {
    height: "65%",
    width: "95%",
    borderRadius: 10,
    overflow: "hidden",
  },
  maskGradient: {
    height: "100%",
    width: "100%",
  },
  nextBtn: {
    backgroundColor: "white",
    height: 42,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  btnPosition: {
    display: "absolute",
    marginTop: 40,
  },
});

export default SearchNewCoach;
