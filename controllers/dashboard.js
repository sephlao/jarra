const express = require('express');
const path = require('path');

const { isAdmin } = require('../middleware/auth');
const UserModel = require('../models/user');
const { getFeaturedRooms, setNewRoom } = require('../utils/room');

const router = express.Router();

router.get('/', isAdmin, async (req, res) => {
	const rooms = await getFeaturedRooms();
	const user = res.locals.currentUser;
	res.render('dashboard', {
		title: `Dashboard | ${user.firstname} ${user.lastname}`,
		rooms,
		user
	});
});

router.get('/edit/profile/:id', isAdmin, (req, res) => {
	res.render('edit-profile', {
		title: `Edit user profile`,
		data: res.locals.currentUser
	});
});

router.post('/edit/profile', isAdmin, (req, res) => {
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

router.post('/add/room', isAdmin, (req, res) => {
	const image = req.files ? req.files.image : null;
	if (image) {
		image.name = req.body.name.toLowerCase().replace(/\s+/g, '_') + path.parse(image.name).ext;
		image.mv(`public/img/uploads/room/${image.name}`);
	}
	setNewRoom({ ...req.body, imgURL: image ? image.name : null }).then(data => console.log(data));
	res.redirect('/dashboard');
});

module.exports = router;
