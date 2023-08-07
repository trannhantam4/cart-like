import { View, Text } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

export default function RecentExpenses() {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
}
