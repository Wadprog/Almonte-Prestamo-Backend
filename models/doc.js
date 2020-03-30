const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	title: {
		type: string,
		required: true
	}
});

module.exports = Doc = mongoose.model('doc', docSchema);
