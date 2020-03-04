const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
/*----------------------------------------------------------
                         Routes
------------------------------------------------------------*/

//@routes get api/auth/
//@desc test route
//@desc access private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		res.status(500).send('Server error fething user from database' + error);
	}
});

//@routes get api/auth/
//@desc test route
//@desc access public
router.post(
	'/',
	[
		check('name', 'Se necesita un nombre').not().isEmpty(),
		check('password', 'Entrar contrasena con un minimo de 4 caracter').not().isEmpty()
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
		const { name, password } = req.body;
		try {
			let user = await User.findOne({ name });
			if (!user) return req.status(401).json({ msg: 'usuario no existe' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: 'usuario no existe' });

			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					return res.json({ token });
				}
			);
		} catch (error) {
			console.log(`Error siging in user. ${error}`);
		}
	}
);






module.exports = router;