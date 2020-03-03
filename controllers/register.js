const express = require('express');
const { setUserInfo } = require('../models/user');

const router = express.Router();
const checkPasswordValidity = pass => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
let generatedCode = null;

router
	.route('/')
	.get((req, res) => {
		res.render('register');
	})
	.post((req, res) => {
		const { firstname, lastname, email, username, password, phonenumber, code, showCode } = req.body;

		// if all mandatory fields have data (server-side validation)
		if (firstname && lastname && username && password && checkPasswordValidity(password)) {
			if (!showCode && !code) {
				// send code
				const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
				generatedCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

				client.messages
					.create({
						body: `Your verification code is ${generatedCode}`,
						from: process.env.TWILIO_NO,
						to: phonenumber
					})
					.then(msg => {
						// if all fields valid show code input
						res.render('register', { data: { ...req.body, showCode: true } });
						console.log(`Message sent ${msg.sid}`);
					})
					.catch(console.error);
			} else if (showCode && !code) {
				// if code input is empty throw error
				res.render('register', { error: { code: !code }, data: { ...req.body } });
			} else {
				if (parseInt(code) !== generatedCode) {
					res.render('register', { error: { codeMatch: true }, data: { ...req.body } });
				} else {
					setUserInfo({ username, password, logged: true });
					const sgMail = require('./send-email');
					sgMail({
						to: email,
						from: 'admin@balay.email',
						subject: `Welcom to Balay ${firstname} ${lastname}!`,
						html: `<div><p>Hey there ${firstname},</p><p>Thanks for signing-up.
						We will be sending push notifications about your account and future deals in this email.</p></div>`
					})
						.then(() => res.redirect('/dashboard'))
						.catch(console.error);
				}
			}
		} else {
			res.render('register', {
				error: {
					firstname: !firstname, // firstname is required thus if empty error.firstname: true
					lastname: !lastname,
					username: !username,
					phonenumber: !phonenumber,
					password: !password,
					email: !email,
					emailInvalid: !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email),
					passwordMatch: !checkPasswordValidity(password)
				},
				data: { ...req.body }
			});
		}
	});

module.exports = router;
