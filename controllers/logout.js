const express = require('express');
const { setUserInfo } = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
	setUserInfo({ username: null, password: null, logged: false });
	res.redirect('/');
});

module.exports = router;
