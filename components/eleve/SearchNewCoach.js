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

function SearchNewCoach() {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = React.useState("first");
  const [coachList, setCoachList] = useState([]);
  const navigation = useNavigation(); // modification de la navigation, avec la méthode précedente j'obtiens navigation "Undefined"

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
      });
  }, []);

  console.log(coachList);

  const coachs = coachList.map((data, i) => {
    return <MiniatureCoach key={i} {...data} />;
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
          </View>
          <LinearGradient
            colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
            style={styles.background2}
          >
            <ScrollView contentContainerStyle={styles.coachList}>
              {coachs}
            </ScrollView>
          </LinearGradient>
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
  background2: {
    flexDirection: "row",
    height: "60%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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
    marginTop: 30,
  },
  coachList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

export default SearchNewCoach;
