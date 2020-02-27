let user = require('../data/user'); // fake db
module.exports = () => {
  const getUserInfo = () => ({ ...user });

  const setUserInfo = data => (user = { ...data });

  return { getUserInfo, setUserInfo };
};
