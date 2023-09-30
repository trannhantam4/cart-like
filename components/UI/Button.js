import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    margin: 10,
  },
  flat: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  flatText: {
    color: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
