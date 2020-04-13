const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'client'
	},
	amount: {
		type: Number,
		required: true
	},
	amountPerQuota: {
		type: Number
	},
	interestPerQuota: {
		type: Number
	},
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'plan'
	},
	status: {
		type: Boolean,
		default: false
	},
	quota: {
		type: Number,
		default: 0
	},

	nextpaymentDate: {
		type: String
	},
	date: {
		type: String
	},
	oldLoan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'loan'
	},
	comment: {
		type: String
	}
});

module.exports = Loan = mongoose.model('loan', loanSchema);
