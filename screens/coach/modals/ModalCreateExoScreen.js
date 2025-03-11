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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faXmark,
  faUpload,
  faImage,
  faVideo,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";

export default function ModalCreateExo({ route, navigation }) {
  const formData = new FormData();

  const coach = useSelector((state) => state.coach.value);

  const [erros, setErrors] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [ciblage, setCiblage] = useState("");
  const [utilisationMuscle, setUtilisationMuscle] = useState("");

  // Upload image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ photo: "Permission refusée" });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        // Clear any previous errors
        setErrors({ photo: "" });

        formData.append("photoFromFront", {
          uri: result?.assets[0].uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(`${BACKEND_ADDRESS}/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        setImage(data.url);
      }
    }
  };

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ photo: "Permission refusée" });
    } else {
      const result = await ImagePicker.launchMediaLibraryAsync({
        mediaType: "video",
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        // Clear any previous errors
        setErrors({ video: "" });

        formData.append("videoFromFront", {
          uri: result?.assets[0].uri,
          name: "video.mp4",
          type: "video/mp4",
        });

        const response = await fetch(`${BACKEND_ADDRESS}/upload-videos`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        setVideo(data.url);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.iconXmark}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faXmark} color="#B9B8B7" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Créer exercice</Text>

          <View style={styles.containerInput}>
            <Text style={styles.text}>Indiquez le nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setName(value)}
              value={name}
            ></TextInput>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.inputDescription}
              placeholder="Description"
              placeholderTextColor={"#B9B8B7"}
              multiline={true}
              onChangeText={(value) => setDescription(value)}
              value={description}
            ></TextInput>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.text}>Catégorie</Text>
            <TextInput
              style={styles.input}
              placeholder="Catégorie"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setCategorie(value)}
              value={categorie}
            ></TextInput>
          </View>

          <Text style={styles.textUpload}>Ajouter une image et une vidéo</Text>
          <View style={styles.containerUpload}>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.containerImage}
                onPress={pickImage}
              >
                {image ? (
                  <Image style={styles.image} source={{ uri: image }} />
                ) : (
                  <FontAwesomeIcon icon={faImage} color="#101018" size={40} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.containerImage}
                onPress={pickVideo}
              >
                {video ? (
                  <FontAwesomeIcon icon={faCheck} color="green" size={40} />
                ) : (
                  <FontAwesomeIcon icon={faVideo} color="#101018" size={40} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.textUpload}>
            Ajouter muscles ciblés et sollicités
          </Text>
          <View style={styles.box1}>
            <TextInput
              style={styles.inputBottom}
              placeholder="Ciblage"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setCiblage(value)}
              value={ciblage}
            ></TextInput>
            <TextInput
              style={styles.inputBottom}
              placeholder="Sollicitation musculaire"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setUtilisationMuscle(value)}
              value={utilisationMuscle}
            ></TextInput>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
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
    padding: 40,
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconXmark: {
    width: "100%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 34,
    color: "white",
    marginBottom: 20,
  },
  containerInput: {
    width: "100%",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  inputDescription: {
    height: 60,
    width: "100%",
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  containerUpload: {
    flexDirection: "row",
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  textUpload: {
    color: "white",
    fontSize: 18,
    width: "100%",
    marginTop: 10,
    textAlign: "center",
  },
  box: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  containerImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  box1: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  inputBottom: {
    width: "45%",
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 30,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 12,
  },
});
