const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const filterUserData = require('../data/user');
const router = express.Router();

router.get('/', (req, res) => {
	const user = filterUserData(req.session.currentUser);
	res.render('home', {
		title: 'Home',
		rooms: getFeaturedProducts(),
		user
	});
});

module.exports = router;
