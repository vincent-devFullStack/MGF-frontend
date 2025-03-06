import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function SearchNewCoach() {
  return (
    <LinearGradient
      colors={["#101018", "#383853", "#4B4B70", "#54547E"]}
      style={styles.background}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trouvons un coach</Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,

    width: 350,
  },
  background: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: 500,
  },
});

export default SearchNewCoach;
