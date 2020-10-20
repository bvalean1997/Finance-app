const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "Bianca1$",
    database: "transactions"
  }
});

const createTransaction = (title, amount) =>
  knex("transactions").insert({ title, amount });


const deleteTransaction = id =>
  knex("transactions")
    .where("id", "=", id)
    .del();

const listTransactions = () =>
  knex.select("id", "title", "amount").from("finance");

const run = async () => {
  await createTransaction("Groceries", 100);
  await createTransaction("Salary", 1000);
  await createTransaction("Bike", 120);
  const transactions = await listTransactions();
  console.log("Transactions: ", transactions);
};

run();
