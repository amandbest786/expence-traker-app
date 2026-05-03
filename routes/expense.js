const express = require('express');
const router = express.Router();
const controller = require('../controller/expense');
const auth = require('../middleware/auth');

router.post('/add-expense', auth, controller.addExpense);
router.get('/get-expense', auth, controller.getExpense);
router.delete('/delete-expense/:id', auth, controller.deleteExpense);


module.exports = router;

