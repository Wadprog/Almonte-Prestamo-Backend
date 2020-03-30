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
		return res.json(docs);
	} catch (error) {
	
	return	res.json({ msg: 'Server error ${error}' });
	}
});



router.post('/', async (req, res) => {
	try {
		let doc = new Doc(req.body);
		await doc.save();
		return res.json(doc);
	} catch (error) {
		
		return res.json({ msg: `Server error ${error}` });
	}
});

module.exports = router;
