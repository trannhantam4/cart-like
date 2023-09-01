import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const userFromStorage = await AsyncStorage.getItem("user");
      if (userFromStorage) {
        setUser(JSON.parse(userFromStorage));
      }
    };
    checkUser();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await firebase.auth().signInWithPopup(provider);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  {
    user ? (
      <View>
        <Text>Welcome, {user.displayName}</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    ) : (
      <View>
        <Text>Sign in with Google</Text>
        <Button title="Sign In" onPress={signInWithGoogle} />
      </View>
    );
  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

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
