import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function LogIn() {
  WebBrowser.maybeCompleteAuthSession();
  const [user, setUser] = useState(null);
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
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.screen}>
      <Button title="Sign in" onPress={() => promptAsync()}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
