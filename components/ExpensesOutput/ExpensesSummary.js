import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constant/styles";

export default function ExpensesSummary({ expenses, period }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.price;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period} </Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
  },
});
