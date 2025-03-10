import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "moment/locale/fr";
import moment from "moment";
import { BACKEND_ADDRESS } from "../../env";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

export default function BulleChat({ conversation, fullData, onRefresh }) {
  const [deletedMessage, setDeletedMessage] = useState(false);

  const deleteMessage = async () => {
    if (!conversation?._id) return;

    const payload = {
      token: fullData?.data?.token,
      texte: conversation.texte,
    };

    try {
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
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
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

  const isCoach = fullData?.data?.role === "coach";

  return (
    <View style={styles.background}>
      <Image
        style={[styles.profilIcon, isCoach ? styles.coachPosition : null]}
        source={{ uri: photoProfil }}
      />
      <View style={styles.contenuMessage}>
        <Text style={styles.desc2}>{formattedDate}</Text>
        <Text style={styles.desc1}>{conversation.texte}</Text>
      </View>
      <TouchableOpacity onPress={deleteMessage}>
        <Text style={styles.desc2}>Supprimer</Text>
      </TouchableOpacity>
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
    left: 20, // Déplace l'image à gauche
    position: "absolute",
  },
  icon: {
    position: "absolute",
  },
});
