import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LogIn({ children }) {
  return (
    <View style={styles.screen}>
      <Text>LogIn</Text>
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
});
