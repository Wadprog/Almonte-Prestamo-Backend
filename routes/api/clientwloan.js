const express = require('express');
const router = express.Router();
const Loan = require('../../models/loan');
const Client = require('../../models/client');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp

router.post('/', async (req, res) => {
	try {
		const { client, loan } = req.body;
		let cliente = await Client.findOne({ cedula: client.cedula });

		if (cliente) {
			console.log(` Cedula cliente es ${cliente.cedula}`);
			let newLoan = new Loan({
				client: cliente.id,
				...loan
			});
			await newLoan.save();
			return res.json({ cliente, newLoan });
		} else {
			let newCliente = new Client({
				...client
			});
			newCliente = await newCliente.save();
			console.log(newCliente.id);
			let newLoan = new Loan({
				client: newCliente.id,
				...loan
			});
			await newLoan.save();
			return res.json({ newLoan, newCliente });
		}
	} catch (error) {
		console.log(`Get not complete task  create cliente and Prestamo `);

		console.log(`hwere is the error ${error}`);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
