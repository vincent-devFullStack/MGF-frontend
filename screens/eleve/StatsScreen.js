import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "../../env";

export default function StatsScreen({ route, navigation }) {
  const isFocused = useIsFocused();
  const eleveData = useSelector((state) => state.eleve.value);
  const [activeTab, setActiveTab] = useState("Mesures");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/eleve/${eleveData.token}`)
      .then((response) => response.json())
      .then((data) => {
        setFullData(data);
      });
  }, [isFocused, eleveData]);

  console.log(activeTab);

  console.log("props is:", route.params);

  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image
            style={styles.profilIcon}
            source={{ uri: fullData.data.photoProfil }}
          /> */}
          <Text style={styles.title}>
            {/* {fullData.data.name} {fullData.data.firstname} */}
          </Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setActiveTab("Mesures");
            }}
          >
            <Text style={styles.tabText}>Mesures</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === styles.activeTab]}
            onPress={() => {
              setActiveTab("Photos");
            }}
          >
            <Text style={[styles.tabText, activeTab === styles.activeTabText]}>
              Photos
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Mesures" && (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Taille</Text>

              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.columnTitle}>Départ</Text>
              <Text style={styles.columnTitle}>Actuel</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Poids</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}> kg</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cou</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Poitrine</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Biceps</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Taille (tr)</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Hanche</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cuisse</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Mollet</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.unit}>cm</Text>
            </View>
          </View>
        )}
        {activeTab === "Photos" && (
          <View style={styles.card}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnTitle}>Départ</Text>
              <Text style={styles.columnTitle}>Actuel</Text>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { width: "90%", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    right: 50,
  },
  profilIcon: { height: 80, width: 80, borderRadius: 50, marginRight: 15 },
  title: { fontSize: 28, fontWeight: "bold", color: "white" },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tab: { flex: 1, padding: 10, alignItems: "center" },
  activeTab: {
    backgroundColor: "#54547E",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabText: { color: "#bbb", fontSize: 16 },
  activeTabText: { color: "white", fontWeight: "bold" },

  card: {
    width: "100%",
    height: 500,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    marginTop: 30,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    left: 30,
    width: 55,
  },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  label: { width: 80, color: "white" },
  input: {
    flex: 1,
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    marginHorizontal: 10,
  },
  unit: { marginLeft: 8, color: "white" },
});
