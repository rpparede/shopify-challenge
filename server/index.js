
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cloudinary = require("cloudinary")
const cors = require('cors');
const path = require('path');
const fs = require('fs')
const fileUpload = require('express-fileupload')
const app = express(), bodyParser = require("body-parser");


const bcrypt = require("bcryptjs");

app.use(fileUpload())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))

// Database initial config 
const db = require("./models");
const User = db.user;
const Post = db.post;
// comment out { force: true } in prod to keep data
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initializeDummyData();
});

function initializeDummyData() {
  User.create({
    username: "admin",
    email: "test@gmail.com",
    password: bcrypt.hashSync("adminadmin", 8)
  });
  User.create({
    username: "admin2",
    email: "test2@gmail.com",
    password: bcrypt.hashSync("adminadmin", 8)
  });

  Post.create({

    title: "Test Image 1",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 100
  });
  Post.create({

    title: "Test Image 2",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 200
  });

  Post.create({

    title: "Test Image 3",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 100
  });
  Post.create({

    title: "Test Image 4",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 200
  });

  Post.create({

    title: "Test Image 5",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 100
  });
  Post.create({

    title: "Test Image 6",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 1,
    price: 200
  });
  Post.create({

    title: "Test Image 3",
    url: "https://res.cloudinary.com/dn9rjmpwu/image/upload/v1609912267/v41hxlipquqs9jiewkp7.png",
    userId: 2,
    price: 300
  });
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on the port::${process.env.PORT}`);
});