import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function VignetteProgramme(props) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#21212E", "#43435C", "#6B6B94"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={
            props.photo
              ? { uri: props.photo }
              : require("../../assets/séance.jpg")
          }
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => navigation.navigate("TrainingScreen")}
        >
          <Text style={styles.programmeTitle}>{props.name}</Text>
          <Text style={styles.duree}>Durée : {props.duree} semaines</Text>
          <Text style={styles.seances}>Séances : {props.seances}</Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  programmeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  duree: {
    fontSize: 14,
    color: "#d1d1d1",
    marginBottom: 3,
  },
  seances: {
    fontSize: 14,
    color: "#d1d1d1",
  },
});
