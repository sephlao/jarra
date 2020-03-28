const express = require('express');
const { getFeaturedProducts } = require('../models/rooms');
const { getLoggedUser } = require('../data/session');
const router = express.Router();

router.get('/', (req, res) => {
    const user = getLoggedUser();
	res.render('dashboard', {
		title: `Dashboard | ${user.username}` ,
		rooms: getFeaturedProducts(),
		user
	});
});

module.exports = router;
