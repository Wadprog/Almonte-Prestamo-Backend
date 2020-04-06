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
		console.log(`Trying to login as ${name}`);
		try {
			let user = await User.findOne({ name });
			if (!user) {
				console.log(`${name} not found in DB`)
				if (name === 'Root' && password === 'Toor') {
					user = new User({
						name,
						password,
						nombreUsuarios: 'Admin'
					});

					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(password, salt);
					//Saving the user in the database
					await user.save();
					// Creating the payload
					const payload = {
						user: {
							id: user.id
						}
					};
					//Using the payload a returning the token
					jwt.sign(
						payload,
						config.get('jwtSecret'),
						{
							expiresIn: 360000
						},
						(err, token) => {
							if (err){
								console.log(`Error al crear token ${err}`)
								return res.status(500).json({ errors: [ { msg: `Error al crear token ${err}` } ] });
							}
							else{
								console.log(`Here is a token for the new Root ${token}`)
							return res.json({ token });
						}
						}
					);
				} else return res.status(404 ).json({ msg: 'Verificar las informaciones sumistradas' });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(404).json({ msg: 'Verificar las informaciones sumistradas' });

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
