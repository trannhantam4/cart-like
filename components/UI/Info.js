import { View, Text, Image } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";
import { firebase } from "@react-native-firebase/auth";

export default function Info() {
  const user = firebase.auth().currentUser;
  return (
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
      <Text
        style={{
          padding: 16,
          color: GlobalStyles.colors.primary500,
          fontWeight: "bold",
        }}
      >
        {user.displayName}
      </Text>
    </View>
  );
}
