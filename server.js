const express = require('express');
const app = express(); 
app.get('/', (req, res)=> res.send('We are working good'))
app.use('/api/usuarios', require('./routes/api/usuarios'))
app.use('/api/prestamos', require('./routes/api/prestamos'))
app.use('/api/clientes', require('./routes/api/clientes'))

const PORT = process.env.Port || 6000; 
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)); 
