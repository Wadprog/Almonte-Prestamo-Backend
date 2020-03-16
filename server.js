const express = require('express')
// in deploy
const connectDB = require('./config/db')

const app = express()
app.use(express.json({ extended: false }))

// connection to database;
connectDB()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

//use the routes

app.use('/api/client', require('./routes/api/client'))
app.use('/api/plan', require('./routes/api/plan'))
app.use('/api/loan', require('./routes/api/loan'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/clientwloan', require('./routes/api/clientwloan'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index', { test: 'sister' }))
app.use('/client', require('./routes/client'))

const PORT = process.env.Port || 6000
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
