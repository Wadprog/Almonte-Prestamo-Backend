const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loan'
  },
  dateToPay: {
    type: String,
    required: true
  },

  dateAmountPaid: {
    type: String
  },
  dateInterestPaid: {
    type: String
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
  }, 
  comment:{
    type:String
  }
})

module.exports = Payment = mongoose.model('payment', paymentSchema)
