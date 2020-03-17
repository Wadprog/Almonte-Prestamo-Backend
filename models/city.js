const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique:true
  }
})
module.exports = City = mongoose.model('city', citySchema)
