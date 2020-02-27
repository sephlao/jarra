const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const ROOMS = require('./data/rooms'); // pretend db fetch for rooms data
const PORT = process.env.PORT || 3000;
const app = express();

const getHomeData = () => ({
  title: 'Home',
  rooms: ROOMS.data.slice(0, 3),
  user: app.get('currentUser')
});

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Web app is up and running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.render('home', { ...getHomeData() });
});

app.get('/rooms', (req, res) => {
  res.render('rooms', { rooms: ROOMS.data, user: app.get('currentUser') });
});

app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(({ body: { firstname, lastname, bday, username, password } }, res) => {
    if (username && password) {
      app.set('currentUser', { username, password, logged: true });
      res.redirect('/');
    } else {
      res.render('register', {
        error: {
          firstname: !firstname,
          lastname: !lastname,
          bday: !bday,
          username: !username,
          password: !password,
          passwordMatch: !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
            password
          )
        },
        data: { firstname, lastname, bday, username, password }
      });
    }
  });

app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(({ body: { username, password } }, res) => {
    if (username && password) {
      app.set('currentUser', { username, password, logged: true });
      res.redirect('/');
    } else {
      res.render('login', {
        error: {
          username: !username,
          password: !password
        },
        data: { username, password }
      });
    }
  });

app.get('/logout', (req, res) => {
  app.set('currentUser', {});
  res.redirect('/');
});

app.use((req, res) => {
  const data = { url: req.originalUrl, user: app.get('currentUser') };
  res.status(404).render('404', data);
});

// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   .then(message => console.log(message.sid));
