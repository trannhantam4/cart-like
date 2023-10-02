import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";

export default function Input({ label, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.inputMulti);
  }
  return (
    <View style={[styles.screen, style]}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 8,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    color: GlobalStyles.colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputMulti: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
