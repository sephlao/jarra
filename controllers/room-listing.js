const express = require('express');
const { getAllProducts } = require('../models/rooms');
const { getLoggedUser } = require('../data/session');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('rooms', {
		title: 'Room Listing',
		rooms: getAllProducts(),
		user: getLoggedUser()
	});
});

module.exports = router;
