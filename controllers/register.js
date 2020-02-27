const express = require('express');
const { setUserInfo } = require('../models/user');

const router = express.Router();
const checkPasswordValidity = pass => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);

router
	.route('/')
	.get((req, res) => {
		res.render('register');
	})
	.post(({ body: { firstname, lastname, bday, username, password } }, res) => {
		if (firstname && lastname && username && password && checkPasswordValidity(password)) {
			setUserInfo({ username, password, logged: true });
			res.redirect('/');
		} else {
			res.render('register', {
				error: {
					firstname: !firstname, // firstname is required thus if empty error.firstname: true
					lastname: !lastname,
					username: !username,
					password: !password,
					passwordMatch: !checkPasswordValidity(password)
				},
				data: { firstname, lastname, bday, username, password }
			});
		}
	});

module.exports = router;
