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
		let loans = await Loan.find();
		res.json(loans);
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
		let loan = await Loan.findById(req.params.id).populate([ 'plan', 'client' ]);
		if (!loan) res.status(404).json({ msg: 'This loan does not exist' });
		res.json(loan);
	} catch (error) {
		console.log(`Could not get this loan ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
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

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp
router.post('/due/:id', async (req, res) => {
	try {
		let loan = await Loan.findById(req.params.id).populate([ 'plan', 'client' ]);
		if (!loan) return res.status(404).json({ msg: 'Prestamo no existe' });

		if (loan.estadoPago) return res.status(401).json({ msg: 'todo pagado' });

		const { monto, collector } = req.body;
		let newDue = { monto };
		if (collector) newDue.collector = collector;
		loan.pagos.push(newDue);
		// check if  all payment are made
		if (loan.plan.cuotas <= loan.pagos.length - 2) {
			loan.estadoPago = true;
			loan.status = 'paid';
		}
		await loan.save();
		res.json(loan);
	} catch (error) {
		console.log(`server error ${error}`);
		return res.status(500).json({ msg: 'server error' + error.message });
	}
});

//@routes post api/Loan/due/:id
//@desc Create new  Loan route
//@desc access public temp

router.get('/get/routine/', async (req, res) => {
	try {
		let loans = await Loan.find({ estadoPago: false }).populate([ 'client', 'plan' ]);

		/*const loanWitnNopayment = [];
		loans.forEach(loan => {
			if (loan.pagos.length == 0) {
				let loanDate = new Date(loan.fecha, 'DD/MM/YYYY');
				let currentDate = (Date.now();
				if (currentDate.diff(loanDate, 'days') >= 1) loanWitnNopayment.push(loan);
			}
		});*/

		/*limitdate= new Date()+15;
	
		const tempL = loans.map(loan => {
			if (loan.pagos.length > 0) {
			
				if (Date(loan.pagos[loan.pagos.length - 1].fecha) > limitdate) {
		
					return loan;
				}
			} else {
		
				return loan;
			}
		});

		loans = tempL;
*/
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
			response.push({ city: tempCity });
		});

		res.json({ response });
	} catch (error) {
		console.log(`Get not complete task get all Loan`);
		res.json({ msg: `Server error ${error}` });
	}
});

router.get('/client/:id', async (req, res) => {
	try {
		let loans = await Loan.find({ client: req.params.id }).populate('plan');
		res.json(loans);
	} catch (error) {
		console.log(`Get not complete task get all Loan`);
		res.json({ msg: `Server error ${error}` });
	}
});



module.exports = router;
