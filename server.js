// import Express from 'express';
// import HandleBars from 'express-handlebars';
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const ROOMS = require('./data/rooms'); // pretend db fetch for rooms data
const PORT = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Web app is up and running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    const data = {
        title: 'Home',
        text: 'Hello world this is my home page!',
        rooms: ROOMS.data.slice(0, 3)
    }
    res.render('home', data);
});

app.get('/rooms', (req, res) => {
    res.render('rooms', {rooms: ROOMS.data})
});

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' });
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