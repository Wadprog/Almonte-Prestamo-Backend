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
		let loan = await Loan.findById(req.params.id).populate('plane', ['name', 'cuotas']);
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

module.exports = router;
