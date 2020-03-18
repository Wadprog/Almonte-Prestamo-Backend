const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		required: true
	},

	cedula: {
		type: String,
		required: true,
		unique: true
	},
	telefono: {
		type: String,
		require: true
	},
	telefono2: {
		type: String
	},
	telefono3: {
		type: String
	},
	dirreccion: {
		type: String,
		required: true
	},
	ciudad: {
		type: String,
		required: true
	},
	DirReferencia: {
		type: String
	},
	puntos: {
		type: Number,
		default: 500
	}
});

module.exports = Client = mongoose.model('client', clienteSchema);
