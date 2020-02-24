const express = require('express');
const router = express.Router();
const Prestamos = require('../../models/prestamos');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Prestamos/
//@desc get all Prestamos route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let prestamos = await Prestamos.find();
		res.json(prestamos);
	} catch (error) {
		console.log(`Get not complete task get all prestamos`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Prestamos/:id
//@desc Get  a  Prestamos by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let prestamo = await Prestamos.findById(req.params.id);
		if (!prestamo) res.status(404).json({ msg: 'This prestamo does not exist' });
		res.json(prestamo);
	} catch (error) {
		console.log(`Could not get this prestamo ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/Prestamos/
//@desc Create new  Prestamos route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		prestamo = new Prestamos(req.body);

		await prestamo.save();

		res.json(prestamo);
	} catch (error) {
		console.log(`Error creating new prestamo`);
		res.json({ msg: 'Server error ${error}' });
	}
});

module.exports = router;
