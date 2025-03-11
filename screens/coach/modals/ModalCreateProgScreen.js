import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faUpload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import { updateProgramme, removeProgramme } from "../../../reducers/programme";

import * as Yup from "yup";

const newProgSchema = Yup.object().shape({
  name: Yup.string().required("Nom du programme requis"),
  duree: Yup.number().required("Durée du programme requise"),
  description: Yup.string().required("Description du programme requise"),
  photo: Yup.string().required("Photo du programme requise"),
  seances: Yup.number().required("Nombre de séances requises"),
});

export default function ModalCreateProg({ route, navigation }) {
  const dispatch = useDispatch();
  const formData = new FormData();

  const coach = useSelector((state) => state.coach.value);
  const programme = useSelector((state) => state.programme.value);

  const [errors, setErrors] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [dataSet, setDataSet] = useState([]);

  const [name, setName] = useState("");
  const [duree, setDuree] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [seances, setSeances] = useState(0);
  const [exercices, setExercices] = useState([]);

  const [exercice, setExercice] = useState([]);
  const [series, setSeries] = useState(0);
  const [repetitions, setRepetitions] = useState(0);

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

  // Fetch des exercices
  const searchExercices = (query) => {
    if (query === "") {
      return;
    }

    fetch(`${BACKEND_ADDRESS}/exercice/search/${query}`)
      .then((response) => response.json())
      .then((data) => {
        const suggestions = data?.data.map((exo, i) => {
          return {
            id: i,
            objectId: exo.id,
            title: exo.name,
            name: exo.name,
            context: exo.description,
            photo: exo.photo,
            video: exo.video,
            ciblage: exo.ciblage,
            utilisationMuscle: exo.utilisationMuscle,
            categorie: exo.categorie,
          };
        });
        setDataSet(suggestions);
      });
  };

  //Création du programme
  const createProg = async () => {
    try {
      await newProgSchema.validate(
        { name, duree, description, photo, seances },
        { abortEarly: false }
      );

      setErrors({});

      const response = await fetch(`${BACKEND_ADDRESS}/programme/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          duree: duree,
          description: description,
          photo: photo,
          seances: seances,
          exercices: programme,
          coachToken: coach.token,
        }),
      });

      const data = await response.json();

      if (data.result) {
        dispatch(removeProgramme());
        navigation.navigate("Progs");
      } else {
        setErrors(data.error);
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

  // Open Modal
  const newSeance = () => {
    setSeances(seances + 1);
    setExercices([]);
    setDisplayModal(true);
  };

  // Ajout exo dans une séance
  const addExo = () => {
    setExercices([
      ...exercices,
      {
        exercice: exercice.objectId,
        name: exercice.name,
        series: series,
        repetitions: repetitions,
      },
    ]);
  };

  const exosList = exercices.map((exo, i) => {
    return (
      <View key={i} style={styles.boxSeance}>
        <Text style={styles.textName}>{exo.name}</Text>
        <Text style={styles.textList}>Séries : {exo.series}</Text>
        <Text style={styles.textList}>Répétitions : {exo.repetitions}</Text>
      </View>
    );
  });

  // Valider la séance
  const AddSeance = () => {
    dispatch(updateProgramme(exercices));
    setDisplayModal(false);
  };

  const programmeList = programme.map((prog, i) => {
    return (
      <View key={i} style={styles.boxSeance}>
        <Text style={styles.textProg}>Séances {i + 1} :</Text>
        <Text style={styles.textProg}>{prog.length} exercices</Text>
      </View>
    );
  });

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

          <Text style={styles.title}>Créer programme</Text>

          <View style={styles.containerInput}>
            <Text style={styles.text}>
              Indiquez le nom et durée du programme
            </Text>

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
              <TouchableOpacity
                style={styles.containerImage}
                onPress={pickImage}
              >
                {photo ? (
                  <Image style={styles.image} source={{ uri: photo }} />
                ) : (
                  <FontAwesomeIcon icon={faUpload} color="#101018" size={40} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          {errors.duree && <Text style={styles.error}>{errors.duree}</Text>}

          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          {errors.photo && <Text style={styles.error}>{errors.photo}</Text>}

          {errors.seances && <Text style={styles.error}>{errors.seances}</Text>}

          {errors.error && <Text style={styles.error}>{errors.error}</Text>}

          <View style={styles.containerSeances}>
            <View style={styles.box3}>
              <Text style={styles.text2}>Ajouter une séance :</Text>
              <TouchableOpacity style={styles.buttonPlus} onPress={newSeance}>
                <FontAwesomeIcon icon={faPlus} color="#101018" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.containerList}>
              {programmeList}
            </ScrollView>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={displayModal}
          >
            <View style={styles.centeredView}>
              <AutocompleteDropdownContextProvider>
                <LinearGradient
                  colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
                  style={styles.modalView}
                >
                  <View style={styles.iconXmodal}>
                    <TouchableOpacity
                      onPress={() => setDisplayModal(!displayModal)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        color="#B9B8B7"
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                  <AutocompleteDropdown
                    onChangeText={(value) => searchExercices(value)}
                    onSelectItem={(item) => item && setExercice(item)}
                    dataSet={dataSet}
                    textInputProps={{
                      placeholder: "Rechercher un exercice",
                      placeholderTextColor: "#B9B8B7",
                    }}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.dropdownContainer}
                    suggestionsListContainerStyle={
                      styles.suggestionListContainer
                    }
                    closeOnSubmit
                  ></AutocompleteDropdown>

                  <View style={styles.box1}>
                    <TextInput
                      style={styles.input}
                      placeholder="Séries"
                      placeholderTextColor={"#B9B8B7"}
                      onChangeText={(value) => setSeries(value)}
                      value={series}
                      keyboardType="numeric"
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      placeholder="Répétitions"
                      placeholderTextColor={"#B9B8B7"}
                      onChangeText={(value) => setRepetitions(value)}
                      value={repetitions}
                      keyboardType="numeric"
                    ></TextInput>
                  </View>

                  <View style={styles.boxBtn}>
                    <TouchableOpacity
                      style={styles.buttonPlus}
                      onPress={addExo}
                    >
                      <FontAwesomeIcon icon={faPlus} color={"#101018"} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.containerSeance}>{exosList}</View>

                  <View style={styles.buttonModal}>
                    <TouchableOpacity style={styles.button} onPress={AddSeance}>
                      <Text style={styles.buttonText}>Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </AutocompleteDropdownContextProvider>
            </View>
          </Modal>

          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={createProg}>
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
  iconXmodal: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
    marginTop: 20,
  },
  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "95%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DFB81C",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 20,
  },
  suggestionListContainer: {
    borderRadius: 5,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  buttonModal: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
  },
  containerSeance: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 300,
    height: 300,
    marginTop: 20,
  },
  boxBtn: {
    height: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonPlus: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFB81C",
    borderRadius: 50,
  },
  textList: {
    color: "white",
    fontSize: 12,
  },
  textName: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  boxSeance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  textProg: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
  },
});
