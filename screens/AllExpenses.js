import { View, Text } from "react-native";
import React, { useContext } from "react";
import { getDateMinusDays } from "../uti/Date";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 30);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="30" />;
}
