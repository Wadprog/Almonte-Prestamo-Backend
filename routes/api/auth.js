const express = require('espress')
const router = express.Router()

//@route GET api/clientes
//desc TEST route
//@access public
router.get('/', (req, res) => res.send('auth route'))
module.exports = router