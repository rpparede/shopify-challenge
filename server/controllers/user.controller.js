const db = require("../models");
const User = db.user;
const Post = db.post;
const Role = db.role;

exports.allAccess = (req, res) => {
    Post.findAll({
    }).then(posts => {
        let userPosts = { "posts": [] }
        for (let i = 0; i < posts.length; i++) {
            userPosts["posts"].push(posts[i].dataValues);
        }
        res.status(200).send(userPosts);
    }
    );
    //res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    Post.findAll({
        where: {
            userId: req.userId
        }
    }).then(posts => {
        let userPosts = { "posts": [] }
        for (let i = 0; i < posts.length; i++) {
            userPosts["posts"].push(posts[i].dataValues);
        }
        res.status(200).send(userPosts);
    }
    );


    /*User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var userPosts = { "posts": [] };
            user.getPosts().then(posts => {
                for (let i = 0; i < posts.length; i++) {
                    userPosts["posts"].push(posts[i].dataValues);
                }
                res.status(200).send(userPosts);
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });*/

};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

const cloudinary = require('cloudinary')
const path = require("path");
exports.userPost = (req, res) => {

    console.log("STORE POST control")

    const image = req.files.picture
    const uploadPath = path.resolve("uploads/", image.name)
    image.mv(uploadPath, (error) => {
        if (error) {
            console.log("**ERROR  MOVING FILE TO PATH**")
            console.log(error)
        }
        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {

            if (error) {
                console.log("**ERROR  POSTING TO CLOUDINARY**")
                console.log(error)
                return res.redirect('/')
            }
            console.log("**ERROR STORING POST**")
            console.log(result.secure_url)
            res.send(result.secure_url);


        });

    })

    //res.status(200).send("Moderator Content.");
};