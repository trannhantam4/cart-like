import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constant/styles";
import Button from "../UI/Button";
import { getDateFormat } from "../../uti/Date";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("screen");
import { firebase } from "@react-native-firebase/auth";
export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitLabel,
  defaultValue,
}) {
  const [input, setInput] = useState({
    price: defaultValue ? defaultValue.price.toString() : "",

    des: defaultValue ? defaultValue.des.toString() : "",
    user: firebase.auth().currentUser.email.toString(),
    type: defaultValue ? defaultValue.type.toString() : "",
  });
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? new Date(defaultValue.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  function submitHandler() {
    const expenseData = {
      price: +input.price,
      date: selectedDate,
      des: input.des,
      user: input.user,
      type: input.type,
    };
    const priceIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const desIsValid = expenseData.des.trim().length > 0;

    if (!priceIsValid || !desIsValid) {
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
  const handleDateChange = (event, selected) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setSelectedDate(selected);
    } else {
      setShowDatePicker(false);
    }
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.row}
          label="Price (x1000)"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "price"),
            value: input.price,
          }}
        />
        {/* <Input
          style={styles.row}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date,
          }}
        /> */}
        <View style={styles.screen}>
          <Text style={styles.label}>Date: {getDateFormat(selectedDate)}</Text>
          <Button style={styles.button} onPress={() => setShowDatePicker(true)}>
            Select Date
          </Button>
        </View>
        <Input
          style={styles.row}
          label="Type"
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "type"),
            value: input.type,
          }}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          style={{ height: height * 0.2 }}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

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
  screen: {
    marginHorizontal: 6,
    marginVertical: 12,
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
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 12,
  },
});
