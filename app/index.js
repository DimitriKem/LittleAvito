const express = require('express');
const notes = require('./notes');

const app = express();

app.set ('view engine', 'pug');
app.set ('views', __dirname);

app.locals.basedir = __dirname;

app.on('mount', server => {
    app.database = server.database; 
});

app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.redirect('/notes');
});

app.use('/notes', notes);

module.exports = app;