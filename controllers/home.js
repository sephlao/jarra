const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
		rooms: getFeaturedProducts(),
		user: res.locals.currentUser
	});
});

module.exports = router;
