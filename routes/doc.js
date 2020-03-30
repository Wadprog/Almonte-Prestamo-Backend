const express = require('express');
const router = express.Router();
const Doc = require('../../models/doc');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/Plan/
//@desc get all Plan route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
		let docs = await Doc.find();
		res.json(docs);
	} catch (error) {
		console.log(`Get not complete task get all Plans`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/Plan/:id
//@desc Get  a  Plan by id route
//@desc access public temp

//@routes post api/Plan/
//@desc Create new  Plan route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		let doc = new Doc(req.body);
		await doc.save();
		res.json(doc);
	} catch (error) {
		console.log(`Error creating new plan`);
		res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
