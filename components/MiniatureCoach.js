import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BACKEND_ADDRESS } from "../env";

function MiniatureCoach(props) {
  const dispatch = useDispatch();
  const [coachList, setCoachList] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/coach`)
      .then((response) => response.json())
      .then((data) => {
        setCoachList(data);
      });
  }, []);
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
        style={styles.background}
      >
        <View>
          <Image
            style={styles.profilIcon}
            source={{ uri: props.photoProfil }}
          />
          <Text style={styles.desc}>{props.firstname}</Text>
          <Text style={styles.desc1}>{props.domaineExpertise}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  background: {
    marginTop: 15,
    marginLeft: 25,
    padding: 10,
    backgroundColor: "white",
    height: 150,
    width: 130,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  profilIcon: {
    height: 76,
    width: 76,
    borderRadius: 50,
  },
  desc: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  desc1: {
    textAlign: "center",
    fontSize: 14,
  },
});

export default MiniatureCoach;
