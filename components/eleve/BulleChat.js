import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "moment/locale/fr";
import moment from "moment";

import * as React from "react";

export default function BulleChat({ conversation, fullData }) {
  if (!conversation) {
    return (
      <View style={styles.background}>
        <Text style={styles.desc1}>Aucune conversation disponible</Text>
      </View>
    );
  }
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
    textAlign: "center",
    fontSize: 15,
    color: "black",
  },
  desc2: {
    textAlign: "center",
    fontSize: 13,
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
});
