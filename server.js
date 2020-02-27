// 3rd party modules
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// controllers
const homeController = require('./controllers/home');
const roomController = require('./controllers/room-listing');
const registerController = require('./controllers/register');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout');
const contactController = require('./controllers/contact-us');

// setup
const PORT = process.env.PORT || 3000;
const app = express();

// load local env
require('dotenv').config({ path: './config.env' });

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
	console.log(`Web app is up and running on http://localhost:${PORT}`);
});

app.use('/', homeController);

app.use('/rooms', roomController);

app.use('/register', registerController);

app.use('/login', loginController);

app.use('/logout', logoutController);

app.use('/contact-us', contactController);

// 404 redirect
app.use((req, res) => {
	const { getUserInfo } = require('./models/user');
	const data = { url: req.originalUrl, user: getUserInfo() };
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
