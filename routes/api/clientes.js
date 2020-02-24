const express = require('express');
const router = express.Router();
const Clientes = require('../../models/clients');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Clientes/
//@desc get all Clientes route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let clients = await Clientes.find();
		res.json(clients);
	} catch (error) {
		console.log(`Get not complete task get all clients`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Clientes/:id
//@desc Get  a  Clientes by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let client = await Clientes.findById(req.params.id);
		if (!client) res.status(404).json({ msg: 'This client does not exist' });
		res.json(client);
	} catch (error) {
		console.log(`Could not get this client ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/Clientes/
//@desc Create new  Clientes route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		const { cedula } = req.body;
		let client = await Clientes.findOne({ cedula });
		if (client) res.status(400).json({ msg: 'Un client con este cedula existe' });

		const { cuotas, percentaje } = req.body;

		client = new Clientes(req.body)

		await client.save();

		res.json(client);
	} catch (error) {
		console.log(`Error creating new client`);
		res.json({ msg: 'Server error ${error}' });
	}
});

module.exports = router;
