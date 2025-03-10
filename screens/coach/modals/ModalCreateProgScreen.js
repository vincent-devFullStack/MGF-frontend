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
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faUpload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";
import ModalNewSeance from "../../../components/coach/ModalNewSeance";

import * as Yup from "yup";

const newProgSchema = Yup.object().shape({
  name: Yup.string().required("Nom du programme requis"),
  duree: Yup.number().required("Durée du programme requise"),
  description: Yup.string().required("Description du programme requise"),
  photo: Yup.string().required("Photo du programme requise"),
  seances: Yup.number().required("Nombre de séances requises"),
  exercices: Yup.array().required("Exercices du programme requis"),
});

export default function ModalCreateProg({ route, navigation }) {
  const coach = useSelector((state) => state.coach.value);
  const programme = useSelector((state) => state.programme.value);

  const [errors, setErrors] = useState({});
  const [displayModal, setDisplayModal] = useState(false);

  const [name, setName] = useState("");
  const [duree, setDuree] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [seances, setSeances] = useState(0);
  const [exercices, setExercices] = useState([]);

  // Upload image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      setErrors({ photo: "Permission refusée" });
    } else {
      // Launch the image library and get
      // the selected image
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

        setPhoto(data.url);
      }
    }
  };

  // Create new seance
  const newSeance = () => {
    setSeances(seances + 1);
    setDisplayModal(!displayModal);
  };

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <View style={styles.container}>
        {displayModal ? <ModalNewSeance /> : null}
        <View style={styles.iconXmark}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faXmark} color="#B9B8B7" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Créer programme</Text>

        <View style={styles.containerInput}>
          <Text style={styles.text}>Indiquez le nom et durée du programme</Text>

          <View style={styles.box1}>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setName(value)}
              value={name}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Durée en semaines"
              placeholderTextColor={"#B9B8B7"}
              onChangeText={(value) => setDuree(value)}
              value={duree}
              keyboardType="numeric"
            ></TextInput>
          </View>

          <TextInput
            style={styles.inputDescription}
            placeholder="Description du programme"
            placeholderTextColor={"#B9B8B7"}
            onChangeText={(value) => setDescription(value)}
            value={description}
          ></TextInput>

          <View style={styles.box2}>
            <Text style={styles.text}>Choisissez une image :</Text>
            <TouchableOpacity style={styles.containerImage} onPress={pickImage}>
              {photo ? (
                <Image style={styles.image} source={{ uri: photo }} />
              ) : (
                <FontAwesomeIcon icon={faUpload} color="#101018" size={40} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerSeances}>
          <View style={styles.box3}>
            <Text style={styles.text2}>Ajouter une séance :</Text>
            <TouchableOpacity style={styles.buttonPlus} onPress={newSeance}>
              <FontAwesomeIcon icon={faPlus} color="#101018" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.containerList}></ScrollView>
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
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
    marginBottom: 10,
  },
  containerInput: {
    width: "100%",
    height: 300,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 18,
    width: "100%",
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
  input: {
    width: "45%",
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  inputDescription: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  box2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
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
  containerSeances: {
    width: "100%",
    height: 300,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "#DFB81C",
    borderWidth: 1,
  },
  box3: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  text2: { color: "white", fontSize: 18 },
  buttonPlus: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
