const rooms = require('../data/rooms'); // fake db
module.exports = () => {
  const getAllProducts = () => rooms.data;

  const getFeaturedProducts = () => rooms.data.slice(0, 3);

  return { getAllProducts, getFeaturedProducts };
};
