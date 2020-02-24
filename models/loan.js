const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'client'
	},
	monto: {
		type: Number,
		required: true
	},
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'plan'
	},
	estadoPago: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default: 'unpaid'
	},
	antecedentes: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'loan'
			}
		}
	],
	interes: [
		{
			fecha: {
				type: Date,
				default: Date.now
			},
			monto: {
				type: Number
			}
		}
	],
	pagos: [
		{
			fecha: {
				type: Date,
				default: Date.now
			},
			monto: {
				type: Number,
				required: true
			},
			colector: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],

	fecha: {
		type: Date,
		default: Date.now
	}
});

module.exports = Loan = mongoose.model('loan', loanSchema);
