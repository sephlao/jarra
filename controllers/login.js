const express = require('express');
const UserModel = require('../models/user');
const { setLoggedUser } = require('../data/session');
const bcrypt = require('bcryptjs');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.render('login');
	})
	.post(async (req, res) => {
		const {
			body: { username, password }
		} = req;
		if (username && password) {
			const user = await UserModel.findOne({ username });
			if (!user) {
				res.render('login', {
					error: { message: `Sorry, we can not find  user ${username}` },
					data: { username, password }
				});
			} else {
				const isMatched = await bcrypt.compare(password, user.password);
				if (isMatched) {
					req.session.currentUser = user;
					if (user.accountType === 'ADMIN') res.redirect('/dashboard');
					else res.redirect('/');
				} else {
					res.render('login', {
						error: { message: 'Username and password did not match' },
						data: { username, password }
					});
				}
			}
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
