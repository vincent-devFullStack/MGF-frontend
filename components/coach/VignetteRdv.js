import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function VignetteRdv(props) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#21212E", "#43435C", "#6B6B94"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerImage}>
          <FontAwesomeIcon
            icon={faMessage}
            color={"white"}
            style={styles.icon}
          />
          <Image
            source={
              props.eleve.photoProfil
                ? { uri: props.eleve.photoProfil }
                : require("../../assets/photo_eleve1.jpg")
            }
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.containerText}>
          <Text style={styles.text}>Rendez vous à :</Text>
          <Text style={styles.text}>{props.heure}</Text>
          <Text style={styles.text}>Présentiel</Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("ModalProfil", { eleve: props.eleve })
            }
          >
            <Text style={styles.textButton}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Abonnement</Text>
          </TouchableOpacity>
        </View>
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
