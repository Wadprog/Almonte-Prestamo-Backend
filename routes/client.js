const express = require('express');
const router = express.Router();
const Client = require('../models/client');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Client/
//@desc get all Client route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let clients = await Client.find();
		res.render('./client', { clients: clients });
	} catch (error) {
		console.log(`Get not complete task get all clients`);
		res.redirect('/');
	}
});

//@routes get api/Client/
//@desc get all Client route
//@desc access public temp
router.get('/new/', async (req, res) => {
	try {
		let cliente = new Client();
		cliente.name = 'bien';
		let ciudades = [ { name: 'santiago', id: 1 }, { name: 'puerto plata', id: 2 }, { name: 'iguey', id: 3 } ];
		res.render('./client/new', { cliente, ciudades });
	} catch (error) {
		console.log(`Get not complete task get all clients`);
		res.redirect('/');
	}
});

//@routes get api/Client/:id
//@desc Get  a  Client by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let cliente = await Client.findById(req.params.id);
		if (!cliente) res.status(404).json({ msg: 'This client does not exist' });
		res.render('./client/client', { cliente });
	} catch (error) {
		console.log(`Could not get this client ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/Client/
//@desc Create new  Client route
//@desc access public temp
router.post('/', async (req, res) => {
	console.log({ ...req.body });
	try {
		const { cedula } = req.body;
		let client = await Client.findOne({ cedula });
		if (client) res.status(400).json({ msg: 'Un client con este cedula existe' });

		const { name, apellidoPadre, dirreccion, ciudad, dirReferencia } = req.body;
    client = new Client({ name, apellidoPadre, cedula, dirreccion, ciudad, dirReferencia });
    
    if (req.body.apellidoMadre && req.body.apellidoMadre != '') client = new Client(req.body);
    client.apellidoMadre= req.body.apellidoMadre; 

    req.body.telefono.forEach(tel => {
      client.telefono.push(tel.numero)
    })
		await client.save();

		res.redirect('/client');
	} catch (error) {
		console.log(`Error creating new client`);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
