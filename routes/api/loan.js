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
		
		if(loan.estadoPago)
		return res.status(401).json({msg:'todo pagado'});

		const { amount, collector } = req.body;
		let newDue = { amount };
		if (collector) newDue.collector = collector;
		loan.dues.push(newDue);
		// check if  all payment are made
		if (loan.plan.cuotas <= loan.dues.length - 1) {
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

module.exports = router;
