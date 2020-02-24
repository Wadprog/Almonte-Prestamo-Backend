const express = require('express');
const router = express.Router();
const Plan = require('../../models/plan');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Plan/
//@desc get all Plan route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let plans = await Plan.find();
		res.json(plans);
	} catch (error) {
		console.log(`Get not complete task get all Plans`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Plan/:id
//@desc Get  a  Plan by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let plan = await Plan.findById(req.params.id);
		if (!plan) res.status(404).json({ msg: 'This plan does not exist' });
		res.json(plan);
	} catch (error) {
		console.log(`Could not get this plan ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/Plan/
//@desc Create new  Plan route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		let plan = await Plan.findOne({ name });
		if (plan) res.status(400).json({ msg: 'Un plan con este nombre existe' });

		const { cuotas, percentaje } = req.body;

		plan = new Plan({
			name,
			cuotas,
			percentaje
		});

		await plan.save();

		res.json(plan);
	} catch (error) {
		console.log(`Error creating new plan`);
		res.json({ msg: 'Server error ${error}' });
	}
});

module.exports = router;
