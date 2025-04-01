const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/income.controller");
const { project } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", project, addIncome);

router.get("/getAll", project, getAllIncome);

router.delete("/delete/:incomeId", project, deleteIncome);

router.get("/downloadIncomeExcel", project, downloadIncomeExcel);

module.exports = router;