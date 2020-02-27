const express = require('express');
const roomsModel = require('../models/rooms');
const { getUserInfo } = require('../models/user');

const router = express.Router();
const { getAllProducts } = roomsModel();

router.get('/', (req, res) => {
	res.render('rooms', {
		title: 'Room Listing',
		rooms: getAllProducts(),
		user: getUserInfo()
	});
});

module.exports = router;
