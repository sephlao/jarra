const express = require('express');
const roomsModel = require('../models/rooms');
const { getUserInfo } = require('../models/user');
const router = express.Router();
const { getFeaturedProducts } = roomsModel();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
		rooms: getFeaturedProducts(),
		user: getUserInfo()
	});
});

module.exports = router;
