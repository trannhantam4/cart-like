import React, { memo } from "react";
import { View, Text, Image } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const Info = () => {
  const user = firebase.auth().currentUser;

  return (
    <TouchableOpacity>
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
            fontSize: 20,
          }}
        >
          {user.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Info);
