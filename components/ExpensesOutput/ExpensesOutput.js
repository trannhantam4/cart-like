import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/styles";

const DUMMY_EXPENSES = [
  { id: 1, des: "shoes", price: 55.99, date: new Date("2021-12-19") },
  { id: 2, des: "brace", price: 20.99, date: new Date("2021-12-12") },
  { id: 3, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 4, des: "braces", price: 3.99, date: new Date("2021-12-15") },
  { id: 5, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 6, des: "braces", price: 3.99, date: new Date("2021-12-15") },
  { id: 7, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 8, des: "braces", price: 3.99, date: new Date("2021-12-15") },
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} period={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
