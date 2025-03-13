import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import * as Progress from "react-native-progress";

export default function TrainingScreen({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const { fullData } = route.params || {};

  const programmes = fullData.data.programmes;
  console.log(programmes);

  const handleClick = () => {
    setProgress((oldProgress) => {
      const newProgress = oldProgress + 0.25;
      return newProgress > 1 ? 1 : newProgress;
    });
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeEleve")}>
            <FontAwesomeIcon
              style={styles.iconBack}
              icon={faArrowLeft}
              size={20}
              color={"white"}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{programmes.name}</Text>
          {/* Affichage du composant Video */}
          <View style={styles.video}>
            <Image
              style={styles.videoSeance}
              source={
                programmes.photo
                  ? { uri: programmes.photo }
                  : require("../../assets/photo_eleve1.jpg")
              }
            />
          </View>
          <LinearGradient
            colors={[
              "#101018",
              "#383853",
              "#4B4B70",
              "#54547E",
              "#54547E",
              "#54547E",
            ]}
            style={styles.background2}
          >
            <Text style={styles.title2}>Soulevé de terre</Text>
            <Text style={styles.desc}>Carge recommandée : 140 kg</Text>
            <Text style={styles.desc}>Mouvement demandé: Contrôlé</Text>
            <View style={styles.container2}>
              <View style={styles.minicontainer}>
                <Progress.Circle
                  size={50}
                  progress={progress}
                  showsText
                  thickness={8}
                  borderWidth={0}
                  textStyle={{ fontWeight: "bold", fontSize: 10 }}
                  color="#DFB81C"
                />
                <Text style={styles.desc3}>Séries réalisées</Text>
              </View>
              <View style={styles.minicontainer}>
                <Progress.Circle
                  size={100}
                  // progress={progress}
                  showsText
                  thickness={8}
                  borderWidth={0}
                  textStyle={{ fontWeight: "bold", fontSize: 10 }}
                  color="#DFB81C"
                />
                <Text style={styles.desc3}>Récupération</Text>
              </View>
              <View style={styles.minicontainer}>
                <Progress.Circle
                  size={50}
                  // progress={progress}
                  showsText
                  thickness={8}
                  borderWidth={0}
                  textStyle={{ fontWeight: "bold", fontSize: 10 }}
                  color="#DFB81C"
                />
                <Text style={styles.desc3}>% de la charge max</Text>
              </View>
            </View>
            <View style={styles.ligneInput}>
              <TextInput
                style={styles.input}
                placeholder="Nb de reps"
                placeholderTextColor={"#B9B8B7"}
                keyboardType="numeric"
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="     Poids"
                placeholderTextColor={"#B9B8B7"}
                keyboardType="numeric"
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="      RPE"
                placeholderTextColor={"#B9B8B7"}
                keyboardType="numeric"
              ></TextInput>
              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: "#DFB81C" }]}
                onPress={handleClick}
              >
                <Text style={styles.textButtons}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ligneInput}>
              <TouchableOpacity
                style={[styles.buttonsEx, { backgroundColor: "white" }]}
                onPress={handleClick}
              >
                <Text style={styles.textButtons}>Voir tous les exercices</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: "#DFB81C" }]}
                onPress={handleClick}
              >
                <Text style={styles.textButtons}>///</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  video: {
    width: "80%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  videoSeance: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  container2: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  minicontainer: {
    alignItems: "center",
  },
  background2: {
    marginTop: 20,
    height: "70%",
    width: "90%",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    marginTop: 80,
    marginBottom: 20,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title2: {
    marginBottom: 20,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  desc: {
    color: "#fff",
  },
  desc3: {
    color: "#fff",
    fontSize: 10,
    flexWrap: "wrap",
  },
  iconBack: {
    position: "absolute",
    marginTop: "15%",
    right: "40%",
  },
  ligneInput: {
    paddingVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: 70,
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  buttons: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonsEx: {
    width: "60%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
