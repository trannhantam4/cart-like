import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import Input from "../components/ManageExpense/Input";
import { GlobalStyles } from "../constant/styles";
export default function UserManageScreen() {
  const user = firebase.auth().currentUser;
  const [newDisplayName, setNewDisplayName] = useState(user.displayName || "");
  const handleChangeDisplayName = async () => {
    try {
      await user.updateProfile({
        displayName: newDisplayName,
      });
      Alert.alert("Success", "Display name updated successfully.");
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while updating the display name."
      );
      console.error("Error updating display name:", error);
    }
  };
  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView>
        <Input
          label="User"
          textInputConfig={{
            autoCorrect: true,
            width: "80%",
            value: newDisplayName,
            onChangeText: (text) => setNewDisplayName(text),
          }}
        />
      </KeyboardAvoidingView>
      <Button title="Save Display Name" onPress={handleChangeDisplayName} />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  input: {
    borderWidth: 2,
    width: "40%",
    height: "10%",
  },
});
