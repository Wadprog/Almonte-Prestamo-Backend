const mongoose = require('mongoose')

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
    required: true
  },
  dirreccion: {
    type: String,
    required: true
  },
  ciudad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city'
  },
  DirReferencia: {
    type: String
  }
})

module.exports = Client = mongoose.model('client', clienteSchema)
