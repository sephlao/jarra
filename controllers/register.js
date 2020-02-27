const express = require('express');
const userModel = require('../models/user');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('register');
  })
  .post(({ body: { firstname, lastname, bday, username, password } }, res) => {
    const checkPasswordValidity = pass =>
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
    if (
      firstname &&
      lastname &&
      username &&
      password &&
      checkPasswordValidity(password)
    ) {
      //   router.set('currentUser', { username, password, logged: true });
      const { setUserInfo } = userModel();
      setUserInfo({ username, password, logged: true });
      res.redirect('/');
    } else {
      res.render('register', {
        error: {
          firstname: !firstname,
          lastname: !lastname,
          username: !username,
          password: !password,
          passwordMatch: !checkPasswordValidity(password)
        },
        data: { firstname, lastname, bday, username, password }
      });
    }
  });

module.exports = router;
