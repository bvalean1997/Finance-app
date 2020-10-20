import axios from "axios";

export const listTransactions = async () => {
  const result = await axios.get("http://localhost:8080/transactions");
  return result.data;
};

export const createTransaction = (title, amount) =>
  axios.post("http://localhost:8080/transactions", {
    title,
    amount
  });

export const deleteTransaction = id =>
  axios.delete(`http://localhost:8080/transactions/${id}`);
