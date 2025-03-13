import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BulleChat from "../../../components/eleve/BulleChat";
import moment from "moment";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function ModalCreateExo({ route, navigation }) {
  const { eleve } = route.params;
  const [message, setMessage] = useState("");
  const [fullData, setFullData] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const isFocused = useIsFocused();
  const coachData = useSelector((state) => state.coach.value);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/eleve/${eleve.token}`);
      const data = await response.json();
      setFullData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return; // Évite d'envoyer un message vide

    const payload = {
      token: eleve.token,
      texte: message,
      firstname: eleve.firstname,
      role: "coach",
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

  const conversations = fullData?.data?.conversations || [];

  const Chat = Array.isArray(conversations)
    ? conversations.map((conversation, i) => (
        <BulleChat
          key={i}
          conversation={conversation}
          fullData={fullData}
          role="coach"
        />
      ))
    : null;

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.iconXmark}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faXmark} color="#B9B8B7" size={24} />
            </TouchableOpacity>

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
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 70,
    padding: 20,
  },
  container: {
    width: "100%",
    height: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconXmark: {
    width: "100%",
    alignItems: "flex-end",
  },
  messages: {
    height: "90%",
    width: "100%",
    alignItems: "center",

    marginBottom: 10,
    marginTop: 10,
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
