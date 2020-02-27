const express = require('express');
const roomsModel = require('../models/rooms');
const userModel = require('../models/user');
const router = express.Router();
const { getFeaturedProducts } = roomsModel();
const { getUserInfo } = userModel();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    rooms: getFeaturedProducts(),
    user: getUserInfo()
  });
});

module.exports = router;
