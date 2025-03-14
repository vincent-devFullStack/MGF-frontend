import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import { BACKEND_ADDRESS } from "../../env";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function VignetteCoach(props) {
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerImage}>
        <FontAwesomeIcon icon={faMessage} color={"white"} style={styles.icon} />
        <Image
          source={
            props.photoProfil
              ? { uri: props.photoProfil }
              : require("../../assets/photo_coach1.jpg")
          }
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.vignette}>
          <View style={styles.containerText}>
            <Text style={styles.textName}>{props.firstname}</Text>
            <Text style={styles.desc1}>{props.domaineExpertise}</Text>
            <Text style={styles.desc2}>
              {props.diplomes[0]} {props.diplomes[1]} {props.diplomes[2]}
              {props.diplomes[3]}
            </Text>
          </View>
        </View>
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
                source={
                  props.photoProfil
                    ? { uri: props.photoProfil }
                    : require("../../assets/photo_coach1.jpg")
                }
              />
              <Text style={styles.modalTitle}>{props.firstname}</Text>
              <Text style={styles.modalTitle2}>Présentation: </Text>
              <Text style={styles.modalText}>{props.presentation}</Text>
              <Text style={styles.modalTitle2}>Diplôme(s): </Text>
              <Text style={styles.modalText}>
                {props.diplomes[0]} {props.diplomes[1]} {props.diplomes[2]}
              </Text>
              <Text style={styles.modalTitle3}>Lieu(x): </Text>
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
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
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
    left: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  desc1: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  desc2: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
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
  vignette: {
    flexDirection: "row",
    right: 25,
  },
  textName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    color: "white",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    color: "white",
    paddingBottom: 3,
  },

  // Styles de la modale
  modalContainer: {
    marginTop: 90,
    height: 750,
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
    color: "white",
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    color: "white",
    paddingBottom: 10,
  },
  modalTitle2: {
    marginTop: 10,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "30%",
  },
  modalTitle3: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#DFB81C",
    right: "37%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
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
    top: -15,
    right: -5,
    padding: 10,
  },
});
