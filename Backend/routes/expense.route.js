const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expense.controller");
const { project } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", project, addExpense);

router.get("/getAll", project, getAllExpense);

router.delete("/delete/:expenseId", project, deleteExpense);

router.get("/downloadExpenseExcel", project, downloadExpenseExcel);

module.exports = router;