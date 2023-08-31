import { View, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../uti/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const expenseCtx = useContext(ExpensesContext);

  const id = route.params?.expenseId;
  const isEditing = !!id;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === id
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  async function deleteHandler() {
    setIsSubmiting(true);
    expenseCtx.deleteExpense(id);
    await deleteExpense(id);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    if (isEditing) {
      setIsSubmiting(true);
      expenseCtx.updateExpense(id, expenseData);
      await updateExpense(id, expenseData);
    } else {
      setIsSubmiting(true);
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }
  if (isSubmiting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing ? "Update" : "Add"}
        defaultValue={selectedExpense}
      />

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
});
