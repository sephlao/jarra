const express = require('express');
const { getAllRooms, getRoomById } = require('../utils/room');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('rooms', {
		title: 'Room Listing',
		rooms: await getAllRooms(),
		user: res.locals.currentUser
	});
});

router.get('/:id', async (req, res) => {
	const room = await getRoomById(req.params.id);
	const { currentUser: user } = res.locals;
	res.render('room.handlebars', {
		title: `Room Info ${room.name}`,
		room,
		user: { ...user, isAdmin: user && user.accountType === 'ADMIN' }
	});
});

module.exports = router;
