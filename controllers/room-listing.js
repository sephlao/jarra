const express = require('express');
const { getAllRooms } = require('../utils/room');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('rooms', {
		title: 'Room Listing',
		rooms: await getAllRooms(),
		user: res.locals.currentUser
	});
});

module.exports = router;
