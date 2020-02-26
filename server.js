const express = require('express');

const connectDB= require('./config/db')

const app = express(); 
app.use(express.json({extended:false}));

// connection to database; 
connectDB(); 

// Access to all origin with CORS 
app.use((req,res,next)=>{
 res.header('Access-Control-Allow-Origin','*')
 res.header('Access-Control-Allow-Headers',"Origin, X-Request-With,Content-Type, Accept, Authorization")
 if(req.method==='OPTIONS'){
 res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
 return res.status(200).json({})
 }
next();
})
//use the routes

app.use('/api/client',require('./routes/api/client'))
app.use('/api/plan',require('./routes/api/plan'))
app.use('/api/loan',require('./routes/api/loan'))
app.use('/api/user',require('./routes/api/user'))


app.get('/', (req, res)=> res.send('We are working good'))
const PORT = process.env.Port || 6000; 
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)); 