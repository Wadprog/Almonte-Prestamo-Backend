const express = require('express');
const app = express(); 
app.get('/', (req, res)=> res.send('We are working good'))
const PORT = process.env.Port || 6000; 
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`)); 