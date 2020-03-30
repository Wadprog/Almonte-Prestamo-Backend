const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	}
});

module.exports = Doc = mongoose.model('doc', docSchema);
