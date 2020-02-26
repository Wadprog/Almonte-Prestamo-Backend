const express = require('express');
const router = express.Router();
const Loan = require('../../models/loan');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Loan/
//@desc get all Loan route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let loans = await Loan.find().populate([ 'plan', 'client' ]);

		res.json({ count: loans.length, loans });
	} catch (error) {
		console.log(`Get not complete task get all Loan`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Loan/:id
//@desc Get  a  Loan by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let loan = await await Loan.findById(req.params.id).populate([ 'plan', 'client' ]);
		if (!loan) res.status(404).json({ msg: 'This loan does not exist' });
		res.json(loan);
	} catch (error) {
		console.log(`Could not get this loan ${req.params.id} and error ${error}`);
		res.json({ msg: `Server error ${error}` });
	}
});
//@routes get api/Loan/:id
//@desc Get  a  Loan by id route
//@desc access public temp

router.get('/client/:id', async (req, res) => {
	try {
		let loans = await Loan.find({ client: req.params.id }).populate('plan');
		res.json(loans);
	} catch (error) {
		console.log(`Get not complete task get all Loan`);
		res.json({ msg: `Server error ${error}` });
	}
});

//@routes get api/Loan/routine
//@desc Get  all non debt collectable
//@desc access public temp

router.get('/get/routine/', async (req, res) => {
	try {
		const limitdate = 1;
		// need to use moment to create acurate date calc
		let today = Date.now() - limitdate;
		// need to fix querry 
		let loans = await Loan.find({
			$or: [
				{ estadoPago: false, pagos: [], fecha: { $lt: today } },
				{ estadoPago: false, pagos: { $exists: true, $ne: [] }, monto: { $gt: 1000 } }
			]
		}).populate([ 'client', 'plan' ]);

		const cities = loans.reduce(
			(unique, loan) => (unique.includes(loan.client.ciudad) ? unique : [ ...unique, loan.client.ciudad ]),
			[]
		);
		let response = [];
		cities.forEach(city => {
			let tempCity = loans.reduce(
				(allLoans, loan) => (loan.client.ciudad != city ? allLoans : [ ...allLoans, loan ]),
				[]
			);
			response.push({ [city]: tempCity });
		});

		res.json({ count: loans.length, response });
	} catch (error) {
		console.log(`Get not complete task get all Loan`);
		res.json({ msg: `Server error ${error}` });
	}
});
//@routes post api/Loan/
//@desc Create new  Loan route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		loan = new Loan(req.body);

		await loan.save();

		res.json(loan);
	} catch (error) {
		console.log(`Error creating new loan`);
		res.json({ msg: 'Server error ${error}' });
	}
});

module.exports = router;
