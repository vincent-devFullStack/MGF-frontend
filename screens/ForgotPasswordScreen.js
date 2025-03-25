import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_ADDRESS } from "../env";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [secretWord, setSecretWord] = useState("");

  const handlePasswordReset = async () => {
    if (!email.trim() || !secretWord.trim()) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs.");
    }

    try {
      const response = await fetch(`${BACKEND_ADDRESS}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, secretWord }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Succès", data.message);
      } else {
        Alert.alert("Erreur", data.error);
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue. Réessaie plus tard.");
    }
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              accessibilityLabel="Fermer l'écran de réinitialisation"
              accessibilityHint="Retour à l'écran de connexion"
              accessibilityRole="button"
              accessible={true}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faXmark}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            Réinitialiser votre mot de passe
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="gray"
            onChangeText={setEmail}
            accessibilityLabel="Email"
            accessibilityHint="Entrez votre adresse email pour réinitialiser votre mot de passe"
          />

          <TextInput
            style={styles.input}
            placeholder="Entrez votre secretWord"
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="gray"
            onChangeText={setSecretWord}
            accessibilityLabel="Mot secret"
            accessibilityHint="Entrez votre mot secret pour réinitialiser votre mot de passe"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handlePasswordReset}
            accesibilityLabel="Envoyer l'email de reinitialisation"
            accesibilityHint="Appuyez pour envoyer un email de réinitialisation du mot de passe"
            accesibilityRole="button"
            accessible={true}
          >
            <Text style={styles.buttonText}>Envoyer l'email</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: "white",
    borderColor: "gray",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  iconBack: {
    flexDirection: "row",
    width: "85%",
    height: "110%",
    justifyContent: "flex-end",
    position: "absolute",
    paddingTop: 70,
  },
  icon: { zIndex: 10 },
});

export default ForgotPassword;
