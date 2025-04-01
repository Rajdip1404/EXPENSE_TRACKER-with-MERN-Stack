const Income = require('../models/income.model');
const xlsx = require('xlsx');


exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    try{
        const { icon, source, amount, date } = req.body;
        if(!source || !amount || !date){
            return res.status(400).json({ error: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error adding income", error: err.message });
    }
};
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try{
        const incomes = await Income.find({ userId }).sort({ date: -1});
        res.status(200).json(incomes);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error getting incomes", error: err.message });
    }
};
exports.deleteIncome = async (req, res) => {
    const userId = req.user._id;

    try{
        const incomeId = req.params.incomeId;
        const income = await Income.findByIdAndDelete({ userId, _id: incomeId });
        if(!income) return res.status(404).json({ error: "Income not found" });
        res.status(204).json({
            message: "Income deleted successfully"
        });
    } catch(err) {
        res.status(500).json({ message: "Error deleting income", error: err.message });
    }
};
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0]
        }))
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "Income_details.xlsx");
        res.download("Income_details.xlsx");

    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error downloading incomes", error: err.message });
    }
};