import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Vignette(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={
            props.photo
              ? { uri: props.photo }
              : require("../../assets/photo_eleve2.jpg")
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerText}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.textMini}>{props.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
  },
  containerImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  containerText: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  textMini: {
    fontSize: 14,
    color: "white",
  },
});
