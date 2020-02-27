const express = require('express');
const { getAllProducts } = require('../models/rooms');
const { getUserInfo } = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('rooms', {
		title: 'Room Listing',
		rooms: getAllProducts(),
		user: getUserInfo()
	});
});

module.exports = router;
