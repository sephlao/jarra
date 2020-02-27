const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
const { setUserInfo } = userModel();

router.get('/', (req, res) => {
  setUserInfo({ username: null, password: null, logged: false });
  res.redirect('/');
});

module.exports = router;
