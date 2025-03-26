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

import * as Yup from "yup";

const newExoSchema = Yup.object().shape({
  name: Yup.string().required("Nom de l'exercice requis"),
  description: Yup.string().required("Description de l'exercice requise"),
  image: Yup.string().required("Photo de l'exercice requise"),
  video: Yup.string().required("Vidéo de l'exercice requise"),
  ciblage: Yup.string().required("Ciblage de l'exercice requis"),
  utilisationMuscle: Yup.number().required(
    "Utilisation musculaire de l'exercice requise"
  ),
  categorie: Yup.string().required("Catégorie de l'exercice requise"),
});

export default function ModalCreateExo({ route, navigation }) {
  const formData = new FormData();

  const coach = useSelector((state) => state.coach.value);

  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [ciblage, setCiblage] = useState("");
  const [utilisationMuscle, setUtilisationMuscle] = useState(0);

  // Upload image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ image: "Permission refusée" });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        // Clear any previous errors
        setErrors({ image: "" });

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

  // Upload video
  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ photo: "Permission refusée" });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "videos",
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

  //Création de l'exercice
  const createExo = async () => {
    try {
      await newExoSchema.validate(
        {
          name,
          description,
          image,
          video,
          ciblage,
          utilisationMuscle,
          categorie,
        },
        { abortEarly: false }
      );

      setErrors({});

      const response = await fetch(`${BACKEND_ADDRESS}/exercice/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          description: description,
          photo: image,
          video: video,
          ciblage: ciblage,
          utilisationMuscle: utilisationMuscle,
          categorie: categorie,
          coachToken: coach.token,
        }),
      });

      const data = await response.json();

      if (data.result) {
        navigation.navigate("Progs");
      } else {
        setErrors({ ...errors, error: data.error });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};

        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });

        setErrors(yupErrors);
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              accessibilityLabel="Fermer la fenêtre"
              accessibilityHint="Ferme la fenêtre de création d'exercice"
              accessibilityRole="button"
            >
              <FontAwesomeIcon icon={faXmark} color="#B9B8B7" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title} accessibilityRole="header">
            Créer exercice
          </Text>

          <View style={styles.containerInput}>
            <Text style={styles.text} accessibilityRole="text">
              Indiquez le nom
            </Text>
            <TextInput
              style={styles.input}
              placeholder=" Nom"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setName(value)}
              value={name}
              accessibilityLabel="Nom de l'exercice"
              accessibilityHint="Indiquez le nom de l'exercice"
            ></TextInput>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.text} accessibilityRole="text">
              Description
            </Text>
            <TextInput
              style={styles.inputDescription}
              placeholder=" Description"
              placeholderTextColor={"#B9B8B7"}
              multiline={true}
              onChangeText={(value) => setDescription(value)}
              value={description}
              accessibilityLabel="Description de l'exercice"
              accessibilityHint="Indiquez la description de l'exercice"
            ></TextInput>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.text} accessibilityRole="text">
              Catégorie
            </Text>
            <TextInput
              style={styles.input}
              placeholder=" Catégorie"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setCategorie(value)}
              value={categorie}
              accessibilityLabel="Catégorie de l'exercice"
              accessibilityHint="Indiquez la catégorie de l'exercice"
            ></TextInput>
          </View>

          <Text style={styles.textUpload} accessibilityRole="text">
            Ajouter une image et une vidéo
          </Text>
          <View style={styles.containerUpload}>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.containerImage}
                onPress={pickImage}
                accessibilityLabel="Ajouter une image"
                accessibilityHint="Ajoute une image de l'exercice"
                accessibilityRole="imagebutton"
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
                accessibilityLabel="Ajouter une vidéo"
                accessibilityHint="Ajoute une vidéo de l'exercice"
                accessibilityRole="button"
              >
                {video ? (
                  <FontAwesomeIcon icon={faCheck} color="green" size={40} />
                ) : (
                  <FontAwesomeIcon icon={faVideo} color="#101018" size={40} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxErrors}>
            <ScrollView
              contentContainerStyle={styles.containerErrors}
              showsVerticalScrollIndicator={false}
              accessibilityRole="grid"
            >
              {errors.name && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.name}
                </Text>
              )}

              {errors.video && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.video}
                </Text>
              )}

              {errors.description && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.description}
                </Text>
              )}

              {errors.image && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.image}
                </Text>
              )}

              {errors.ciblage && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.ciblage}
                </Text>
              )}

              {errors.utilisationMuscle && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.utilisationMuscle}
                </Text>
              )}

              {errors.categorie && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.categorie}
                </Text>
              )}

              {errors.error && (
                <Text style={styles.error} accessibilityRole="text">
                  {errors.error}
                </Text>
              )}
            </ScrollView>
          </View>

          <Text style={styles.textUpload} accessibilityRole="text">
            Ajouter muscles ciblés et sollicités
          </Text>

          <View style={styles.box1}>
            <TextInput
              style={styles.inputBottom}
              placeholder=" Ciblage"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setCiblage(value)}
              value={ciblage}
              accessibilityLabel="Muscles ciblés"
              accessibilityHint="Indiquez les muscles ciblés"
            ></TextInput>
            <TextInput
              style={styles.inputBottom}
              placeholder=" Sollicitation musculaire"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setUtilisationMuscle(value)}
              value={utilisationMuscle}
              accessibilityLabel="Utilisation musculaire"
              accessibilityHint="Indiquez l'utilisation musculaire"
            ></TextInput>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={createExo}
              accessibilityLabel="Valider l'exercice"
              accessibilityHint="Valide la création de l'exercice"
              accessibilityRole="button"
            >
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
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingTop: 30,
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
    display: "absolute",
    bottom: -20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 40,
    backgroundColor: "#DFB81C",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginBottom: 30,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 12,
  },
  boxErrors: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingTop: 10,
  },
  containerErrors: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  error: {
    color: "red",
  },
});
