const express = require('express');
const router = express.Router();
const Loan = require('../../models/loan');
const moment = require('moment');

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
		const limitdate = 16;
		const currentDate = moment();
		console.log(currentDate);
		currentDate.add(limitdate, 'day');
		console.log(currentDate);

		// need to use moment to create acurate date calc
		let today = Date.now() - limitdate;
		// need to fix querry
		/*
		let loans = await Loan.find({
			$or: [
				{ estadoPago: false, pagos: [], fecha: { $gt: currentDate } },
				{ estadoPago: false, pagos: { $exists: true, $ne: [] } }
			]
		}).populate([ 'client', 'plan' ]);

		*/

		let loans = await Loan.find({ estadoPago: false }).populate([ 'client', 'plan' ]);

		const loanWitnNopayment = [];
		loans.forEach(loan => {
			if (loan.pagos.length == 0) {
				let loanDate = moment(loan.fecha, 'DD/MM/YYYY');
				let currentDate = moment(Date.now());
				if (currentDate.diff(loanDate, 'days') >= 1) loanWitnNopayment.push(loan);
			}
		});

		console.log(`Loan never paid ${loanWitnNopayment}`);

		let a = 0;
		let b = 0;
		let c = 0;
		const tempL = loans.map(loan => {
			if (loan.pagos.length > 0) {
				c++;
				if (moment(loan.pagos[loan.pagos.length - 1].fecha) > limitdate) {
					b++;
					console.log(`to pay ${loan}`);
					return loan;
				}
			} else {
				a++;
				return loan;
			}
		});
		console.log(` ${c} loan with no pay ${a} loans to pay ${b}`);
		loans = tempL;

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
//@routes post api/Loan/
//@desc Create new  Loan route
//@desc access public temp
router.post('/payment/:id', async (req, res) => {
	try {
		let loan = await Loan.findById(req.params.id);
		if (!loan) res.status(404).json({ msg: `Loan not found ${req.params.id}` });
		const { monto, colector } = req.body;
		loan.pagos.push({ monto, colector });
		await loan.save();

		res.json(loan);
	} catch (error) {
		console.log(`Error creating new loan`);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
