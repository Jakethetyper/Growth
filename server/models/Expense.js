const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },
  ],
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
