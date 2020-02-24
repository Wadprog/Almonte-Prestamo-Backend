const express = require('express');

const connectDB= require('./config/db')

const app = express(); 
app.use(express.json({extended:false}));

// connection to database; 
connectDB(); 

//use the routes

app.use('/api/client',require('./routes/api/client'))
app.use('/api/plan',require('./routes/api/plan'))
app.use('/api/loan',require('./routes/api/loan'))
app.use('/api/user',require('./routes/api/user'))


app.get('/', (req, res)=> res.send('We are working good'))
const PORT = process.env.Port || 6000; 
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)); 