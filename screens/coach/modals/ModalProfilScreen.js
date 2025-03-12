import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { BACKEND_ADDRESS } from "../../../env";
import { useEffect, useState } from "react";

import * as Yup from "yup";

export default function ModalProfil({ route, navigation }) {
  const { eleve } = route.params;
  const coach = useSelector((state) => state.coach.value);

  //State onglets
  const [ongletMesures, setOngletMesures] = useState(true);
  const [ongletPhotos, setOngletPhotos] = useState(false);
  const [ongletProgramme, setOngletProgramme] = useState(false);
  const [ongletOssature, setOngletOssature] = useState(false);
  const [ongletMorphologie, setOngletMorphologie] = useState(false);

  //Données mesures simples
  const [data, setData] = useState({
    //Corporelles départ
    poidsDepart: 0,
    couDepart: 0,
    poitrineDepart: 0,
    bicepsDepart: 0,
    tailleDepart: 0,
    hancheDepart: 0,
    cuisseDepart: 0,
    molletDepart: 0,
    //Corporelles update
    poids: 0,
    cou: 0,
    poitrine: 0,
    biceps: 0,
    taille: 0,
    hanche: 0,
    cuisse: 0,
    mollet: 0,
    //Ossature
    type: "",
    os: "",
    clavicule: "",
    humerus: "",
    avantBras: "",
    buste: "",
    thorax: "",
    abdomen: "",
    hanches: "",
    femur: "",
    tibia: "",
  });

  function updateData(field, value) {
    setData({ ...data, [field]: value });
  }

  //Données mesures morpho
  const [dataMorpho, setDataMorpho] = useState({
    //Morphologie
    deltoidAnt: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    deltoidLat: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    deltoidPost: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    biceps: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    triceps: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    abSup: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    abPro: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    trapezeSup: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    trapezeMoy: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    trapezeInf: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    grandDorsal: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    pectoraux: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    abdominaux: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    obliques: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    cou: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    quadriceps: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    ischios: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    fessiers: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    abducteurs: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    mollets: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
    tibias: {
      insertion: "",
      etat: "",
      potentiel: "",
    },
  });

  function updateDataMorpho(field, value) {
    setDataMorpho({ ...dataMorpho, [field]: { ...dataMorpho.field, value } });
  }

  const mesuresContainer = (
    <View style={styles.containerGlobal}>
      <Text style={styles.mesuresTextTop}>Mesures corporelles</Text>

      <View style={styles.inputTaille}>
        <Text style={styles.mesuresTextTop}>Taille</Text>
        <View style={styles.boxTaille}>
          <Text style={styles.mesuresTextTopUp}>{eleve.taille}</Text>
        </View>
        <Text style={styles.mesuresTextTop}>cm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.containerMesuresInputs}>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Poids</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>kg</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Cou</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Poitrine</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Biceps</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Taille</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Hanche</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Cuisse</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.mesuresText}>Mollet</Text>
          <TextInput
            style={styles.input}
            placeholder="Départ"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Actuel"
            placeholderTextColor={"#B9B8B7"}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.mesuresTextb}>cm</Text>
        </View>
      </ScrollView>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "white" }]}
        >
          <Text style={styles.textButtons}>Première mesures</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#DFB81C" }]}
        >
          <Text style={styles.textButtons}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const mesuresOssature = (
    <View style={styles.containerGlobal}>
      <Image
        style={styles.imageConstruction}
        source={require("../../../assets/page_construction.png")}
        resizeMode="cover"
      />
    </View>
  );

  const mesuresMorpho = (
    <View style={styles.containerGlobal}>
      <Image
        style={styles.imageConstruction}
        source={require("../../../assets/page_construction.png")}
        resizeMode="cover"
      />
    </View>
  );

  const mesuresPhotos = (
    <View style={styles.containerGlobal}>
      <Image
        style={styles.imageConstruction}
        source={require("../../../assets/page_construction.png")}
        resizeMode="cover"
      />
    </View>
  );

  const mesuresProgramme = (
    <View style={styles.containerGlobal}>
      <Image
        style={styles.imageConstruction}
        source={require("../../../assets/page_construction.png")}
        resizeMode="cover"
      />
    </View>
  );

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

          <View style={styles.boxTitle}>
            <View style={styles.containerImage}>
              <Image
                source={
                  coach.photoProfil
                    ? { uri: eleve.photoProfil }
                    : require("../../../assets/photo_eleve1.jpg")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>Profil</Text>
            <Text style={[styles.title, { color: "#DFB81C" }]}>
              {eleve?.firstname}
            </Text>
          </View>

          <View style={styles.containerMain}>
            <View style={styles.containerOnglet}>
              <TouchableOpacity
                style={[
                  styles.ongletTop,
                  ongletMesures && { backgroundColor: "#101018" },
                  ongletMorphologie && { backgroundColor: "#101018" },
                  ongletOssature && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(true);
                  setOngletPhotos(false);
                  setOngletProgramme(false);
                  setOngletMorphologie(false);
                  setOngletOssature(false);
                }}
              >
                <Text style={styles.ongletText}>Mesures</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ongletTop,
                  ongletPhotos && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(false);
                  setOngletPhotos(true);
                  setOngletProgramme(false);
                  setOngletMorphologie(false);
                  setOngletOssature(false);
                }}
              >
                <Text style={styles.ongletText}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ongletTop,
                  ongletProgramme && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(false);
                  setOngletPhotos(false);
                  setOngletProgramme(true);
                  setOngletMorphologie(false);
                  setOngletOssature(false);
                }}
              >
                <Text style={styles.ongletText}>Programme</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerDynamic}>
              {ongletMesures && mesuresContainer}
              {ongletPhotos && mesuresPhotos}
              {ongletProgramme && mesuresProgramme}
              {ongletMorphologie && mesuresMorpho}
              {ongletOssature && mesuresOssature}
            </View>

            <View style={styles.containerOnglet}>
              <TouchableOpacity
                style={[
                  styles.ongletBottom,
                  ongletMesures && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(true);
                  setOngletPhotos(false);
                  setOngletProgramme(false);
                  setOngletMorphologie(false);
                  setOngletOssature(false);
                }}
              >
                <Text style={styles.ongletText}>Corporelles</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ongletBottom,
                  ongletOssature && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(false);
                  setOngletPhotos(false);
                  setOngletProgramme(false);
                  setOngletMorphologie(false);
                  setOngletOssature(true);
                }}
              >
                <Text style={styles.ongletText}>Ossature</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ongletBottom,
                  ongletMorphologie && { backgroundColor: "#101018" },
                ]}
                onPress={() => {
                  setOngletMesures(false);
                  setOngletPhotos(false);
                  setOngletProgramme(false);
                  setOngletMorphologie(true);
                  setOngletOssature(false);
                }}
              >
                <Text style={styles.ongletText}>Morphologie</Text>
              </TouchableOpacity>
            </View>
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
  boxTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 20,
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
  containerMain: {
    width: "100%",
    height: "100%",
  },
  ongletText: {
    color: "white",
    fontSize: 16,
  },
  containerDynamic: {
    width: "100%",
    height: 550,
    borderColor: "#54547E",
    borderWidth: 2,
  },
  containerOnglet: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ongletTop: {
    width: "33.5%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54547E",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  ongletBottom: {
    width: "33%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54547E",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageConstruction: {
    width: 300,
    height: 300,
  },
  //styles Mesures
  containerGlobal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  mesuresText: {
    color: "white",
    fontSize: 16,
    width: 65,
  },
  mesuresTextb: {
    color: "white",
    fontSize: 16,
    width: 30,
  },
  mesuresTextTop: {
    color: "white",
    fontSize: 18,
  },
  mesuresTextTopUp: {
    color: "#B9B8B7",
  },
  boxTaille: {
    width: 65,
    height: 40,
    backgroundColor: "white",
    fontSize: 13,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  inputTaille: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  containerMesuresInputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  boxInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    width: 65,
    height: 40,
    backgroundColor: "white",
    color: "#B9B8B7",
    fontSize: 13,
    borderRadius: 5,
  },
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  containerButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttons: {
    width: 150,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textButtons: {
    fontSize: 14,
    color: "#101018",
  },
});
