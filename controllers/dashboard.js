const express = require('express');
const path = require('path');

const isAuthenticated = require('../middleware/auth');
const UserModel = require('../models/user');
const { getAllRooms, getFeaturedRooms, setNewRoom } = require('../utils/room');

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
	const rooms = await getFeaturedRooms();
	const user = res.locals.currentUser;
	res.render('dashboard', {
		title: `Dashboard | ${user.firstname} ${user.lastname}`,
		rooms,
		user
	});
});

router.get('/edit/profile/:id', isAuthenticated, (req, res) => {
	res.render('edit-profile', {
		title: `Edit user profile`,
		data: res.locals.currentUser
	});
});

router.post('/edit/profile', isAuthenticated, (req, res) => {
	console.log(req.session.currentUser._id, req.body);
	const currentUser = req.session.currentUser;
	const profpic = req.files ? req.files.profpic : null;
	if (profpic) {
		profpic.name = currentUser._id + path.parse(profpic.name).ext;
		profpic.mv(`public/img/uploads/profile/${profpic.name}`);
	}
	UserModel.updateOne({ _id: currentUser._id }, { ...req.body, profpic: profpic ? profpic.name : null }).then(() => {
		req.session.currentUser = { ...currentUser, ...req.body, profpic: profpic ? profpic.name : null };
		res.redirect('/dashboard');
	});
});

router.post('/add/room', isAuthenticated, (req, res) => {
	const image = req.files ? req.files.image : null;
	if (image) {
		image.name = req.body.name.toLowerCase().replace(/\s+/g, '_') + path.parse(image.name).ext;
		image.mv(`public/img/uploads/room/${image.name}`);
	}
	setNewRoom({ ...req.body, imgURL: image ? image.name : null }).then(data => console.log(data));
	res.redirect('/dashboard');
});

module.exports = router;
