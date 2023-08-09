import { View, Text } from "react-native";
import React from "react";
import Input from "./Input";

export default function ExpenseForm() {
  function amountChangeHandler() {}
  return (
    <View>
      <Input
        label="Price"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeHolder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiLine: true,
          autoCorrect: true,
          autoCapitalize: "sentences",
        }}
      />
    </View>
  );
}
