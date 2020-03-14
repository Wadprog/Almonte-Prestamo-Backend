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

		let cliente = await Client.find({ cedula: client.cedula });

		if (cliente) {
			let newLoan = new Loan({
				client: cliente.id,
				...loan
			});
			await newLoan.save();
			return res.json({ cliente, newLoan });
		} else {
			cliente = new Client({
				...client
			});
			await cliente.save();
			let newLoan = new Loan({
				client: cliente.id,
				...loan
			});
			await newLoan.save();
			return res.json({ newLoan, cliente });
		}
	} catch (error) {
		console.log(`Get not complete task  create cliente and Prestamo `);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
