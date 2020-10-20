const config = require("./config");
const knex = require("knex")(config);

exports.listTransactions = () =>
  knex.select("id", "title", "amount").from("transactions");

exports.createTransaction = (title, amount) =>
  knex("transactions").insert({ title, amount });

// exports.updateTransaction = (id, amount) =>
//   knex("transactions")
//     .where({ id })
//     .update({ amount });

exports.deleteTransaction = id =>
  knex("transactions")
    .where({ id })
    .del();
