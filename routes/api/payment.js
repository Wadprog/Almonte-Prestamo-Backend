const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment');
const moment = require('moment');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Payment/
//@desc get all Payment route
//@access access public temp
router.get('/', async (req, res) => {
	try {
		let payments = await Payment.find();
		payments = payments.filter(payment => payment.status != 'unpaid');
		res.json(payments);
	} catch (error) {
		console.log(`Get not complete task get all Payments`);
		res.json({ msg: `Server error ${error}` });
	}
});
//@routes get api/Payment/:id
//@desc Get  a  Payment by id route
//@desc access public temp

router.get('/loan/:id', async (req, res) => {
	try {
		let payments = await Payment.find({ loan: req.params.id });

		payments = payments.filter(payment => payment.status != 'unpaid');
	
		res.json(payments);
	} catch (error) {
		console.log(`Could not get a Payment with id = ${req.params.id}`);
		res.json({ msg: `Server error ${error}` });
	}
});

router.get('/:id', async (req, res) => {
	try {
		let payment = await Payment.findById(req.params.id);
		if (!payment) res.status(404).json({ msg: 'This Payment does not exist' });
		res.json(payment);
	} catch (error) {
		console.log(`Could not get a Payment with id = ${req.params.id}`);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
