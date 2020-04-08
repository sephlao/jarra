const express = require('express');
const { getFeaturedRooms } = require('../utils/room');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('home', {
		title: 'Home',
		rooms: await getFeaturedRooms(),
		user: res.locals.currentUser
	});
});

module.exports = router;
