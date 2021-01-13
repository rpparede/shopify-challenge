
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cloudinary = require("cloudinary")
const cors = require('cors');
const path = require('path');
const fs = require('fs')
const fileUpload = require('express-fileupload')
const app = express(),
    bodyParser = require("body-parser");
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const storePost = require("./middleware/storePost")
//const db = require('./queries')
const multer = require('multer');
// place holder for the data
const users = [];
app.use(fileUpload())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
//app.use(express.static(path.join(__dirname, '../client/public')));

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
})

app.get('/api/users', (req, res) => {
    console.log('api/users called!')
    res.json(users);
});

/*app.post('/api/user', (req, res) => {
    const user = req.body.user;
    console.log('Adding user:::::', user);
    users.push(user);
    res.json("user addedd");
});*/
// Return all photos publicly available
app.get('/', homePageController);

app.get('/photo', (req, res) => {
    var img = fs.readFileSync("uploads/picture-1610520563037");
    res.contentType('image/jpeg');
    console.log(img)
    res.send(img.image.buffer)

})
// Get individual post
//app.get("/post/:id", getPostController)



// Post request to store a post 
app.post("/posts/store", storePost, storePostController)


app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});