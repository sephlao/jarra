const express = require('express');
const { getUserInfo } = require('../models/user');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.render('contact-us', {
			title: 'Contact Us',
			user: getUserInfo()
		});
	})
	.post(({ body: { name, email, message } }, res) => {
		const checkValidEmail = email => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
		if (name && email && message && checkValidEmail(email)) {
			// send email
			console.log('send email...');
			const sgMail = require('@sendgrid/mail');
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			sgMail
				.send({
					to: 'jvincentlao15@gmail.com',
					from: email,
					subject: `Contact Us | ${name}`,
					text: `${message}`
					// html: `<strong>${message}</strong>`
				})
				.then(() => res.redirect('/'))
				.catch(console.error);
		} else {
			res.render('contact-us', {
				error: {
					name: !name,
					email: !email,
					emailInvalid: !checkValidEmail(email),
					message: !message
				},
				data: { name, email, message }
			});
		}
	});

module.exports = router;
