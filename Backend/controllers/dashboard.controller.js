const Income = require('../models/income.model');
const Expense = require('../models/expense.model');
const {isValidObjectId, Types} = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
        ]);

        console.log("totalIncome: ", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        console.log("totalExpense: ", {totalExpense, userId: isValidObjectId(userId)});

        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1});

        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const last60DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1});

        const expenseLast60Days = last60DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Fetch last 5 transactions (income + expenses)
        const last5Transactions = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date-a.date); // sort by lastes

        // Final Response
        res.json({
          totalBalance:
            (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0),
          totalIncome: totalIncome[0]?.totalIncome || 0,
          totalExpense: totalExpense[0]?.totalExpense || 0,
          last60DaysExpense: {
            total: expenseLast60Days,
            transactions: last60DaysExpenseTransaction,
          },
          last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransaction,
          },
          recentTransactions: last5Transactions,
        });

    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Error getting dashboard data", error: err.message });
    }
}