
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express(),
    bodyParser = require("body-parser");
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const storePost = require("./middleware/storePost")
const db = require('./queries')
// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(cors())
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
// Return all photos publicly available
app.get('/', homePageController);

// Get individual post
//app.get("/post/:id", getPostController)

// Post request to store a post 
app.post("/posts/store", storePost, storePostController)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});