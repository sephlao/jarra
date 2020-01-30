import Express from 'express';
import HandleBars from 'express-handlebars';

const app = new Express();

app.engine('handlebars', new HandleBars());
app.set('view engine', 'handlebars');

app.use(Express.static('public'))

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