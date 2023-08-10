import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constant/styles";
const { width, height } = Dimensions.get("screen");
export default function ExpenseForm() {
  function amountChangeHandler() {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.row}
          label="Price"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>
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
const styles = StyleSheet.create({
  form: {
    marginTop: height * 0.05,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  title: {
    fontSize: height * 0.04,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    textAlign: "center",
    marginVertical: height * 0.01,
  },
});
