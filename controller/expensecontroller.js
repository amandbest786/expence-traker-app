const Expense = require('../model/expensemodel');

exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        const expense = await Expense.create({
            amount,
            description,
            category
        });

        res.status(201).json({ expense });

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getExpense = async (req, res) => {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
};

exports.deleteExpense = async (req, res) => {
    const id = req.params.id;

    await Expense.destroy({ where: { id } });

    res.status(200).json({ message: "Deleted" });
};