const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const { getUserInfo } = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    const user = getUserInfo();
	res.render('dashboard', {
		title: `Dashboard | ${user.username}` ,
		rooms: getFeaturedProducts(),
		user
	});
});

module.exports = router;