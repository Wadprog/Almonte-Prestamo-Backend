const mongoose = require('mongoose');

const planesSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	cuotas: {
		type: Number,
		required: true
	},
	percentaje: {
		type: Number,
		required: true
	},
	fecha: {
		type: Date,
		default: Date.now
	}
});

module.exports = Plan = mongoose.model('plan', planesSchema);
