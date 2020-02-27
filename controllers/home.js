const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const { getUserInfo } = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
		rooms: getFeaturedProducts(),
		user: getUserInfo()
	});
});

module.exports = router;
