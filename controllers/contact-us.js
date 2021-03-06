const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.render('contact-us', {
			title: 'Contact Us',
			user: res.locals.currentUser
		});
	})
	.post(({ body: { name, email, message } }, res) => {
		const checkValidEmail = email => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
		if (name && email && message && checkValidEmail(email)) {
			// send email
			const sgMail = require('./send-email');
			sgMail({
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
