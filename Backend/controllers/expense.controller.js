const Expense = require('../models/expense.model');
const xlsx = require('xlsx');

exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try{
        const { icon, category, amount, date } = req.body;
        if(!category || !amount || !date){
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error adding expense", error: err.message });
    }
};
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try{
        const expenses = await Expense.find({ userId }).sort({ date: -1});
        res.status(200).json(expenses);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error getting expenses", error: err.message });
    }
};
exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;

    try{
        const expenseId = req.params.expenseId;
        const expense = await Expense.findByIdAndDelete({ userId, _id: expenseId });
        if(!expense) return res.status(404).json({ error: "Expense not found" });
        res.status(204).json({
            message: "Expense deleted successfully"
        });
    } catch(err) {
        res.status(500).json({ message: "Error deleting expense", error: err.message });
    }
};
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0]
        }))
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "Expense_details.xlsx");
        res.download("Expense_details.xlsx");

    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error downloading expenses", error: err.message });
    }
};