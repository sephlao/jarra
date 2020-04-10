const express = require('express');
const { setUserInfo } = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
