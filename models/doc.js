const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	title: {
		type: string,
		required: true
	}
});

module.exports = Doc = mongoose.model('doc', docSchema);
