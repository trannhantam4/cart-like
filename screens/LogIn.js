import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LogIn({ children }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Log in with:</Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 16,
  },
});
