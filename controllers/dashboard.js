const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

router.get('/', isAuthenticated, (req, res) => {
	const user = res.locals.currentUser;
	res.render('dashboard', {
		title: `Dashboard | ${user.firstname} ${user.lastname}`,
		rooms: getFeaturedProducts(),
		user: user
	});
});

module.exports = router;
