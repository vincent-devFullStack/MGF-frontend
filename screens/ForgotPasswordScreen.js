import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKEND_ADDRESS } from "../env";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
          <Text style={styles.title}>Réinitialiser votre mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
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
  chantier: {
    height: 500,
    width: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: "white",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default ForgotPassword;
