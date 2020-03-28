const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const { getLoggedUser } = require('../data/session');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
		rooms: getFeaturedProducts(),
		user: getLoggedUser()
	});
});

module.exports = router;
