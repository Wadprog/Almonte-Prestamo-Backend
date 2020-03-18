const express = require('express');
const router = express.Router();
const Client = require('../../models/client');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Client/
//@desc get all Client route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let clients = await Client.find();
		res.json(clients);
	} catch (error) {
		console.log(`Get not complete task get all clients`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Client/:id
//@desc Get  a  Client by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let client = await Client.findById(req.params.id);
		if (!client) res.status(404).json({ msg: 'This client does not exist' });
		res.json(client);
	} catch (error) {
		console.log(`Could not get this client ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/Client/
//@desc Create new  Client route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		const { cedula } = req.body;
		let client = await Client.findOne({ cedula });
		if (client) res.status(400).json({ msg: 'Un client con este cedula existe' });

		const { name, apellido, telefono, dirreccion, ciudad, DirReferencia } = req.body;

		client = new Client({ cedula,name, apellido, telefono, dirreccion, ciudad, DirReferencia });

		if (req.body.telefono2 && req.body.telefono2 != '') client.telefono2 = req.body.telefono2;
		if (req.body.telefono3 && req.body.telefono3 != '') client.telefono3 = req.body.telefono3;

		await client.save();

		res.json(client);
	} catch (error) {
		console.log(`Error creating new client`);
		res.json({ msg: `Server error ${error}` });
	}
});

router.put('/', async (req, res) => {
	try {
		const { cedula } = req.body;
		let client = await Client.findOne({ cedula });
		if (!client) res.status(400).json({ msg: 'No Hay cliente con este cedual' });

		const modified = [];

		if (req.body.name && req.body.name != '' && req.body.name != client.name) {
			client.name = req.body.name;
			modified.push(`nombre a ${client.name}`);
		}
		if (req.body.apellido && req.body.apellido != '' && req.body.apellido != client.apellido) {
			client.apellido = req.body.apellido;
			modified.push(`apellido a ${client.apellido}`);
		}
		if (req.body.cedula && req.body.cedula != '' && req.body.cedula != client.cedula) {
			client.cedula = req.body.cedula;
			modified.push(`cedula a ${client.cedula}`);
		}

		if (req.body.telefono && req.body.telefono != '' && req.body.telefono != client.telefono) {
			client.telefono = req.body.telefono;
			modified.push(`telefono a ${client.telefono}`);
		}
		if (req.body.DirReferencia && req.body.DirReferencia != '' && req.body.DirReferencia != client.DirReferencia) {
			client.DirReferencia = req.body.DirReferencia;
			modified.push(`Referencia de dirreccion a ${client.DirReferencia}`);
		}
		if (req.body.dirreccion && req.body.dirreccion != '' && req.body.dirreccion != client.dirreccion) {
			client.dirreccion = req.body.dirreccion;
			modified.push(`dirreccion a ${client.dirreccion}`);
		}
		if (req.body.ciudad && req.body.ciudad != '' && req.body.ciudad != client.ciudad) {
			client.ciudad = req.body.ciudad;
			modified.push(`ciudad a ${client.ciudad}`);
		}
		if (req.body.telefono2 && req.body.telefono2 != '' && req.body.telefono2 != client.telefono2) {
			client.telefono2 = req.body.telefono2;
			modified.push(`telefono2 a ${client.telefono2}`);
    }
    if(req.body.telefono2 && req.body.telefono2 == '')
    client.telefono2= null

		if (req.body.telefono3 && req.body.telefono3 != '' && req.body.telefono3 != client.telefono3) {
			client.telefono3 = req.body.telefono3;
			modified.push(`telefono3 a ${client.telefono3}`);
    }
   if(req.body.telefono3 && req.body.telefono3 == '')
    client.telefono2= null

		await client.save();

		res.json({ modified, client });
	} catch (error) {
		console.log(`Error updating client ${error}`);
		return res.status(400).json({ error });
	}
});

module.exports = router;
