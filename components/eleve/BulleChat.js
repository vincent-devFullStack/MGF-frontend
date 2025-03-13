import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import "moment/locale/fr";
import moment from "moment";
import { BACKEND_ADDRESS } from "../../env";

import React, { useState, useEffect } from "react";

export default function BulleChat({ conversation, fullData, onRefresh, role }) {
  const [deletedMessage, setDeletedMessage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteMessage = () => {
    if (!conversation?._id && role !== "eleve") return;

    Alert.alert("Confirmation", "Voulez-vous vraiment supprimer ce message ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Supprimer",
        onPress: () => confirmDelete(),
      },
    ]);
  };

  const confirmDelete = async () => {
    const payload = {
      token: fullData?.data?.token,
      texte: conversation.texte,
    };

    const response = await fetch(`${BACKEND_ADDRESS}/eleve/delete-message`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Réponse du serveur :", data);

    if (data.result) {
      console.log("Message supprimé avec succès !");
      setDeletedMessage(true);
    } else {
      console.error("Erreur suppression :", data.error);
      Alert.alert("Erreur", "Impossible de supprimer le message.");
    }
  };

  useEffect(() => {
    if (deletedMessage && onRefresh) {
      onRefresh();
    }
  }, [deletedMessage, onRefresh]);

  if (deletedMessage) return null;

  const formattedDate = moment(conversation.date).fromNow();
  const photoProfil =
    fullData?.data?.photoProfil || require("../../assets/icon.png");

  const isEleve = role === "eleve";

  console.log(fullData);

  console.log(conversation);

  return (
    <View style={styles.background}>
      {isEleve ? (
        <Image style={styles.profilIcon} source={{ uri: photoProfil }} />
      ) : (
        <Image
          style={styles.coachPosition}
          source={{ uri: fullData?.data?.coach?.photoProfil }}
        />
      )}
      <TouchableOpacity
        onLongPress={deleteMessage}
        style={styles.contenuMessage}
      >
        <Text style={styles.desc2}>{formattedDate}</Text>
        <Text style={styles.desc1}>{conversation.texte}</Text>
      </TouchableOpacity>
      {showConfirmation && (
        <View style={styles.confirmation}>
          <Text>Voulez-vous supprimer le message ?</Text>
          <View style={styles.choices}>
            <TouchableOpacity style={styles.btnYes} onPress={confirmDelete}>
              <Text>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNo} onPress={cancelDelete}>
              <Text>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    marginTop: 15,
    padding: 10,
    width: 320,

    justifyContent: "center",
    alignItems: "center",
  },
  profilIcon: {
    height: 76,
    width: 76,
    borderRadius: 50,
  },
  desc: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    color: "black",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  contenuMessage: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
  },
  desc1: {
    textAlign: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: "black",
  },
  desc2: {
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
  desc3: {
    right: 60,
    fontSize: 10,
    color: "grey",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  profilIcon: {
    position: "absolute",
    left: 270,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  coachPosition: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
  },
  confirmation: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    height: 70,
    justifyContent: "space-between",
  },
  btnYes: {
    height: 30,
    width: 120,
    backgroundColor: "#e8e9ea",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: "#c8c9ca",
  },
  btnNo: {
    height: 30,
    width: 120,
    backgroundColor: "#e8e9ea",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 5,
  },
  choices: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
