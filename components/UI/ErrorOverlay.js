import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import Button from "./Button";
import { Info } from "./Info";
import { firebase } from "@react-native-firebase/auth";
export default function ErrorOverlay({ message, onConfirm }) {
  const user = firebase.auth().currentUser;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: GlobalStyles.colors.primary700,
        }}
      >
        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: "contain",
            borderRadius: 10,
          }}
          source={{ uri: user.photoURL }}
        ></Image>
        <Text style={{ padding: 16, color: "white", fontWeight: "bold" }}>
          {user.displayName}
        </Text>
      </View>
      <Text style={[styles.text, styles.container]}>Error</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
