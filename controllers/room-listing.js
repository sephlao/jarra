const express = require('express');
const roomsModel = require('../models/rooms');

const router = express.Router();
const { getAllProducts } = roomsModel();

router.get('/', (req, res) => {
  res.render('rooms', {
    title: 'Room Listing',
    rooms: getAllProducts(),
    user: router.get('currentUser')
  });
});

module.exports = router;
