import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constant/styles";
import Button from "../UI/Button";
import { getDateFormat } from "../../uti/Date";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("screen");
import { Picker } from "@react-native-picker/picker";
import { firebase } from "@react-native-firebase/auth";
import AutocompleteTextInput from "./AutocompleteTextInput";

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

  // Function to handle text input changes for price
  const handlePriceChange = (formattedPrice) => {
    setInput((curInput) => {
      return { ...curInput, price: formattedPrice };
    });
  };

  function submitHandler() {
    // Remove dots or commas from the price input and parse it as a float
    const formattedPrice = input.price.replace(/[.,]/g, "");
    const expenseData = {
      price: parseFloat(formattedPrice),
      date: selectedDate,
      des: input.des,
      user: input.user,
      type: input.type,
    };

    const priceIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const desIsValid = expenseData.des.trim().length > 0;

    if (!priceIsValid) {
      Alert.alert("Invalid price!!", "Please check your price");
      return;
    }
    if (!desIsValid) {
      Alert.alert("Invalid des!!", "Please check your des");
      return;
    }

    onSubmit(expenseData);
  }

  function inputChangeHandler(inputId, enteredValue) {
    if (inputId === "price") {
      // Remove any dots or commas from the entered value
      const formattedValue = enteredValue.replace(/[.,]/g, "");

      setInput((curInput) => {
        return { ...curInput, [inputId]: formattedValue };
      });
    } else {
      setInput((curInput) => {
        return { ...curInput, [inputId]: enteredValue };
      });
    }
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
        <AutocompleteTextInput
          inputValue={input.price}
          onInputChange={handlePriceChange}
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
