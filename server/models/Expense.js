const mongoose = require("mongoose");

const FinancialsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },
  ],
  investments: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },
  ],
  incomes: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },
  ],
});

const Expense = mongoose.model("Expense", FinancialsSchema);

module.exports = Expense;
