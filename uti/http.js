import axios from "axios";

const BACKEND_URL = "https://cart-like-a99e2-default-rtdb.firebaseio.com";

export async function fetchExpense(user) {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];
    const email = user.email;

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        date: new Date(response.data[key].date),
        des: response.data[key].des,
        price: response.data[key].price,
        user: response.data[key].user,
        type: response.data[key].type,
      };

      if (!email || expenseObj.user === email) {
        expenses.push(expenseObj);
      }
    }

    expenses.sort((a, b) => a.date - b.date);
    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
}
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}
export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
