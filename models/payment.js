const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loan'
  },
  dateToPay: {
    type: Date,
    required: true
  },

  dateAmountPaid: {
    type: Date
  },
  dateInterestPaid: {
    type: Date
  },
  quota: {
    type: Number
  },
  status: {
    type: String,
    default: 'unpaid'
  },

  amountPaid: {
    type: Number
  },

  interestPaid: {
    type: Number
  }
})

module.exports = Payment = mongoose.model('payment', paymentSchema)
