import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Modal,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKEND_ADDRESS } from "../../env";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../reducers/eleve";

export default function ProfilScreen({ navigation }) {
  const [fullData, setFullData] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const eleveData = useSelector((state) => state.eleve.value);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
      });
  }, [isFocused]);

  const photoProfil =
    fullData?.data?.photoProfil || require("../../assets/icon.png");

  console.log(fullData);
  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeEleve")}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faArrowLeft}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
                navigation.navigate("Login");
              }}
            >
              <FontAwesomeIcon
                style={styles.icon}
                icon={faRightFromBracket}
                size={20}
                color={"#DFB81C"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.titrePage}>Profile</Text>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
              <Image style={styles.profilIcon} source={{ uri: photoProfil }} />
              <FontAwesomeIcon
                style={styles.iconEdit}
                icon={faPenToSquare}
                size={20}
                color={"#DFB81C"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.boxInput}>
            <View>
              <Text style={styles.input} paddingBottom={10}>
                {fullData.data.name} {fullData.data.firstname}
              </Text>
            </View>
            <View>
              <Text style={styles.input} paddingBottom={10}>
                {fullData.data.email}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
  },
  iconBack: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 70,
  },
  titrePage: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 600,
    color: "white",
  },
  header: {
    height: 210,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  profilIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  iconEdit: {
    position: "relative",
    left: 90,
  },
  input: {
    borderBottomColor: "#DFB81C",
    borderBottomWidth: 1,
    width: 314,
    color: "white",
    marginBottom: 10,
  },
  boxInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    gap: 30,
    padding: 20,
  },
  reinitia: {
    color: "white",
  },
});
