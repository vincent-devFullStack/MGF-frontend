import { useEffect, useState } from "react";
import * as React from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";
import "moment/locale/fr";
import SearchNewCoach from "../../components/eleve/SearchNewCoach";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BulleChat from "../../components/eleve/BulleChat";
import moment from "moment";

export default function HomeEleveScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [fullData, setFullData] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const isFocused = useIsFocused();
  const eleveData = useSelector((state) => state.eleve.value);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ADDRESS}/eleve/${eleveData.token}`
      );
      const data = await response.json();
      setFullData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const payload = {
      token: eleveData.token,
      texte: message,
      firstname: eleveData.firstname,
      role: "eleve",
    };

    try {
      const response = await fetch(`${BACKEND_ADDRESS}/eleve/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.result) {
        setMessage("");
        setMessageSent(messageSent === false ? true : false);
      } else {
        console.error("Erreur lors de l'envoi :", data.error);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [messageSent]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
        if (data.data.coach === undefined) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
  }, [isFocused]);

  const researchVisibleCard = () => {
    if (visible) {
      return <SearchNewCoach />;
    }
  };

  if (!isFocused) {
    return <View />;
  }

  const conversations = fullData?.data?.conversations || [];
  const photoProfil =
    fullData?.data?.photoProfil || require("../../assets/icon.png");

  const Chat = Array.isArray(conversations)
    ? conversations.map((conversation, i) => (
        <BulleChat
          key={i}
          conversation={conversation}
          fullData={fullData}
          role="eleve"
        />
      ))
    : null;

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      {researchVisibleCard()}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
              <Image style={styles.profilIcon} source={{ uri: photoProfil }} />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>
                Bonne Séance
                <Text style={styles.titleColor}> {eleveData.firstname}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.date}>
            {moment().locale("fr").format("dddd Do MMMM")}
          </Text>
          <TouchableOpacity
            style={styles.seance}
            onPress={() => navigation.navigate("TrainingScreen", { fullData })}
          >
            <Image
              style={styles.imgSeance}
              source={
                eleveData.photoProfil
                  ? { uri: eleveData.photoProfil }
                  : require("../../assets/séance.jpg")
              }
            />
          </TouchableOpacity>
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
            <View style={styles.messages}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {Chat}
              </ScrollView>
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText1}
                onChangeText={setMessage}
                placeholder="Tapez votre message ici pour répondre"
                placeholderTextColor="grey"
                value={message}
              />
              <TouchableOpacity onPress={sendMessage}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faPaperPlane}
                  size={20}
                  color="#DFB81C"
                />
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
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
  },
  header: {
    height: 120,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    width: 270,
  },
  profilIcon: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  date: {
    right: 70,
    color: "white",
    fontSize: 20,
    marginBottom: 30,
  },
  seance: {
    backgroundColor: "white",
    height: "25%",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  imgSeance: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
  background2: {
    marginTop: 20,
    height: "70%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  messages: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 5,
    padding: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputText1: {
    paddingLeft: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: -10,
  },
});
