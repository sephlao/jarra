// import Express from 'express';
// import HandleBars from 'express-handlebars';
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.listen(3001, () => {
    console.log('web app is up and running...');
})

app.get('/', (req, res) => {
    const data = {
        title: 'Home',
        text: 'Hello world this is my home page!'
    }
    res.render('home', data);
})