const mongoose = require('mongoose')

const planSchema =  mongoose.Schema({

    name:{
        type:String, 
        required:true, 
    }, 
    cuotas:{
        type:Number, 
        required:true
    }, 
    percentaje:{
        type:Number, 
        required:true, 
        
    }
})

module.exports =Plan= mongoose.Model('plan', planSchema)