// import Express from 'express';
// import HandleBars from 'express-handlebars';
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 3000;
const ROOMS = require('./data/rooms'); // pretend db fetch for rooms data
const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Web app is up and running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    const data = {
        title: 'Home',
        text: 'Hello world this is my home page!',
        rooms: ROOMS.data.slice(0, 6)
    }
    res.render('home', data);
});

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});