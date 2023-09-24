import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constant/styles";
import Button from "../UI/Button";
import { getDateFormat } from "../../uti/Date";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("screen");
import { Picker } from "@react-native-picker/picker";
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
    type: defaultValue ? defaultValue.type.toString() : "Food",
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
    <KeyboardAvoidingView style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.row}
          label="Price (x1000)"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "price"),
            value: input.price,
            placeholder: "15 = 15.000 VND",
          }}
        />
        <View style={styles.screen}>
          <Text style={styles.label}>Date: {getDateFormat(selectedDate)}</Text>
          <Button style={styles.button} onPress={() => setShowDatePicker(true)}>
            Select Date
          </Button>
        </View>
      </View>
      <View style={styles.screen}>
        <Text style={styles.label}>Type:</Text>
        <Picker
          style={{
            width: "50%",
            color: GlobalStyles.colors.primary500,
            fontWeight: "bold",
            backgroundColor: GlobalStyles.colors.primary700,
          }}
          selectedValue={input.type}
          mode="dropdown"
          onValueChange={inputChangeHandler.bind(this, "type")}
        >
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Invest" value="Invest" />
          <Picker.Item label="Fashion" value="Fashion" />
          <Picker.Item label="Health" value="Health" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          style={{ height: height * 0.2 }}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
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
          placeholder: "name of thing(s) or anything",
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
    </KeyboardAvoidingView>
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
    color: GlobalStyles.colors.primary500,
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
    color: GlobalStyles.colors.primary500,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
