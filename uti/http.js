import axios from "axios";

const BACKEND_URL = "https://cart-like-a99e2-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}
export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      date: new Date(response.data[key].date),
      des: response.data[key].des,
      price: response.data[key].price,
    };
    expenses.push(expenseObj);
  }
  expenses.sort((a, b) => a.date - b.date);
  return expenses;
}
export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
