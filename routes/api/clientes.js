const express = require('espress')
const router = express.Router()

//@route GET api/clientes
//desc TEST route
//@access public
router.get('/', (req, res) => res.send('Clients route'))
module.exports = router
