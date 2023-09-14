import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import Info from "../components/UI/Info";
export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <>
      <Info />
      <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="total" />
    </>
  );
}
