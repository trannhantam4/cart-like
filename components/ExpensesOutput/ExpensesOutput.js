import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/styles";
import auth from "@react-native-firebase/auth";
export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  selectDate,
  fromScreen,
}) {
  const user = auth().user;
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        period={expensesPeriod}
        selectDate={selectDate}
        fromScreen={fromScreen}
      />

      <ExpensesList expenses={expenses} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
