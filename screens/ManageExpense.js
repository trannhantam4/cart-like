import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
const { width, height } = Dimensions.get("screen");
import { ExpensesContext } from "../store/expenses-context";
export default function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const id = route.params?.expenseId;
  const isEditing = !!id;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  function deleteHandler() {
    expenseCtx.deleteExpense(id);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense(id, {
        des: "new2",
        price: 15.99,
        date: new Date("2022-06-12"),
      });
    } else {
      expenseCtx.addExpense({ des: "new", price: 15.5, date: new Date() });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: "center",
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
