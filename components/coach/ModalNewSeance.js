import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKEND_ADDRESS } from "../../env";
import { useDispatch } from "react-redux";
import { updateProgramme } from "../../reducers/programme";
import { useState } from "react";

export default function ModalNewSeance() {
  return (
    <View style={styles.popup}>
      <LinearGradient
        colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
        style={styles.popupInner}
      >
        <Text>Modal popup</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
  popupInner: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.75)",
    width: "100%",
    height: "100%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
