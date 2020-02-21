const express = require('espress')
const router = express.Router()

//@route GET api/prestamos
//desc TEST route
//@access public
router.get('/', (req, res) => res.send('Prestamos route'))
module.exports = router
