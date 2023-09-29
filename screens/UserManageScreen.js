import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/auth";
import Input from "../components/ManageExpense/Input";
import { GlobalStyles } from "../constant/styles";
import ImagePicker from "react-native-image-picker";
import { storage } from "@react-native-firebase/storage";
// import {
//   checkMultiple,
//   PERMISSIONS,
//   requestMultiple,
// } from "react-native-permissions"; // Updated import

export default function UserManageScreen() {
  const user = firebase.auth().currentUser;
  const [newDisplayName, setNewDisplayName] = useState(user.displayName || "");

  // Function to request permissions
  // const checkAndRequestPermissions = async () => {
  //   const permissions = [
  //     PERMISSIONS.ANDROID.CAMERA,
  //     PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  //   ];
  //   const status = await checkMultiple(permissions); // Use checkMultiple to check permissions

  //   if (
  //     status[PERMISSIONS.ANDROID.CAMERA] === "granted" &&
  //     status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"
  //   ) {
  //     // Permissions granted, you can proceed with image selection logic
  //     pickImage();
  //   } else {
  //     // Handle permission denial
  //     Alert.alert(
  //       "Permission Required",
  //       "Camera and storage permissions are required for image selection."
  //     );
  //   }
  // };

  // useEffect(() => {
  //   // Check and request permissions when the component mounts
  //   checkAndRequestPermissions();
  // }, []); // Run this effect once when the component mounts

  const handleChangeDisplayName = async () => {
    try {
      await user.updateProfile({
        displayName: newDisplayName,
      });
      Alert.alert("Success", "To see changes please restart app");
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while updating the display name."
      );
    }
  };

  // const pickImage = () => {
  //   const options = {
  //     title: "Select Profile Picture",
  //     storageOptions: {
  //       skipBackup: true,
  //       path: "images",
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, async (response) => {
  //     if (response.didCancel) {
  //       console.log("Image selection canceled");
  //     } else if (response.error) {
  //       console.error("ImagePicker Error:", response.error);
  //     } else {
  //       // Upload the selected image to Firebase Storage
  //       const reference = storage().ref(`profilePictures/${user.uid}.jpg`);
  //       try {
  //         await reference.putFile(response.uri);
  //         Alert.alert("Success", "Profile picture updated successfully.");
  //       } catch (error) {
  //         Alert.alert(
  //           "Error",
  //           "An error occurred while updating the profile picture."
  //         );
  //       }
  //     }
  //   });
  // };

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
      {/* <Button
        title="Change Profile Picture"
        onPress={checkAndRequestPermissions}
      /> */}
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
