
require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser");
const homePageController = require('./controllers/homePage')

// place holder for the data
const users = [];

app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/api/users', (req, res) => {
    console.log('api/users called!')
    res.json(users);
});

app.post('/api/user', (req, res) => {
    const user = req.body.user;
    console.log('Adding user:::::', user);
    users.push(user);
    res.json("user addedd");
});

app.get('/', homePageController);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});