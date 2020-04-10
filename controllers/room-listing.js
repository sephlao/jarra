const express = require('express');
const { getAllRooms, getRoomsbyLocation, getRoomById, updateRoom, removeRoom } = require('../utils/room');
const { isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
	let rooms = [];
	if (req.query && req.query.search) {
		rooms = await getRoomsbyLocation(req.query.search);
	} else {
		rooms = await getAllRooms();
	}
	res.render('rooms', {
		title: 'Room Listing',
		rooms,
		user: { ...res.locals.currentUser },
		search: req.query.search
	});
});

router.get('/:id', async (req, res) => {
	const room = await getRoomById(req.params.id);
	const { currentUser: user } = res.locals;
	res.render('room', {
		title: `Room Info ${room.name}`,
		room,
		user: { ...user, isAdmin: user && user.accountType === 'ADMIN' }
	});
});

router.get('/update/:id', isAdmin, async (req, res) => {
	const room = await getRoomById(req.params.id);
	const { currentUser: user } = res.locals;
	const tags = ['NEW', 'FEATURED', 'ON SALE'].map(tag => {
		if (room.tag.includes(tag)) return { value: tag, selected: true };
		else return { value: tag, selected: false };
	});
	res.render('edit-room', {
		title: `Update Room Info ${room.name}`,
		room,
		user: { ...user },
		tags
	});
});

router.post('/update/:id', isAdmin, async (req, res) => {
	const id = req.params.id;
	await updateRoom(id, req.body); // let update finish then redirect
	res.redirect('/rooms');
});

router.get('/remove/:id', isAdmin, async (req, res) => {
	await removeRoom(req.params.id);
	res.redirect('/rooms');
});

module.exports = router;
