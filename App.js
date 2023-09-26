import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constant/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import LogIn from "./screens/LogIn";
import { useState, useEffect, useContext } from "react";
import { firebase } from "@react-native-firebase/auth";
import UserManageScreen from "./screens/UserManageScreen";
const firebaseConfig = {
  apiKey: "AIzaSyBE1XY0m9EggujbamGiS8ahLPBCG3nfEis",
  authDomain: "cart-like-a99e2.firebaseapp.com",
  databaseURL: "https://cart-like-a99e2-default-rtdb.firebaseio.com",
  projectId: "cart-like-a99e2",
  storageBucket: "cart-like-a99e2.appspot.com",
  messagingSenderId: "773723594890",
  appId: "1:773723594890:web:e530c71defdf6da3ffcd73",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
function ExpenseOverview() {
  const user = firebase.auth().currentUser;
  async function onSignOutPress() {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "#fff",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="power"
            size={24}
            color={tintColor}
            onPress={onSignOutPress}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        component={RecentExpenses}
        name="RecentExpenses"
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        component={AllExpenses}
        name="AllExpenses"
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
export default function App() {
  GoogleSignin.configure({
    webClientId:
      "773723594890-hnajs69c2k3o6gffaetptkq9jjecriti.apps.googleusercontent.com",
  });
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  async function onGoogleButtonPress() {
    try {
      setUser(null);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userSignIn = auth().signInWithCredential(googleCredential);
      userSignIn
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error signing in with Google:", error);
    }
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <LogIn>
        <GoogleSigninButton onPress={onGoogleButtonPress} />
      </LogIn>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpenseOverview"
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ExpenseOverview"
              component={ExpenseOverview}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="UserManageScreen"
              component={UserManageScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
});
