import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function VignetteEleve(props) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#21212E", "#43435C", "#6B6B94"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerImage}
          onPress={() => navigation.navigate("ModalChat", { eleve: props })}
        >
          <FontAwesomeIcon
            icon={faMessage}
            color={"white"}
            style={styles.icon}
          />
          <Image
            source={
              props.photoProfil
                ? { uri: props.photoProfil }
                : require("../../assets/photo_eleve1.jpg")
            }
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.containerText}>
          <Text style={styles.text}>{props.firstname || "Nom inconnu"}</Text>
          <Text style={styles.textType}>Présentiel</Text>
          <Text style={styles.text}>Expire dans :</Text>
          <Text style={styles.text}>16 jours</Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ModalProfil", { eleve: props })}
          >
            <Text style={styles.textButton}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Wallet")}
          >
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: "white",
  },
  textType: {
    fontSize: 12,
    color: "white",
    marginBottom: 10,
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
