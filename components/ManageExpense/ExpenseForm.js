import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constant/styles";
import Button from "../UI/Button";
import { getDateFormat } from "../../uti/Date";
const { width, height } = Dimensions.get("screen");
export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitLabel,
  defaultValue,
}) {
  console.log(defaultValue);

  const [input, setInput] = useState({
    price: defaultValue ? defaultValue.price.toString() : "",
    date: defaultValue ? getDateFormat(defaultValue.date) : "",
    des: defaultValue ? defaultValue.des.toString() : "",
  });

  function submitHandler() {
    const expenseData = {
      price: +input.price,
      date: new Date(input.date),
      des: input.des,
    };
    const priceIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const desIsValid = expenseData.des.trim().length > 0;

    if (!priceIsValid || !dateIsValid || !desIsValid) {
      Alert.alert("Invalid Input!!", "Please check you input");
      return;
    }
    onSubmit(expenseData);
  }
  function inputChangeHandler(inputId, enteredValue) {
    setInput((curInput) => {
      return { ...curInput, [inputId]: enteredValue };
    });
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.row}
          label="Price"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "price"),
            value: input.price,
          }}
        />
        <Input
          style={styles.row}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiLine: true,
          autoCorrect: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "des"),
          value: input.des,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: width * 0.25,
  },
});
