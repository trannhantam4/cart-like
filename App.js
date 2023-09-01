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
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import LogIn from "./screens/LogIn";
WebBrowser.maybeCompleteAuthSession();
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
  const [userInfo, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "251233063416-r0dcu61i2kil1imsblp0kvpnb7gh2dn9.apps.googleusercontent.com",
    webClientId:
      "251233063416-uvhdt69igtg5tds6fem8rl67qptuq11h.apps.googleusercontent.com",
    iosClientId:
      "251233063416-bh5i60f3pu0s6gmd77vo58rt1cernhol.apps.googleusercontent.com",
  });

  useEffect(() => {
    signInGoogleHandler();
  }, [response]);
  async function signInGoogleHandler() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === "success") {
        console.log("Response is valid, proceeding with authentication...");
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      console.log("Response is not valid:", response);
      setUser(JSON.parse(user));
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    console.log(3);
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  if (0 === 0) {
    return (
      <View style={styles.screen}>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        <Button title="Sign in" onPress={() => promptAsync()}></Button>
        <Button
          title="Sign out"
          onPress={() => AsyncStorage.removeItem("@user")}
        ></Button>
      </View>
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
