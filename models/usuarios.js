const mongoose = require('mongoose');

const usuariosSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	nombreUsuarios: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	estado: {
		type: Boolean,
		default: true
	}
});

module.exports = Usuario = mongoose.model('usuario', usuariosSchema);
