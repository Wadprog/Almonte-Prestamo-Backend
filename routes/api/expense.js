const express = require('express');
const router = express.Router();
const Expense = require('../../models/expense');
const moment = require('moment');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Loan/
//@desc get all Loan route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let expenses = await Expense.find();
		res.json(expenses);
	} catch (error) {
		console.log(`Get not complete task get all expenses`);
		res.json({ msg: `Server error ${error}` });
	}
});

//@routes post api/Loan/
//@desc Create new  Loan route
//@desc access public temp

router.post('/', async (req, res) => {
	try {
		let expense = new Expense({ ...req.body, date: moment().format('l') });
		await expense.save();
		res.json(expense);
	} catch (error) {
		console.log(`Get not complete task get all expenses`);
		res.json({ msg: `Server error ${error}` });
	}
});
module.exports = router;
