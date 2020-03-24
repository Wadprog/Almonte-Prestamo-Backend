const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},

	date: {
		type: String
	}
});

module.exports = Expense = mongoose.model('expense', expenseSchema);
