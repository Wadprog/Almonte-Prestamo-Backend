const express = require('express');

const connectDB= require('./config/db')

const app = express(); 
app.use(express.json({extended:false}));

// connection to database; 
connectDB(); 

//use the routes

app.use('/api/clientes',require('./routes/api/clientes'))
app.use('/api/planes',require('./routes/api/planes'))
app.use('/api/prestamos',require('./routes/api/prestamos'))
app.use('/api/usuarios',require('./routes/api/usuarios'))


app.get('/', (req, res)=> res.send('We are working good'))
const PORT = process.env.Port || 6000; 
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)); 