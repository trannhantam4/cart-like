import { createContext, useReducer, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ des, price, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { des, price, date }) => {},
});

const DUMMY_EXPENSES = [
  { id: 1, des: "shoes", price: 55.99, date: new Date("2023-8-8") },
  { id: 2, des: "brace", price: 20.99, date: new Date("2021-12-12") },
  { id: 3, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 4, des: "braces", price: 3.99, date: new Date("2021-12-15") },
  { id: 5, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 6, des: "braces", price: 3.99, date: new Date("2021-12-15") },
  { id: 7, des: "braclet", price: 10.99, date: new Date("2021-12-12") },
  { id: 8, des: "braces", price: 3.99, date: new Date("2021-12-15") },
];
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableIndex];
      const updateItem = { ...updateableExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[updateableIndex] = updateItem;

      return updateExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
