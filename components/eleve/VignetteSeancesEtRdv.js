import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function VignetteSeancesEtRdv(props) {
  // Assure-toi que les props rdv et programmes existent, sinon utilise des tableaux vides comme valeurs par défaut
  const { rdv = [], programmes = [], eleve = {} } = props;

  // Combine les deux tableaux
  const allItems = [...rdv, ...programmes];

  // Fonction de suppression (il faudrait les adapter à ta logique)
  const handleDeleteRdv = (rdvId) => {
    console.log(`Supprimer le RDV avec l'ID : ${rdvId}`);
  };

  const handleDeleteProgramme = (programmeId) => {
    console.log(`Supprimer le Programme avec l'ID : ${programmeId}`);
  };

  // Assure-toi que allItems contient bien des données
  const allItemsList =
    allItems.length > 0 ? (
      allItems.map((data, i) => {
        const isRdv = data.hasOwnProperty("heure"); // Vérifie si c'est un RDV ou un programme

        return (
          <View key={i} style={styles.card}>
            <View>
              <Text style={styles.name}>
                {isRdv ? "Rendez-vous à :" : "Programme à :"}
              </Text>
              <Text style={styles.text}>{data.heure}</Text>
              <Text style={styles.text}>
                {isRdv ? "Présentiel" : "En ligne"}
              </Text>
            </View>
            <FontAwesomeIcon
              icon={faMessage} // Icône pour la suppression
              onPress={() =>
                isRdv
                  ? handleDeleteRdv(data._id)
                  : handleDeleteProgramme(data._id)
              }
              size={25}
              color="#ec6e5b"
            />
          </View>
        );
      })
    ) : (
      <Text style={styles.text}>Aucun rendez-vous ou programme disponible</Text>
    );

  return (
    <LinearGradient
      colors={["#21212E", "#43435C", "#6B6B94"]}
      style={styles.background}
    >
      <View style={styles.container}>{allItemsList}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#3e3e59",
    padding: 10,
    borderRadius: 10,
  },
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  containerText: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  name: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: "white",
  },
  containerBtn: {
    gap: 10,
  },
  button: {
    width: 120,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    fontSize: 14,
    color: "#21212E",
    fontWeight: "bold",
  },
});
