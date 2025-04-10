import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";

export default function ModalProgs({ route, navigation }) {
  const isFocused = useIsFocused();
  const { titre, path } = route.params;
  const coach = useSelector((state) => state.coach.value);

  const [lists, setLists] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (isFocused && coach?.token && path) {
      fetch(`${BACKEND_ADDRESS}/${path}/${coach.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (path === "programme") {
            setLists(data.programmes || []);
          }
          if (path === "exercice") {
            setLists(data.exercices || []);
          }
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des programmes:", error);
          setLists([]);
        });
    }
  }, [isFocused, refresh]);

  const handleDelete = async (name) => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/${path}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coachToken: coach.token, name: name }),
      });
      const data = await response.json();
      if (data.result) {
        console.log(`${name} a bien été supprimé`);
        setRefresh(!refresh);
      } else {
        console.log(`Erreur lors de la suppression`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  let texte = "";
  if (path === "programme") {
    texte = "ce programme";
  }
  if (path === "exercice") {
    texte = "cet exercice";
  }

  const buttonAlertDelete = (data) =>
    Alert.alert(`Êtes-vous sûre de supprimer ${texte} ?`, `${data}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => handleDelete(data) },
    ]);

  const butttonAlertModify = () =>
    Alert.alert("En cours de développement", "Veuillez nous en excuser", [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);

  const list = lists.map((data, i) => {
    return (
      <View style={styles.container} key={i}>
        <View style={styles.containerImage}>
          <Image
            source={
              data.photo
                ? { uri: data.photo }
                : require("../../../assets/séance.jpg")
            }
            style={styles.image}
            resizeMode="cover"
            accessibilityRole="image"
            accessibilityLabel={
              path === "exercice" ? "Image de l'exercice" : "Image du programme"
            }
          />
        </View>

        <View style={styles.containerText} accessible={true}>
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.textMini}>{data.description}</Text>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity
            onPress={butttonAlertModify}
            accessibilityLabel="Modifier"
            accessibilityHint={
              path === "exercice"
                ? "Ouvre une fenêtre pour modifier l'exercice"
                : "Ouvre une fenêtre pour modifier le programme"
            }
            accessibilityRole="button"
          >
            <FontAwesomeIcon icon={faPen} size={20} color="#DFB81C" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buttonAlertDelete(data.name)}
            accessibilityLabel="Supprimer"
            accessibilityHint={
              path === "exercice"
                ? "Ouvre une alerte pour confirmer la suppression de l'exercice"
                : "Ouvre une alerte pour confirmer la suppression du programme"
            }
            accessibilityRole="button"
          >
            <FontAwesomeIcon icon={faTrashCan} size={20} color="#B9B8B7" />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <View style={styles.iconXmark}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Fermer"
          accessibilityHint="Ferme la fenêtre"
          accessibilityRole="button"
        >
          <FontAwesomeIcon icon={faXmark} color="#B9B8B7" size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title} accessibilityRole="header">
        {titre}
      </Text>
      <ScrollView
        contentContainerStyle={styles.containerList}
        accessibilityRole="grid"
      >
        {list}
      </ScrollView>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            path === "exercice"
              ? () => navigation.navigate("ModalCreateExo")
              : () => navigation.navigate("ModalCreateProg")
          }
          accessibilityLabel={
            path === "exercice" ? "Nouvel exercice" : "Nouveau programme"
          }
          accessibilityHint={
            path === "exercice"
              ? "Ouvre une fenêtre pour créer un nouvel exercice"
              : "Ouvre une fenêtre pour créer un nouveau programme"
          }
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>
            {path === "exercice" ? "Nouvel exercice" : "Nouveau programme"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    padding: 10,
  },
  background: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 70,
    padding: 40,
    gap: 10,
  },
  iconXmark: {
    width: "100%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 34,
    color: "white",
  },
  containerList: {
    width: "93%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  containerText: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 5,
    width: "50%",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  textMini: {
    fontSize: 14,
    color: "white",
  },
  containerIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 40,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginBottom: 40,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 12,
  },
});
