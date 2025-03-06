import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BACKEND_ADDRESS } from "../../env";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { BlurView } from "expo-blur";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MiniatureCoach(props) {
  const dispatch = useDispatch();
  const [coachList, setCoachList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const sendEmail = () => {
    const email = props.email;
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

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
      });
  }, []);

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <LinearGradient
        colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
        style={styles.background}
      >
        <View style={styles.content}>
          <Image
            style={styles.profilIcon}
            source={{ uri: props.photoProfil }}
          />
          <Text style={styles.desc}>{props.firstname}</Text>
          <Text style={styles.desc1}>{props.domaineExpertise}</Text>
        </View>
      </LinearGradient>
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
              source={{ uri: props.photoProfil }}
            />
            <Text style={styles.modalTitle}>{props.firstname}</Text>
            <Text style={styles.modalTitle2}>Présentation: </Text>
            <Text style={styles.modalText}>{props.presentation}</Text>
            <Text style={styles.modalTitle2}>Diplôme(s): </Text>
            <Text style={styles.modalText}>
              {props.diplomes[0]} {props.diplomes[1]} {props.diplomes[2]}
            </Text>
            <Text style={styles.modalTitle2}>Lieu(x) d'exercice: </Text>
            <Text style={styles.modalText}>
              {props.lieux[0]} {props.lieux[1]} {props.lieux[2]}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={sendEmail}>
              <Text style={styles.closeButtonText}>Me contacter</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  background: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "white",
    height: 170,
    width: 140,
    borderRadius: 10,
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
  },
  desc1: {
    textAlign: "center",
    fontSize: 14,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  // Styles de la modale
  modalContainer: {
    marginTop: 100,
    height: 660,
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
  },
  modalTitle2: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
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
    top: 0,
    right: 10,
    padding: 10,
  },
});

export default MiniatureCoach;
