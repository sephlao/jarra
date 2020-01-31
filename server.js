// import Express from 'express';
// import HandleBars from 'express-handlebars';
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web app is up and running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    const data = {
        title: 'Home',
        text: 'Hello world this is my home page!'
    }
    res.render('home', data);
});

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});