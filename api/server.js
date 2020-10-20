const express = require("express");
const cors = require("cors");
const database = require("./database");

const app = express(); // cream o aplicatie noua
app.use(express.json());
app.use(cors());

// GET a resource
app.get("/transactions", async (req, res) => {
  const transactions = await database.listTransactions();
  res.json(transactions);
});

// SEND a resource
app.post("/transactions", async (req, res) => {
  // const title = req.body.title;
  // const amount = req.body.amount;
  // DESTRUCTURING
  const { title, amount } = req.body;
  await database.createTransaction(title, amount);
  res.json();
});

app.delete("/transactions/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  await database.deleteTransaction(id);
  res.json();
});

app.listen(8080);
