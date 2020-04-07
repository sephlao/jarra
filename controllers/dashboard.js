const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const filterUserData = require('../data/user');
const router = express.Router();

router.get('/', (req, res) => {
	const user = filterUserData(req.session.currentUser);
	res.render('dashboard', {
		title: `Dashboard | ${user.firstname} ${user.lastname}`,
		rooms: getFeaturedProducts(),
		user: user
	});
});

module.exports = router;
