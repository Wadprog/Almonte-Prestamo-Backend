const mongoose = require('mongoose')

const planesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  interval: {
    type: Number
  },
  interest: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Plan = mongoose.model('plan', planesSchema)
