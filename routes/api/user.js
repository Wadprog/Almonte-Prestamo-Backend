const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/User/
//@desc get all User route
//@desc access public temp
router.get('/', async (req, res) => {
	try {
  
		let users = await User.find();
		res.json(users);
	} catch (error) {
		console.log(`Get not complete task get all User`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes get api/User/:id
//@desc Get  a  User by id route
//@desc access public temp

router.get('/:id', async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		if (!user) res.status(404).json({ msg: 'This user does not exist' });
		res.json(user);
	} catch (error) {
		console.log(`Could not get this user ${req.params.id}`);
		res.json({ msg: 'Server error ${error}' });
	}
});
//@routes post api/User/
//@desc Create new  User route
//@desc access public temp
router.post('/', async (req, res) => {
	try {
		user = new User(req.body);

		await user.save();

		res.json(user);
	} catch (error) {
		console.log(`Error creating new user`);
		res.json({ msg: 'Server error ${error}' });
	}
});

module.exports = router;
