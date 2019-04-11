const express = require('express');

const Database = require('./database');

const database = new Database('mongodb://localhost:27017');

database.connect('avito-storage');

database.on('connect', () => console.log('Подключение установленно') );
const app = require('./app');

database.on('disconnect', () => console.log('Подключение к базе данных остановлено') );


const server = express();

server.database = database;

server.use(express.static('public'));
server.use('/lib', express.static('node_modules'));

server.use(app);

server.listen(3000, () => console.log('Сервер запущен по адресу http://localhost:3000'));

process.on('SIGINT', () => {
    database.close().then(() => process.exit(0));
})