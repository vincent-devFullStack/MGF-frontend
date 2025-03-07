import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import modules redux
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import eleve from "./reducers/eleve";
import coach from "./reducers/coach";

// Import des screens
import LoginScreen from "./screens/LoginScreen";
//Import des screens inscription
import SignupScreen from "./screens/signup/SignupScreen";
import SignupEleve1Screen from "./screens/signup/signupEleve/signupEleve1";
import SignupEleve2Screen from "./screens/signup/signupEleve/signupEleve2";
import SignupEleve3Screen from "./screens/signup/signupEleve/signupEleve3";
import SignupEleve4Screen from "./screens/signup/signupEleve/signupEleve4";

import SignupCoach1Screen from "./screens/signup/signupCoach/signupCoach1";
import SignupCoach2Screen from "./screens/signup/signupCoach/signupCoach2";
import SignupCoach3Screen from "./screens/signup/signupCoach/signupCoach3";
import SignupCoach4Screen from "./screens/signup/signupCoach/signupCoach4";
// Import des screens élèves
import HomeEleveScreen from "./screens/eleve/HomeEleveScreen";
import CalEleveScreen from "./screens/eleve/CalEleveScreen";
import NutritionScreen from "./screens/eleve/NutritionScreen";
import ProfilScreen from "./screens/eleve/ProfilScreen";
import StatsScreen from "./screens/eleve/StatsScreen";
import MapScreen from "./screens/eleve/MapScreen";
// Import des screens Coach
import HomeCoachScreen from "./screens/coach/HomeCoachScreen";
import CalCoachScreen from "./screens/coach/CalCoachScreen";
import ElevesScreen from "./screens/coach/ElevesScreen";
import ProgsScreen from "./screens/coach/ProgsScreen";
import WalletScreen from "./screens/coach/WalletScreen";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChartLine,
  faHouse,
  faUser,
  faCalendarDays,
  faUtensils,
  faUsers,
  faDumbbell,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const reducers = combineReducers({ eleve, coach });

const persistConfig = { key: "MGF", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EleveTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#383853" },
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "HomeEleve") {
            iconName = faHouse;
          } else if (route.name === "Profil") {
            iconName = faUser;
          } else if (route.name === "Stats") {
            iconName = faChartLine;
          } else if (route.name === "CalEleve") {
            iconName = faCalendarDays;
          } else if (route.name === "Nutrition") {
            iconName = faUtensils;
          }

          return <FontAwesomeIcon icon={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#DFB81C",
        tabBarInactiveTintColor: "#b2b2b2",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="CalEleve" component={CalEleveScreen} />
      <Tab.Screen name="HomeEleve" component={HomeEleveScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

const CoachTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#383853" },
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "HomeCoach") {
            iconName = faHouse;
          } else if (route.name === "Eleves") {
            iconName = faUsers;
          } else if (route.name === "Progs") {
            iconName = faDumbbell;
          } else if (route.name === "CalCoach") {
            iconName = faCalendarDays;
          } else if (route.name === "Wallet") {
            iconName = faWallet;
          }

          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#DFB81C",
        tabBarInactiveTintColor: "#b2b2b2",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Eleves" component={ElevesScreen} />
      <Tab.Screen name="CalCoach" component={CalCoachScreen} />
      <Tab.Screen name="HomeCoach" component={HomeCoachScreen} />
      <Tab.Screen name="Progs" component={ProgsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EleveTabs" component={EleveTabs} />
            <Stack.Screen name="CoachTabs" component={CoachTabs} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SignupEleve1" component={SignupEleve1Screen} />
            <Stack.Screen name="SignupEleve2" component={SignupEleve2Screen} />
            <Stack.Screen name="SignupEleve3" component={SignupEleve3Screen} />
            <Stack.Screen name="SignupEleve4" component={SignupEleve4Screen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />

            <Stack.Screen name="SignupCoach1" component={SignupCoach1Screen} />
            <Stack.Screen name="SignupCoach2" component={SignupCoach2Screen} />
            <Stack.Screen name="SignupCoach3" component={SignupCoach3Screen} />
            <Stack.Screen name="SignupCoach4" component={SignupCoach4Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
