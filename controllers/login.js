const express = require('express');
const { setUserInfo } = require('../models/user');

const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.render('login');
	})
	.post(({ body: { username, password } }, res) => {
		if (username && password) {
			//   router.set('currentUser', );
			setUserInfo({ username, password, logged: true });
			res.redirect('/');
		} else {
			res.render('login', {
				error: {
					username: !username,
					password: !password
				},
				data: { username, password }
			});
		}
	});

module.exports = router;
