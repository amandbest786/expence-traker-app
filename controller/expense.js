const Expense = require('../model/expense');

exports.addExpense = (req, res) => {
        const { amount, description, category } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
 
        Expense.create({
            amount,
            description,
            category,
            userId: req.userId
        })
        .then(expense => {
       return res.status(201).json({ expense, message: "Expense added" });
    }).catch (err => {
        console.log(err);
        return res.status(500).json({ message: "Error adding expense" });
    });
};


exports.getExpense = async (req, res) => {
    const expenses = await Expense.findAll({
        where: { userId: req.userId }
    });
    res.status(200).json({ expenses });   
};

exports.deleteExpense = async (req, res) => {
    const id = req.params.id;

    await Expense.destroy({ 
        where: { 
            id,
            userId: req.userId
         } });

    res.status(200).json({ message: "Deleted" });
};