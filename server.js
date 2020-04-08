// 3rd party modules
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');

// controllers
const homeController = require('./controllers/home');
const roomController = require('./controllers/room-listing');
const registerController = require('./controllers/register');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout');
const contactController = require('./controllers/contact-us');
const dashboardController = require('./controllers/dashboard');

const filterUserData = require('./data/user');

// setup
const PORT = process.env.PORT || 3000;
const app = express();

// load local env
require('dotenv').config({ path: './config.env' });

mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('DB connected...');
	})
	.catch(console.error);

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(session({ secret: `${process.env.SESSION_SECRET}`, resave: false, saveUninitialized: true }));

app.use((req, res, next) => {
	res.locals.currentUser = filterUserData(req.session.currentUser);
	next();
});

app.listen(PORT, () => {
	console.log(`Web app is up and running on http://localhost:${PORT}`);
});

app.use('/', homeController);

app.use('/rooms', roomController);

app.use('/register', registerController);

app.use('/login', loginController);

app.use('/logout', logoutController);

app.use('/contact-us', contactController);

app.use('/dashboard', dashboardController);

// 404 redirect
app.use((req, res) => {
	const data = { url: req.originalUrl, user: res.locals.currentUser };
	res.status(404).render('404', data);
});
