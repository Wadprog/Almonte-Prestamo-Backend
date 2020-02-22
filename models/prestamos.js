const mongoose = require('mongoose')

const prestamoSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes'
  },
  cantidad: {
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
        ref: 'Loan'
      }
    }
  ],
 interes:{},
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
        ref: 'usuarios'
      }
    }
  ],

  fecha: {
    type: Date,
    default: Date.now
  }
})

module.exports = Prestamo = mongoose.model('prestamo', prestamoSchema)
